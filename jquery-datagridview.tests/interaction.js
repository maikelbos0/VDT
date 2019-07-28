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
});