/// <reference path="interaction.html" />

describe('a datagridview object', function () {
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
                { data: 'test', sortable: false },
                { data: 'column', sortData: 'column-org', width: 25 }
            ]
        }, function () {
            columns = this.getColumns();
        });

        expect(columns).not.toBeNull();
        expect(columns.length).toEqual(2);

        expect(columns[0].data).toEqual('test');
        expect(columns[0].sortable).toEqual(false);
        expect(columns[0].width).toEqual(10);
        expect(columns[0].index).toEqual(0);

        expect(columns[1].data).toEqual('column');
        expect(columns[1].sortable).not.toEqual(false);
        expect(columns[1].sortData).toEqual('column-org');
        expect(columns[1].width).toEqual(25);
        expect(columns[1].index).toEqual(1);
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
});