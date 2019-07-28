/// <reference path="basic.html" />

describe('a basic datagridview', function () {
    it('can be created', function () {
        var grid = $('#basic-datagridview-created');

        expect(grid.length).toEqual(1);
        expect(function () {
            grid.datagridview();
        }).not.toThrow();
    });

    it('will add a header if needed', function () {
        var grid = $('#basic-datagridview-header');

        grid.datagridview();
        expect(grid.find('thead.datagridview-header').length).toEqual(1);
    });

    it('will add a footer if needed', function () {
        var grid = $('#basic-datagridview-footer');

        grid.datagridview();
        expect(grid.find('tfoot.datagridview-footer').length).toEqual(1);
    });

    it('will no table elements already present', function () {
        var grid = $('#basic-datagridview-no-extra-elements');

        grid.datagridview();
        expect(grid.find('thead.datagridview-header').length).toEqual(0);
        expect(grid.find('tbody.datagridview-body').length).toEqual(0);
        expect(grid.find('tfoot.datagridview-footer').length).toEqual(0);
    });
});