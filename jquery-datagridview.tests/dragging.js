/// <reference path="dragging.html" />

describe('dragging datagridview', function () {
    it('headers is disabled by default', function () {
        var grid = $('#datagridview-dragging-disabled');

        grid.datagridview({
            columns: [
                { data: 'test' },
                { data: 'column' }
            ]
        });

        expect(grid.find('.datagridview-header-drag').length).toEqual(0);
    });

    it('headers can be enabled', function () {
        var grid = $('#datagridview-dragging-enabled');

        grid.datagridview({
            columns: [
                { data: 'test' },
                { data: 'column' }
            ]
        });

        expect(grid.find('.datagridview-header-drag').length).toEqual(2);
    });

    it('header changes the size of the adjacent headers', function () {
        var grid = $('#datagridview-dragging-adjacent-headers');

        fail();
    });

    it('header does not change the size of other headers', function () {
        var grid = $('#datagridview-dragging-other-headers');

        fail();
    });

    it('last header changes only the size of the last header', function () {
        var grid = $('#datagridview-dragging-last-header');

        fail();
    });

    it('header does not cause sorting on the header', function () {
        var grid = $('#datagridview-dragging-no-sorting');

        fail();
    });
});