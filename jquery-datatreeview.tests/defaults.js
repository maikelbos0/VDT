describe('treeview defaults', function () {
    $.fn.treeview.defaults.getTextProperty = function () {
        return 'content';
    };

    it('can be changed', function () {
        var tree = $('#treeview-defaults');

        tree.treeview({
            data: [{
                value: '1',
                text: 'Test',
                content: 'Bar'
            }]
        });

        expect(tree.find('li').text()).toEqual('Bar');
    });

    it('can still be overridden in the options after being changed', function () {
        var tree = $('#treeview-defaults-override');

        tree.treeview({
            data: [{
                value: '1',
                text: 'Test',
                content: 'Bar',
                description: 'Foo'
            }],
            getTextProperty: function () {
                return 'description';
            }
        });

        expect(tree.find('li').text()).toEqual('Foo');
    });
});