describe('datagridview defaults', function () {
    $.fn.datagridview.defaults.getMetaData = function () {
        return new DataGridViewMetaData('column-1', true, 0, 35, 0);
    };

    it('can be changed', function () {
        var grid = $('#datagridview-defaults');
        var metaData;

        grid.datagridview({
            columns: []
        }, function() {
            metaData = this.getMetaData();
        });

        expect(metaData.sortColumn).toEqual('column-1');
        expect(metaData.sortDescending).toEqual(true);
        expect(metaData.rowsPerPage).toEqual(35);
    });

    it('can still be overridden in the options after being changed', function () {
        var grid = $('#datagridview-defaults-override');
        var metaData;

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData('column-2', false, 0, 20, 0);
            }
        }, function() {
            metaData = this.getMetaData();
        });

        expect(metaData.sortColumn).toEqual('column-2');
        expect(metaData.sortDescending).toEqual(false);
        expect(metaData.rowsPerPage).toEqual(20);
    });
});