describe('a basic treeview', function () {
    it('can be created', function () {
        var tree = $('#basic-treeview-created');

        expect(tree.length).toEqual(1);
        expect(function () {
            tree.treeview({
                data: [{
                    value: '1',
                    text: 'A value'
                }]
            });
        }).not.toThrow();
        expect(tree.data('treeview')).toBeTruthy();
    });

    it('hides the already present content', function () {
        var tree = $('#basic-treeview-hides');

        tree.treeview({
            data: [{
                value: '1',
                text: 'A value'
            }]
        });

        var hiddenContent = tree.find('.test-hidden');

        expect($(hiddenContent[0]).css('display')).toEqual('none');
        expect($(hiddenContent[1]).css('display')).toEqual('none');
    });

    it('needs required option "data"', function () {
        var tree = $('#basic-treeview-data-required');

        expect(function () {
            tree.treeview();
        }).toThrow('treeview error: expected required option "data"');
    });

    it('needs option "data" to be an array', function () {
        var tree = $('#basic-treeview-data-array');

        expect(function () {
            tree.treeview({
                data: 5
            });
        }).toThrow('treeview error: expected option "data" to be an array');
    });

    it('will add a list', function () {
        var tree = $('#basic-treeview-list');

        tree.treeview({
            data: [{
                value: '1',
                text: 'A value'
            }]
        });

        expect(tree.children('ul.treeview-list').length).toEqual(1);
    });

    it('will add list items', function () {
        var tree = $('#basic-treeview-list-items');

        tree.treeview({
            data: [{
                value: '1',
                text: 'Foo'
            },
            {
                value: '2',
                text: 'Bar'
            }]
        });

        expect(tree.find('ul.treeview-list > li').length).toEqual(2);
    });

    it('will add togglers for list items with children', function () {
        var tree = $('#basic-treeview-list-item-children-toggler');

        tree.treeview({
            data: [{
                value: '1',
                text: 'Foo'
            },
            {
                value: '2',
                text: 'Bar',
                children: [
                    {
                        value: '3',
                        text: 'Baz'
                    },
                    {
                        value: '4',
                        text: 'Quux'
                    }
                ]
            }]
        });

        expect(tree.find('ul.treeview-list > li > .treeview-toggler').length).toEqual(1);
    });

    it('will add child lists', function () {
        var tree = $('#basic-treeview-child-list');

        fail();
    });

    it('will add child list items', function () {
        var tree = $('#basic-treeview-child-list-items');

        fail();
    });
});