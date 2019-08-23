/// <reference path="interaction.html" />

describe('a datagridview object', function () {
    function triggerMouseEvent(element, eventType, pageX) {
        var event = jQuery.Event(eventType);
        event.which = 1;
        event.pageX = pageX;

        $(element).trigger(event);
    }

    it('callback is called', function () {
        var called = false;

        $('#datagridview-interaction-callback').datagridview({ columns: [] }, function () {
            called = true;
        });

        expect(called).toEqual(true);
    });

    it('is the function scope in the callback when creating a datagridview', function () {
        var called = false;

        $('#datagridview-interaction-this').datagridview({ columns: [] }, function () {
            expect(typeof this.populate).toEqual('function');
            called = true;
        });

        expect(called).toEqual(true);
    });

    it('is the function scope in the callback when a datagridview already exists', function () {
        var called = false;

        $('#datagridview-interaction-this-existing').datagridview({ columns: [] });

        $('#datagridview-interaction-this-existing').datagridview(null, function () {
            expect(typeof this.populate).toEqual('function');
            called = true;
        });

        expect(called).toEqual(true);
    });

    it('callback is called if it\'s the first argument of the function after creating', function () {
        var called = false;

        $('#datagridview-interaction-callback-no-options').datagridview({ columns: [] });

        $('#datagridview-interaction-callback-no-options').datagridview(function () {
            called = true;
        });

        expect(called).toEqual(true);
    });

    it('is the first parameter in the callback', function () {
        var called = false;

        $('#datagridview-interaction-first-parameter').datagridview({ columns: [] }, function (d) {
            expect(d).not.toBeNull();
            expect(d).not.toBeUndefined();
            expect(typeof d.populate).toEqual('function');

            called = true;
        });

        expect(called).toEqual(true);
    });

    it('can be removed', function () {
        var grid = $('#datagridview-interaction-remove');

        grid.datagridview({
            columns: []
        }, function () {
            this.remove();
        });

        expect(grid.hasClass('.datagridview')).toEqual(false);
        expect(grid.find('.datagridview-header').length).toEqual(0);
        expect(grid.find('.datagridview-body').length).toEqual(0);
        expect(grid.find('.datagridview-footer').length).toEqual(0);
        expect(grid.find('tr').length).toEqual(2);
    });

    it('can be used to get the meta data out', function () {
        var grid = $('#datagridview-interaction-meta-data');
        var metaData = null;

        grid.datagridview({
            columns: [],
            getMetaData() {
                return new DataGridViewMetaData('test', true, 56, 25, 0);
            }
        }, function () {
            metaData = this.getMetaData();
        });

        expect(metaData).not.toBeNull();
        expect(metaData.sortColumn).toEqual('test');
        expect(metaData.totalRows).toEqual(56);
    });

    it('getting meta data returns a copy', function () {
        var grid = $('#datagridview-interaction-meta-data-copy');
        var metaData = null;

        grid.datagridview({
            columns: [],
            getMetaData() {
                return new DataGridViewMetaData('test', true, 56, 25, 0);
            }
        }, function () {
            var mData = this.getMetaData();
            mData.sortColumn = 'column';
            mData.totalRows = 155;
        });

        grid.datagridview(function () {
            metaData = this.getMetaData();
        });

        expect(metaData).not.toBeNull();
        expect(metaData.sortColumn).toEqual('test');
        expect(metaData.totalRows).toEqual(56);
    });

    it('can be used to get the column definitions out', function () {
        var grid = $('#datagridview-interaction-columns');
        var columns = null;

        grid.datagridview({
            columns: [
                { data: 'test', sortable: false, class: 'text-right' },
                { data: 'column', sortData: 'column-org', width: 25, visible: false }
            ]
        }, function () {
            columns = this.getColumns();
        });

        expect(columns).not.toBeNull();
        expect(columns.length).toEqual(2);

        expect(columns[0].id).not.toBeUndefined();
        expect(columns[0].data).toEqual('test');
        expect(columns[0].sortable).toEqual(false);
        expect(columns[0].width).toEqual(10);
        expect(columns[0].index).toEqual(0);
        expect(columns[0].visible).toEqual(true);
        expect(columns[0].class).toEqual('text-right');

        expect(columns[1].id).not.toBeUndefined();
        expect(columns[1].data).toEqual('column');
        expect(columns[1].sortable).not.toEqual(false);
        expect(columns[1].sortData).toEqual('column-org');
        expect(columns[1].width).toEqual(25);
        expect(columns[1].index).toEqual(1);
        expect(columns[1].visible).toEqual(false);
        expect(columns[1].class).toBeUndefined();
    });

    it('getting column definitions returns a copy', function () {
        var grid = $('#datagridview-interaction-columns-copy');
        var columns = null;

        grid.datagridview({
            columns: [
                { data: 'test', sortable: false },
                { data: 'column', sortData: 'column-org', width: 25 }
            ]
        }, function () {
            var cols = this.getColumns();
            cols[0].data = 'another';
            cols[1].index = 0;
            cols.push({ data: 'new' });
        });

        grid.datagridview(function () {
            columns = this.getColumns();
        });

        expect(columns).not.toBeNull();
        expect(columns.length).toEqual(2);
        expect(columns[0].data).toEqual('test');
        expect(columns[1].index).toEqual(1);
    });

    it('can give the current selected rows', function () {
        var grid = $('#datagridview-interaction-selected-rows');
        var rows = null;

        grid.datagridview({
            columns: [
                { data: 'test' }
            ]
        }, function () {
            this.populate(this.getMetaData(), [
                { test: 1, },
                { test: 2, },
                { test: 3, }
            ]);
        });

        triggerMouseEvent(grid.find('.datagridview-row:nth-child(2)'), 'mousedown');
        triggerMouseEvent(grid.find('.datagridview-row:nth-child(2)'), 'mouseup');

        grid.datagridview(function () {
            rows = this.getSelectedRows();
        });

        expect(rows.length).toEqual(1);
        expect(rows[0]).toEqual($('.datagridview-row:nth-child(2)')[0]);
    });

    it('can give the current selected row indexes', function () {
        var grid = $('#datagridview-interaction-selected-indexes');
        var indexes = null;

        grid.datagridview({
            columns: [
                { data: 'test' }
            ]
        }, function () {
            this.populate(this.getMetaData(), [
                { test: 1, },
                { test: 2, },
                { test: 3, }
            ]);
        });

        triggerMouseEvent(grid.find('.datagridview-row:nth-child(2)'), 'mousedown');
        triggerMouseEvent(grid.find('.datagridview-row:nth-child(2)'), 'mouseup');

        grid.datagridview(function () {
            indexes = this.getSelectedIndexes();
        });

        expect(indexes.length).toEqual(1);
        expect(indexes[0]).toEqual(1);
    });

    it('can give the current selected data', function () {
        var grid = $('#datagridview-interaction-selected-data');
        var data = [
            { test: 1, },
            { test: 2, },
            { test: 3, }
        ];
        var selectedData = null;

        grid.datagridview({
            columns: [
                { data: 'test' }
            ]
        }, function () {
            this.populate(this.getMetaData(), data);
        });

        triggerMouseEvent(grid.find('.datagridview-row:nth-child(2)'), 'mousedown');
        triggerMouseEvent(grid.find('.datagridview-row:nth-child(2)'), 'mouseup');

        grid.datagridview(function () {
            selectedData = this.getSelectedData();
        });

        expect(selectedData.length).toEqual(1);
        expect(selectedData[0]).toEqual(data[1]);
    });

    it('can set the selected rows', function () {
        var grid = $('#datagridview-interaction-set-selected-rows');

        grid.datagridview({
            columns: [
                { data: 'test' }
            ]
        }, function () {
            this.populate(this.getMetaData(), [
                { test: 1, },
                { test: 2, },
                { test: 3, }
            ]);

            this.setSelectedRows(':nth-child(2)');
        });

        var rows = grid.find('.datagridview-row-selected');

        expect(rows.length).toEqual(1);
        expect(rows[0]).toEqual(grid.find('.datagridview-row:nth-child(2)')[0]);
    });

    it('can set the selected indexes', function () {
        var grid = $('#datagridview-interaction-set-selected-indexes');

        grid.datagridview({
            columns: [
                { data: 'test' }
            ]
        }, function () {
            this.populate(this.getMetaData(), [
                { test: 1, },
                { test: 2, },
                { test: 3, }
            ]);

            this.setSelectedIndexes([2]);
        });

        var rows = grid.find('.datagridview-row-selected');

        expect(rows.length).toEqual(1);
        expect(rows[0]).toEqual(grid.find('.datagridview-row:nth-child(3)')[0]);
    });

    it('can set the selected rows by data function', function () {
        var grid = $('#datagridview-interaction-set-selected-data');

        grid.datagridview({
            columns: [
                { data: 'test' }
            ]
        }, function () {
            this.populate(this.getMetaData(), [
                { test: 1, },
                { test: 2, },
                { test: 3, }
            ]);

            this.setSelectedData(function (value) {
                return value.test == 2;
            });
        });

        var rows = grid.find('.datagridview-row-selected');

        expect(rows.length).toEqual(1);
        expect(rows[0]).toEqual(grid.find('.datagridview-row:nth-child(2)')[0]);
    });

    it('can not set selected rows when selecting is not allowed', function () {
        var grid = $('#datagridview-interaction-selected-no-select');

        grid.datagridview({
            columns: [
                { data: 'test' }
            ]
        }, function () {
            this.populate(this.getMetaData(), [
                { test: 1, },
                { test: 2, },
                { test: 3, }
            ]);

            this.setSelectedRows(':nth-child(2)');
        });

        expect(grid.find('.datagridview-row-selected').length).toEqual(0);
    });

    it('can not set selected data when selecting is not allowed', function () {
        var grid = $('#datagridview-interaction-selected-no-select-data');

        grid.datagridview({
            columns: [
                { data: 'test' }
            ]
        }, function () {
            this.populate(this.getMetaData(), [
                { test: 1, },
                { test: 2, },
                { test: 3, }
            ]);

            this.setSelectedData(function () { return true; });
        });

        expect(grid.find('.datagridview-row-selected').length).toEqual(0);
    });

    it('sets only the first matching row as selected when multiselect is disabled', function () {
        var grid = $('#datagridview-interaction-selected-single');

        grid.datagridview({
            columns: [
                { data: 'test' }
            ]
        }, function () {
            this.populate(this.getMetaData(), [
                { test: 1, },
                { test: 2, },
                { test: 3, }
            ]);

            this.setSelectedRows('*');
        });

        var rows = grid.find('.datagridview-row-selected');

        expect(rows.length).toEqual(1);
        expect(rows[0]).toEqual(grid.find('.datagridview-row')[0]);
    });

    it('selects all matching rows when multiselect is enabled', function () {
        var grid = $('#datagridview-interaction-selected-multi');

        grid.datagridview({
            columns: [
                { data: 'test' }
            ]
        }, function () {
            this.populate(this.getMetaData(), [
                { test: 1, },
                { test: 2, },
                { test: 3, }
            ]);

            this.setSelectedRows(':not(:first-child)');
        });

        var rows = grid.find('.datagridview-row-selected');

        expect(rows.length).toEqual(2);
        expect(rows[0]).toEqual(grid.find('.datagridview-row')[1]);
        expect(rows[1]).toEqual(grid.find('.datagridview-row')[2]);
    });

    it('triggers the selection changed event with new selected data when setting the selection programmatically', function () {
        var grid = $('#datagridview-interaction-selected-event');
        var data = null;

        grid.datagridview({
            columns: [
                { data: 'test' }
            ]
        }, function () {
            this.populate(this.getMetaData(), [
                { test: 1, },
                { test: 2, },
                { test: 3, }
            ]);
        });

        grid.on('datagridview.selectionChanged', function (e, d) {
            data = d;
        });

        grid.datagridview(function () {
            this.setSelectedRows('*');
        });

        expect(data).not.toBeNull();
        expect(data.length).toEqual(1);
    });

    it('triggers the selection changed event when deselecting with new selected data', function () {
        var grid = $('#datagridview-interaction-selected-event');
        var data = null;

        grid.datagridview({
            columns: [
                { data: 'test' }
            ]
        }, function () {
            this.populate(this.getMetaData(), [
                { test: 1, },
                { test: 2, },
                { test: 3, }
            ]);
        });

        grid.datagridview(function () {
            this.setSelectedRows('*');
        });

        grid.on('datagridview.selectionChanged', function (e, d) {
            data = d;
        });

        grid.datagridview(function () {
            this.setSelectedRows(false);
        });

        expect(data).not.toBeNull();
        expect(data.length).toEqual(0);
    });

    it('does not trigger the selection changed event when the selection does not change', function () {
        var grid = $('#datagridview-interaction-no-selected-event');
        var called = false;

        grid.datagridview({
            columns: [
                { data: 'test' }
            ]
        }, function () {
            this.populate(this.getMetaData(), [
                { test: 1, },
                { test: 2, },
                { test: 3, }
            ]);
        });

        grid.datagridview(function () {
            this.setSelectedRows('*');
        });

        grid.on('datagridview.selectionChanged', function () {
            called = true;
        });

        grid.datagridview(function () {
            this.setSelectedRows('*');
        });

        expect(called).toEqual(false);
    });

    it('can make a column invisible', function () {
        var grid = $('#datagridview-interaction-column-invisible');
        var columns;

        grid.datagridview({
            columns: [
                { data: 'test' }
            ]
        }, function () {
            columns = this.getColumns();
            this.toggleColumnVisibility(columns[0].id, false);
            columns = this.getColumns();
        });

        expect(columns[0].visible).toEqual(false);
    });

    it('can make an invisible column visible', function () {
        var grid = $('#datagridview-interaction-column-visible');
        var columns;

        grid.datagridview({
            columns: [
                { data: 'test', visible: false }
            ]
        }, function () {
            columns = this.getColumns();
            this.toggleColumnVisibility(columns[0].id, true);
            columns = this.getColumns();
        });

        expect(columns[0].visible).toEqual(true);
    });

    it('sets column width to initial when making an invisible column visible', function () {
        var grid = $('#datagridview-interaction-column-invisible-width');
        var columns;

        grid.width('100px');
        grid.datagridview({
            columns: [
                { data: 'test1', width: 50 },
                { data: 'test2', width: 50 }
            ]
        });

        var dragElement = grid.find('.datagridview-header-cell:nth-child(2) .datagridview-header-drag');
        
        triggerMouseEvent(dragElement, 'mousedown', 100);
        triggerMouseEvent(dragElement, 'mousemove', 25);
        triggerMouseEvent(dragElement, 'mouseup');

        grid.datagridview(function () {
            columns = this.getColumns();
        });

        expect(columns[1].visible).toEqual(false);

        grid.datagridview(function () {
            this.toggleColumnVisibility(columns[1].id, true);
            columns = this.getColumns();
        });

        expect(columns[1].visible).toEqual(true);
        expect(columns[1].width).toEqual(50);
    });
});