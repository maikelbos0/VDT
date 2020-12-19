﻿describe('a treeview option', function () {
    it('can be provided for getValueProperty', function () {
        var tree = $('#treeview-options-value-property');
        
        tree.treeview({
            data: [{
                value: '1',
                data: '2',
                text: 'Test'
            }],
            getValueProperty: function () {
                return 'data';
            }
        });

        expect(tree.find('input.treeview-selector').val()).toEqual('2');
    });

    it('can be provided for getTextProperty', function () {
        var tree = $('#treeview-options-text-property');

        tree.treeview({
            data: [{
                value: '1',
                text: 'Test',
                content: 'Foo'
            }],
            getTextProperty: function () {
                return 'content';
            }
        });

        expect(tree.find('li').text()).toEqual('Foo');
    });

    it('can be provided for getSelectedProperty', function () {
        var tree = $('#treeview-options-selected-property');

        tree.treeview({
            data: [{
                value: '1',
                text: 'Test',
                isChecked: true
            }],
            getSelectedProperty: function () {
                return 'isChecked';
            }
        });

        expect(tree.find('input.treeview-selector').is(':checked')).toEqual(true);
    });

    it('can be provided for getChildrenProperty', function () {
        var tree = $('#treeview-options-children-property');

        tree.treeview({
            data: [{
                value: '1',
                text: 'Test',
                nodes: [{
                    value: '2',
                    text: 'Foo'
                },
                {
                    value: '3',
                    text: 'Bar'
                }]
            }],
            getChildrenProperty: function () {
                return 'nodes';
            }
        });

        expect(tree.find('li li').length).toEqual(2);
    });
});