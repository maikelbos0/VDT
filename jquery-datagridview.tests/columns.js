/// <reference path="columns.html" />

describe('datagridview columns', function () {
    function triggerMouseEvent(element, eventType, pageX) {
        var event = jQuery.Event(eventType);
        event.which = 1;
        event.pageX = pageX;

        $(element).trigger(event);
    }

    it('have an default width', function () {
        var grid = $('#columns-width-default');
        var columns;

        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ]
        }, function () {
            columns = this.options.columns;
        });

        expect(columns[0].width).toEqual(10);
        expect(columns[1].width).toEqual(10);
    });

    it('have an default width when the given width is invalid', function () {
        var grid = $('#columns-width-nan');
        var columns;

        grid.datagridview({
            columns: [
                { data: 'test1', width: 'string' },
                { data: 'test2', width: NaN },
                { data: 'test3', width: -1 }
            ]
        }, function () {
            columns = this.options.columns;
        });

        expect(columns[0].width).toEqual(10);
        expect(columns[1].width).toEqual(10);
        expect(columns[2].width).toEqual(10);
    });

    it('can have a width provided', function () {
        var grid = $('#columns-width');
        var columns;

        grid.datagridview({
            columns: [
                { data: 'test1', width: 25 },
                { data: 'test2', width: 15 }
            ]
        }, function () {
            columns = this.options.columns;
        });

        expect(columns[0].width).toEqual(25);
        expect(columns[1].width).toEqual(15);
    });

    it('width is applied to headers', function () {
        var grid = $('#columns-width-class-headers');

        grid.datagridview({
            columns: [
                { data: 'test1', width: 25 },
                { data: 'test2' }
            ]
        });

        var headers = grid.find('.datagridview-header-cell');
        var styles = $('style').text().split('}').reduce(function (obj, declaration) {
            declaration = declaration.split("{");

            if (declaration.length == 2) {
                obj[declaration[0].trim().substring(1)] = declaration[1].trim();
            }

            return obj;
        }, {});

        expect(styles[$(headers[0]).attr('class').split(' ')[0]]).toEqual('flex-grow: 25; order: 0;');
        expect(styles[$(headers[1]).attr('class').split(' ')[0]]).toEqual('flex-grow: 10; order: 1;');
    });

    it('width is applied to data', function () {
        var grid = $('#columns-width-class-data');

        grid.datagridview({
            columns: [
                { data: 'test1', width: 25 },
                { data: 'test2' }
            ]
        }, function () {
            this.populate(null, [
                { test1: 'test' },
                { test2: 'test' }
            ]);
        });

        var cells = grid.find('.datagridview-row > div');
        var styles = $('style').text().split('}').reduce(function (obj, declaration) {
            declaration = declaration.split("{");

            if (declaration.length == 2) {
                obj[declaration[0].trim().substring(1)] = declaration[1].trim();
            }

            return obj;
        }, {});

        expect(styles[$(cells[0]).attr('class')]).toEqual('flex-grow: 25; order: 0;');
        expect(styles[$(cells[1]).attr('class')]).toEqual('flex-grow: 10; order: 1;');
    });

    it('get added in the order of the array', function () {
        var grid = $('#columns-order');

        grid.datagridview({
            columns: [
                { data: 'test1', width: 25 },
                { data: 'test2' }
            ]
        });

        var headers = grid.find('.datagridview-header-cell');

        expect($(headers[0]).text()).toEqual('test1');
        expect($(headers[1]).text()).toEqual('test2');
    });

    it('can be not moved if moving columns is disabled', function () {
        var grid = $('#columns-order-move-disabled');
        var columns = null;

        grid.width('100px');
        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ]
        });

        triggerMouseEvent(grid.find('.datagridview-header-cell').first(), 'mousedown', 1);
        triggerMouseEvent(grid, 'mousemove', 1);
        triggerMouseEvent(grid, 'mouseup', 1000);

        grid.datagridview(function () {
            columns = this.getColumns();
        });

        expect(columns[0].data).toEqual('test1');
        expect(columns[1].data).toEqual('test2');
    });

    it('can be moved if moving columns is enabled', function () {
        var grid = $('#columns-order-move-enabled');
        var columns = null;

        grid.width('100px');
        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ]
        });

        triggerMouseEvent(grid.find('.datagridview-header-cell').first(), 'mousedown', -100);
        triggerMouseEvent(grid, 'mousemove', -100);
        triggerMouseEvent(grid, 'mouseup', 100);

        grid.datagridview(function () {
            columns = this.getColumns();
        });

        expect(columns[0].data).toEqual('test2');
        expect(columns[1].data).toEqual('test1');
    });

    it('can be moved backwards if moving columns is enabled', function () {
        var grid = $('#columns-order-move-backward');
        var columns = null;

        grid.width('100px');
        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ]
        });

        triggerMouseEvent(grid.find('.datagridview-header-cell').last(), 'mousedown', 100);
        triggerMouseEvent(grid, 'mousemove', 100);
        triggerMouseEvent(grid, 'mouseup', -100);

        grid.datagridview(function () {
            columns = this.getColumns();
        });

        expect(columns[0].data).toEqual('test2');
        expect(columns[1].data).toEqual('test1');
    });

    it('get reordered as expected when moving a column up three positions', function () {
        var grid = $('#columns-order-move-forward-three');
        var columns = null;

        grid.width('100px');
        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' },
                { data: 'test3' },
                { data: 'test4' }
            ]
        });

        triggerMouseEvent(grid.find('.datagridview-header-cell').first(), 'mousedown', -100);
        triggerMouseEvent(grid, 'mousemove', -100);
        triggerMouseEvent(grid, 'mouseup', 100);

        grid.datagridview(function () {
            columns = this.getColumns();
        });

        expect(columns[0].data).toEqual('test2');
        expect(columns[1].data).toEqual('test3');
        expect(columns[2].data).toEqual('test4');
        expect(columns[3].data).toEqual('test1');
    });

    it('get reordered as expected when moving a column down three positions', function () {
        var grid = $('#columns-order-move-backward-three');
        var columns = null;

        grid.width('100px');
        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' },
                { data: 'test3' },
                { data: 'test4' }
            ]
        });

        triggerMouseEvent(grid.find('.datagridview-header-cell').last(), 'mousedown', 100);
        triggerMouseEvent(grid, 'mousemove', 100);
        triggerMouseEvent(grid, 'mouseup', -100);

        grid.datagridview(function () {
            columns = this.getColumns();
        });

        expect(columns[0].data).toEqual('test4');
        expect(columns[1].data).toEqual('test1');
        expect(columns[2].data).toEqual('test2');
        expect(columns[3].data).toEqual('test3');
    });

    it('don\'t initiate sorting when moving', function () {
        var grid = $('#columns-order-move-no-sort');
        var called = false;

        grid.width('100px');
        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ]
        });

        grid.on('datagridview.sorted', function () {
            called = true;
        });

        triggerMouseEvent(grid.find('.datagridview-header-cell').last(), 'mousedown', 100);
        triggerMouseEvent(grid, 'mousemove', 100);
        triggerMouseEvent(grid.find('.datagridview-header-cell').first(), 'mouseup', -100);

        expect(called).toEqual(false);
    });
});