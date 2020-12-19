describe('a basic datatreeview', function () {
    it('can be created', function () {
        var tree = $('#basic-datatreeview-created');

        expect(tree.length).toEqual(1);
        expect(function () {
            tree.datatreeview({
                data: [{
                    value: '1',
                    text: 'A value'
                }]
            });
        }).not.toThrow();
        expect(tree.data('datatreeview')).toBeTruthy();
    });

    it('hides the already present content', function () {
        var tree = $('#basic-datatreeview-hides');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'A value'
            }]
        });

        var hiddenContent = tree.find('.test-hidden');

        expect($(hiddenContent[0]).css('display')).toEqual('none');
        expect($(hiddenContent[1]).css('display')).toEqual('none');
    });

    it('will add a class', function () {
        var tree = $('#basic-datatreeview-class');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'A value'
            }]
        });

        expect(tree.hasClass('datatreeview')).toEqual(true);
    });

    it('will add a list', function () {
        var tree = $('#basic-datatreeview-list');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'A value'
            }]
        });

        expect(tree.children('ul.datatreeview-list').length).toEqual(1);
    });

    it('will add list items', function () {
        var tree = $('#basic-datatreeview-list-items');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'Foo'
            },
            {
                value: '2',
                text: 'Bar'
            }]
        });

        expect(tree.find('ul.datatreeview-list > li').length).toEqual(2);
    });

    it('will add list item checkboxes', function () {
        var tree = $('#basic-datatreeview-list-item-checkboxes');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'Foo'
            },
            {
                value: '2',
                text: 'Bar'
            }]
        });

        expect(tree.find('ul.datatreeview-list > li > input:checkbox').length).toEqual(2);
    });

    it('will add togglers for list items with children', function () {
        var tree = $('#basic-datatreeview-list-item-children-toggler');

        tree.datatreeview({
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

        expect(tree.find('ul.datatreeview-list > li > .datatreeview-toggler').length).toEqual(1);
    });

    it('will add child lists', function () {
        var tree = $('#basic-datatreeview-child-list');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'Foo',
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
            },
            {
                value: '2',
                text: 'Bar',
                children: [
                    {
                        value: '5',
                        text: 'Baz'
                    },
                    {
                        value: '6',
                        text: 'Quux'
                    }
                ]
            },
            {
                value: '7',
                text: 'Baz'
            }]
        });

        expect(tree.find('ul.datatreeview-list > li > ul.datatreeview-list').length).toEqual(2);
    });

    it('will add child list items', function () {
        var tree = $('#basic-datatreeview-child-list-items');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'Foo',
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
            },
            {
                value: '2',
                text: 'Bar',
                children: [
                    {
                        value: '5',
                        text: 'Baz'
                    },
                    {
                        value: '6',
                        text: 'Quux'
                    }
                ]
            },
            {
                value: '7',
                text: 'Baz'
            }]
        });

        expect(tree.find('ul.datatreeview-list > li > ul.datatreeview-list > li').length).toEqual(4);
    });

    it('will add child list item checkboxes', function () {
        var tree = $('#basic-datatreeview-child-list-item-checkboxes');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'Foo',
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
            },
            {
                value: '2',
                text: 'Bar',
                children: [
                    {
                        value: '5',
                        text: 'Baz'
                    },
                    {
                        value: '6',
                        text: 'Quux'
                    }
                ]
            },
            {
                value: '7',
                text: 'Baz'
            }]
        });

        expect(tree.find('ul.datatreeview-list > li > ul.datatreeview-list > li input:checkbox').length).toEqual(4);
    });

    it('needs required option "data"', function () {
        var tree = $('#basic-datatreeview-data-required');

        expect(function () {
            tree.datatreeview();
        }).toThrow('datatreeview error: expected required option "data"');
    });

    it('needs option "data" to be an array', function () {
        var tree = $('#basic-datatreeview-data-array');

        expect(function () {
            tree.datatreeview({
                data: 5
            });
        }).toThrow('datatreeview error: expected option "data" to be an array');
    });

    it('will check checkboxes for selected data nodes', function () {
        var tree = $('#basic-datatreeview-select-checkboxes');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'Foo',
                children: [
                    {
                        value: '3',
                        text: 'Baz',
                        selected: true
                    },
                    {
                        value: '4',
                        text: 'Quux',
                        selected: true
                    }
                ]
            },
            {
                value: '2',
                text: 'Bar',
                children: [
                    {
                        value: '5',
                        text: 'Baz'
                    },
                    {
                        value: '6',
                        text: 'Quux'
                    }
                ]
            },
            {
                value: '7',
                text: 'Baz',
                selected: true
            }]
        });

        expect(tree.find('input:checked').length).toEqual(4);
    });
});