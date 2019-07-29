/// <reference path="element.html" />

describe('creating an element', function () {
    it('succeeds', function () {
        var grid = $('#element-succeeds');
        var element;

        grid.datagridview({
            columns: []
        }, function () {
            element = this.createElement('<div>', 'datagridview');
        });

        expect(element.prop('tagName')).toEqual('DIV');
        expect(element.hasClass('datagridview')).toEqual(true);
    });

    it('succeeds with attributes', function () {
        var grid = $('#element-attributes');
        var element;

        grid.datagridview({
            columns: []
        }, function () {
            element = this.createElement('<div>', 'datagridview', { id: 'test', value: 'value' });
        });

        expect(element.attr('id')).toEqual('test');
        expect(element.attr('value')).toEqual('value');
    });

    it('succeeds with multiple attributes objects', function () {
        var grid = $('#element-attributes-multiple');
        var element;

        grid.datagridview({
            columns: []
        }, function () {
            element = this.createElement('<div>', 'datagridview', { id: 'test', value: 'value' }, { id: 'test2' });
        });

        expect(element.attr('id')).toEqual('test2');
        expect(element.attr('value')).toEqual('value');
    });

    it('class always gets added', function () {
        var grid = $('#element-attributes-class');
        var element;

        grid.datagridview({
            columns: []
        }, function () {
            element = this.createElement('<div>', 'datagridview', { class: 'form-control' });
        });

        expect(element.hasClass('datagridview')).toEqual(true);
        expect(element.hasClass('form-control')).toEqual(true);
    });
});