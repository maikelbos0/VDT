describe('datatreeview defaults', function () {
    $.fn.datatreeview.defaults.getTextProperty = function () {
        return 'content';
    };

    it('can be changed', function () {
        var tree = $('#datatreeview-defaults');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'Test',
                content: 'Bar'
            }]
        });

        expect(tree.find('li').text()).toEqual('Bar');
    });

    it('can still be overridden in the options after being changed', function () {
        var tree = $('#datatreeview-defaults-override');

        tree.datatreeview({
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