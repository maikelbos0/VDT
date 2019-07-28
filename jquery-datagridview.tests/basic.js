/// <reference path="basic.html" />

describe('a basic datagridview', function () {
    it('can be created', function () {
        var grid = $('#basic-datagridview-created');

        expect(grid.length).toEqual(1);
        expect(function () {
            grid.datagridview({
                columns: []
            });
        }).not.toThrow();
    });

    it('hides the already present content', function () {
        var grid = $('#basic-datagridview-hides');

        grid.datagridview({
            columns: []
        });

        var hiddenContent = grid.find('.test-hidden');

        expect($(hiddenContent[0]).css('display')).toEqual('none');
        expect($(hiddenContent[1]).css('display')).toEqual('none');
    });

    it('will add a header', function () {
        var grid = $('#basic-datagridview-header');

        grid.datagridview({
            columns: []
        });
        expect(grid.find('thead.datagridview-header').length).toEqual(1);
    });

    it('will add a body', function () {
        var grid = $('#basic-datagridview-body');

        grid.datagridview({
            columns: []
        });
        expect(grid.find('tbody.datagridview-body').length).toEqual(1);
    });

    it('will add a footer', function () {
        var grid = $('#basic-datagridview-footer');

        grid.datagridview({
            columns: []
        });
        expect(grid.find('tfoot.datagridview-footer').length).toEqual(1);
    });

    it('needs required option "columns"', function () {
        var grid = $('#basic-datagridview-columns-required');

        expect(grid.length).toEqual(1);
        expect(function () {
            grid.datagridview();
        }).toThrow('datagridview error: expected required option "columns"');
    });

    it('needs option "columns" to be an array', function () {
        var grid = $('#basic-datagridview-columns-array');

        expect(grid.length).toEqual(1);
        expect(function () {
            grid.datagridview({
                columns: 5
            });
        }).toThrow('datagridview error: expected option "columns" to be an array');
    });

    it('needs all items in "columns" to have property "data"', function () {
        var grid = $('#basic-datagridview-columns-item-data');

        expect(grid.length).toEqual(1);
        expect(function () {
            grid.datagridview({
                columns: [
                    { data: 'test' },
                    {}
                ]
            });
        }).toThrow('datagridview error: expected each item in option "columns" to have property "data"');
    });
});