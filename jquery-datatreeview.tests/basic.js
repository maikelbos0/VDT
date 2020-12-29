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

        expect(tree.find('li.datatreeview-node').length).toEqual(2);
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

        expect(tree.find('input.datatreeview-field:checkbox').length).toEqual(2);
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

        expect(tree.find('.datatreeview-toggler').length).toEqual(1);
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

        expect(tree.find('li.datatreeview-node > ul.datatreeview-list').length).toEqual(2);
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

        expect(tree.find('li.datatreeview-node > ul.datatreeview-list > li.datatreeview-node').length).toEqual(4);
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

    it('will check checkboxes including ancestors as needed for selected data nodes', function () {
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
                selected: true,
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

        expect(tree.find('input.datatreeview-field:checked').map(function () { return $(this).val(); }).get()).toEqual(['1', '3', '4', '7']);
    });

    it('will get values from the supplied property', function () {
        var tree = $('#basic-datatreeview-value');

        tree.datatreeview({
            data: [{
                data: '1',
                text: 'Foo',
                children: [
                    {
                        data: '3',
                        text: 'Baz'
                    },
                    {
                        data: '4',
                        text: 'Quux'
                    }
                ]
            }]
        });

        expect(tree.find('input').map(function () { return $(this).val(); }).get()).toEqual(['1', '3', '4']);
    });

    it('will get text from the supplied property', function () {
        var tree = $('#basic-datatreeview-text');

        tree.datatreeview({
            data: [{
                value: '1',
                description: 'Foo',
                children: [
                    {
                        value: '3',
                        description: 'Baz'
                    },
                    {
                        value: '4',
                        description: 'Quux'
                    }
                ]
            }]
        });

        expect(tree.find('label').map(function () { return $(this).text(); }).get()).toEqual(['Foo', 'Baz', 'Quux']);
    });

    it('will get children from the supplied property', function () {
        var tree = $('#basic-datatreeview-children');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'Foo',
                childNodes: [
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

        expect(tree.find('li > ul > li').length).toEqual(2);
    });

    it('will get selected status from the supplied property', function () {
        var tree = $('#basic-datatreeview-selected');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'Foo',
                children: [
                    {
                        value: '3',
                        text: 'Baz',
                        checked: true
                    },
                    {
                        value: '4',
                        text: 'Quux',
                        checked: true
                    }
                ]
            }]
        });

        expect(tree.find('input:checked').length).toEqual(3);
    });

    it('will name the input', function () {
        var tree = $('#basic-datatreeview-input');

        tree.datatreeview({
            data: [{
                value: '7',
                text: 'Baz'
            }]
        });

        expect(tree.find('input.datatreeview-field').prop('name')).toEqual('test');
    });

    it('will check checkboxes for only selected data nodes in freehand mode', function () {
        var tree = $('#basic-datatreeview-freehand-select');

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
                selected: true,
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

        expect(tree.find('input.datatreeview-field:checked').map(function () { return $(this).val(); }).get()).toEqual(['3', '4', '2', '7']);
    });

    it('is disabled if data-disabled is true', function () {
        var tree = $('#basic-datatreeview-disabled');

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
            }]
        });

        expect(tree.find('input:checkbox:disabled').length).toEqual(3);
    });

    it('is created with the correct toggle options', function () {
        var tree = $('#basic-datatreeview-toggle-options');
        var options;

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
            }]
        },
        function () {
            options = this.toggleOptions;
        });

        expect(options).toEqual({
            duration: 300,
            easing: 'linear'
        });
    });

    it('is collapsed if data-collapsed is true', function () {
        var tree = $('#basic-datatreeview-collapsed');

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
            }]
        });

        expect(tree.find('li > ul').css('display')).toEqual('none');
        expect(tree.find('li > .datatreeview-toggler').hasClass('datatreeview-toggler-closed')).toEqual(true);
    });
});