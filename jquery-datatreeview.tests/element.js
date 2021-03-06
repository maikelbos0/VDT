﻿describe('creating an element for datatreeview', function () {
    it('succeeds', function () {
        var tree = $('#element-succeeds');
        var element;

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'A value'
            }]
        },
        function () {
            element = this.createElement('<div>', 'datatreeview');
        });

        expect(element.prop('tagName')).toEqual('DIV');
        expect(element.hasClass('datatreeview')).toEqual(true);
    });

    it('succeeds with attributes', function () {
        var tree = $('#element-attributes');
        var element;

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'A value'
            }]
        },
        function () {
            element = this.createElement('<div>', 'datatreeview', { id: 'test', value: 'value' });
        });

        expect(element.attr('id')).toEqual('test');
        expect(element.attr('value')).toEqual('value');
    });

    it('succeeds with multiple attributes objects', function () {
        var tree = $('#element-attributes-multiple');
        var element;

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'A value'
            }]
        },
        function () {
            element = this.createElement('<div>', 'datatreeview', { id: 'test', value: 'value' }, { id: 'test2' });
        });

        expect(element.attr('id')).toEqual('test2');
        expect(element.attr('value')).toEqual('value');
    });

    it('class always gets added', function () {
        var tree = $('#element-attributes-class');
        var element;

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'A value'
            }]
        },
        function () {
            element = this.createElement('<div>', 'datatreeview', { class: 'form-control' });
        });

        expect(element.hasClass('datatreeview')).toEqual(true);
        expect(element.hasClass('form-control')).toEqual(true);
    });
});