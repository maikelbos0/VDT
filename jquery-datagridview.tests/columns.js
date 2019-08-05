/// <reference path="columns.html" />

describe('datagridview columns', function () {
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

        var headers = grid.find('th');
        var styles = $('style').text().split('}').reduce(function (obj, declaration) {
            declaration = declaration.split("{");

            if (declaration.length == 2) {
                obj[declaration[0].trim().substring(1)] = declaration[1].trim();
            }

            return obj;
        }, {});

        expect(styles[$(headers[0]).attr('class')]).toEqual('flex-grow: 25');
        expect(styles[$(headers[1]).attr('class')]).toEqual('flex-grow: 10');
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

        var cells = grid.find('td');
        var styles = $('style').text().split('}').reduce(function (obj, declaration) {
            declaration = declaration.split("{");

            if (declaration.length == 2) {
                obj[declaration[0].trim().substring(1)] = declaration[1].trim();
            }

            return obj;
        }, {});

        expect(styles[$(cells[0]).attr('class')]).toEqual('flex-grow: 25');
        expect(styles[$(cells[1]).attr('class')]).toEqual('flex-grow: 10');
    });
});