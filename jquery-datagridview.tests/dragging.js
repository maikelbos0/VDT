/// <reference path="dragging.html" />

describe('dragging datagridview', function () {
    function triggerMouseEvent(element, eventType, pageX) {
        var event = jQuery.Event(eventType);
        event.which = 1;
        event.pageX = pageX;

        $(element).trigger(event);
    }

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

    it('header changes the size of the adjacent columns', function () {
        var grid = $('#datagridview-dragging-adjacent-headers');
        var columns;

        grid.width('100px');
        grid.datagridview({
            columns: [
                { data: 'test' },
                { data: 'column' },
                { data: 'three' },
                { data: 'four' }
            ]
        });

        var dragElement = grid.find('.datagridview-header-cell:nth-child(2) .datagridview-header-drag');

        triggerMouseEvent(dragElement, 'mousedown', 100);
        triggerMouseEvent(dragElement, 'mousemove', 80);
        triggerMouseEvent(dragElement, 'mouseup');

        grid.datagridview(function () {
            columns = this.getColumns();
        });

        expect(columns[1].width).toEqual(2);
        expect(columns[2].width).toEqual(18);
    });

    it('header does not change the size of other columns', function () {
        var grid = $('#datagridview-dragging-other-headers');
        var columns;

        grid.width('100px');
        grid.datagridview({
            columns: [
                { data: 'test' },
                { data: 'column' },
                { data: 'three' },
                { data: 'four' }
            ]
        });

        var dragElement = grid.find('.datagridview-header-cell:nth-child(2) .datagridview-header-drag');

        triggerMouseEvent(dragElement, 'mousedown', 100);
        triggerMouseEvent(dragElement, 'mousemove', 80);
        triggerMouseEvent(dragElement, 'mouseup');

        grid.datagridview(function () {
            columns = this.getColumns();
        });

        expect(columns[0].width).toEqual(10);
        expect(columns[3].width).toEqual(10);
    });

    it('last header changes only the size of the last columns', function () {
        var grid = $('#datagridview-dragging-last-header');
        var columns;

        grid.width('100px');
        grid.datagridview({
            columns: [
                { data: 'test' },
                { data: 'column' },
                { data: 'three' },
                { data: 'four' }
            ]
        });

        var dragElement = grid.find('.datagridview-header-cell:nth-child(4) .datagridview-header-drag');

        triggerMouseEvent(dragElement, 'mousedown', 100);
        triggerMouseEvent(dragElement, 'mousemove', 120);
        triggerMouseEvent(dragElement, 'mouseup');

        grid.datagridview(function () {
            columns = this.getColumns();
        });

        expect(columns[0].width).toEqual(10);
        expect(columns[1].width).toEqual(10);
        expect(columns[2].width).toEqual(10);
        expect(columns[3].width).toEqual(18);
    });

    it('header does not cause sorting on the header', function () {
        var grid = $('#datagridview-dragging-no-sorting');
        var metaData = null;

        grid.width('100px');
        grid.datagridview({
            columns: [
                { data: 'test' },
                { data: 'column' },
                { data: 'three' },
                { data: 'four' }
            ]
        });

        var dragElement = grid.find('.datagridview-header-cell:nth-child(2) .datagridview-header-drag');

        triggerMouseEvent(dragElement, 'mousedown', 100);
        triggerMouseEvent(dragElement, 'mousemove', 120);
        triggerMouseEvent(dragElement, 'mouseup');

        grid.datagridview(function () {
            metaData = this.getMetaData();
        });

        expect(metaData.sortColumn).toBeNull();
    });
});