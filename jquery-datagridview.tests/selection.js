/// <reference path="selection.html" />

describe('in a datagridview a user can select', function () {
    function triggerMouseEvent(element, eventType, ctrlKey, shiftKey) {
        var event = jQuery.Event(eventType);
        event.which = 1;
        event.ctrlKey = !!ctrlKey;
        event.shiftKey = !!shiftKey;

        $(element).trigger(event);
    }

    it('nothing by clicking if selecting is not allowed', function () {
        var grid = $('#selection-no-select');

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

        triggerMouseEvent(grid.find('.datagridview-row:nth-child(2)'), 'mouseup');

        expect(grid.find('.datagridview-row-selected').length).toEqual(0);
    });

    it('nothing by clicking if selecting is not allowed and multiselect is on', function () {
        var grid = $('#selection-no-select-multi');

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

        triggerMouseEvent(grid.find('.datagridview-row:nth-child(2)'), 'mouseup');

        expect(grid.find('.datagridview-row-selected').length).toEqual(0);
    });

    it('a single row by clicking on the row', function () {
        var grid = $('#selection-single');

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

        triggerMouseEvent(grid.find('.datagridview-row:nth-child(2)'), 'mouseup');

        var rows = grid.find('.datagridview-row-selected');

        expect(rows.length).toEqual(1);
        expect(rows[0]).toEqual(grid.find('.datagridview-row')[1]);
    });

    it('a different row after selecting one by clicking on the row in single-select mode', function () {
        var grid = $('#selection-single-different');

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

        triggerMouseEvent(grid.find('.datagridview-row:nth-child(2)'), 'mouseup');
        triggerMouseEvent(grid.find('.datagridview-row:nth-child(1)'), 'mouseup');

        var rows = grid.find('.datagridview-row-selected');

        expect(rows.length).toEqual(1);
        expect(rows[0]).toEqual(grid.find('.datagridview-row')[0]);
    });

    it('a different row after selecting one by clicking on the row in multiselect mode', function () {
        var grid = $('#selection-multi-different');

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

        triggerMouseEvent(grid.find('.datagridview-row:nth-child(2)'), 'mouseup');
        triggerMouseEvent(grid.find('.datagridview-row:nth-child(1)'), 'mouseup');

        var rows = grid.find('.datagridview-row-selected');

        expect(rows.length).toEqual(1);
        expect(rows[0]).toEqual(grid.find('.datagridview-row')[0]);
    });

    it('an additional row after selecting one by ctrl+clicking on the row in multiselect mode', function () {
        var grid = $('#selection-multi-ctrl');

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

        triggerMouseEvent(grid.find('.datagridview-row:nth-child(2)'), 'mouseup');
        triggerMouseEvent(grid.find('.datagridview-row:nth-child(1)'), 'mouseup', true);

        var rows = grid.find('.datagridview-row-selected');

        expect(rows.length).toEqual(2);
        expect(rows[0]).toEqual(grid.find('.datagridview-row')[0]);
        expect(rows[1]).toEqual(grid.find('.datagridview-row')[1]);
    });

    it('nothing by by ctrl+clicking on the selected row in multiselect mode', function () {
        var grid = $('#selection-multi-ctrl-deselect');

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

        triggerMouseEvent(grid.find('.datagridview-row:nth-child(2)'), 'mouseup');
        triggerMouseEvent(grid.find('.datagridview-row:nth-child(2)'), 'mouseup', true);

        expect(grid.find('.datagridview-row-selected').length).toEqual(0);
    });

    it('a range of rows after selecting a higher row by shift+clicking on a lower row in multiselect mode', function () {
        fail();
    });

    it('a range of rows after selecting a lower row by shift+clicking on a higher row in multiselect mode', function () {
        fail();
    });

    it('an additional range of rows by ctrl+clicking and ctrl+shift+clicking in multiselect mode', function () {
        fail();
    });

    it('a range of rows by dragging from a higher row to a lower row in multiselect mode', function () {
        fail();
    });

    it('a range of rows by dragging from a lower row to a higher row in multiselect mode', function () {
        fail();
    });

    it('an additional range of rows by ctrl+dragging in multiselect mode', function () {
        fail();
    });
});