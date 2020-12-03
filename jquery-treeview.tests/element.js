describe('creating an element for treeview', function () {
    it('succeeds', function () {
        var tree = $('#element-succeeds');
        var element;

        tree.treeview(function () {
            element = this.createElement('<div>', 'treeview');
        });

        expect(element.prop('tagName')).toEqual('DIV');
        expect(element.hasClass('treeview')).toEqual(true);
    });

    it('succeeds with attributes', function () {
        var tree = $('#element-attributes');
        var element;

        tree.treeview(function () {
            element = this.createElement('<div>', 'treeview', { id: 'test', value: 'value' });
        });

        expect(element.attr('id')).toEqual('test');
        expect(element.attr('value')).toEqual('value');
    });

    it('succeeds with multiple attributes objects', function () {
        var tree = $('#element-attributes-multiple');
        var element;

        tree.treeview(function () {
            element = this.createElement('<div>', 'treeview', { id: 'test', value: 'value' }, { id: 'test2' });
        });

        expect(element.attr('id')).toEqual('test2');
        expect(element.attr('value')).toEqual('value');
    });

    it('class always gets added', function () {
        var tree = $('#element-attributes-class');
        var element;

        tree.treeview(function () {
            element = this.createElement('<div>', 'treeview', { class: 'form-control' });
        });

        expect(element.hasClass('treeview')).toEqual(true);
        expect(element.hasClass('form-control')).toEqual(true);
    });
});