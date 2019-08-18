/// <reference path="options.html" />

describe('a datagridview option', function () {
    it('can be provided for getMetaData', function () {
        var metaData;

        $('#datagridview-options-meta-data').datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData('test', false, 0, 25, 0);
            }
        }, function () {
                metaData = this.getMetaData();
        });

        expect(metaData.sortColumn).toEqual('test');
    });

    it('can be provided for getFooterPlugins', function () {
        var grid = $('#datagridview-options-footer-plugins');

        grid.datagridview({
            columns: [{ data: 'test' }],
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.prevNext,
                    $.fn.datagridview.footerPlugins.displayFull
                ];
            }
        }, function () {
            this.populate(new DataGridViewMetaData('test', false, 2, 25, 0), [
                { test: '1' },
                { test: '2' }
            ])
        });

        expect(grid.find('.datagridview-footer-element').length).toEqual(2);
    });

    it('can be provided for allowColumnResize', function () {
        var grid = $('#datagridview-options-headers-resizable');

        grid.datagridview({
            columns: [{ data: 'test' }],
            allowColumnResize: function () {
                return true;
            }
        });

        expect(grid.find('.datagridview-header-drag').length).toEqual(1);
    });

    it('can be provided for allowColumnMove', function () {
        var grid = $('#datagridview-options-headers-move');
        var allow = false;

        grid.datagridview({
            columns: [{ data: 'test' }],
            allowColumnMove: function () {
                return true;
            }
        }, function () {
            allow = this.allowColumnMove;
        });

        expect(allow).toEqual(true);
    });
    
    it('can be provided for allowSelect', function () {
        var grid = $('#datagridview-options-allow-select');
        var allowSelect = false;

        grid.datagridview({
            columns: [],
            allowSelect: function () {
                return true;
            }
        }, function () {
            allowSelect = this.allowSelect;
        });

        expect(allowSelect).toEqual(true);
    });

    it('can be provided for isMultiselect', function () {
        var grid = $('#datagridview-options-multiselect');
        var isMultiselect = false;

        grid.datagridview({
            columns: [],
            isMultiselect: function () {
                return true;
            }
        }, function () {
            isMultiselect = this.isMultiselect;
        });

        expect(isMultiselect).toEqual(true);
    });
});