describe('a treeview object', function () {
    it('callback is called', function () {
        var called = false;

        $('#treeview-interaction-callback').treeview({
            data: []
        }, function () {
            called = true;
        });

        expect(called).toEqual(true);
    });

    it('is the function scope in the callback when creating a treeview', function () {
        var called = false;

        $('#treeview-interaction-this').treeview({
            data: []
        }, function () {
            expect(typeof this.remove).toEqual('function');
            called = true;
        });

        expect(called).toEqual(true);
    });

    it('is the function scope in the callback when a treeview already exists', function () {
        var called = false;

        $('#treeview-interaction-this-existing').treeview({
            data: []
        });

        $('#treeview-interaction-this-existing').treeview(null, function () {
            expect(typeof this.remove).toEqual('function');
            called = true;
        });

        expect(called).toEqual(true);
    });

    it('callback is called if it\'s the first argument of the function after creating', function () {
        var called = false;

        $('#treeview-interaction-callback-no-options').treeview({
            data: []
        });

        $('#treeview-interaction-callback-no-options').treeview(function () {
            called = true;
        });

        expect(called).toEqual(true);
    });

    it('is the first parameter in the callback', function () {
        var called = false;

        $('#treeview-interaction-first-parameter').treeview({
            data: []
        }, function (s) {
            expect(s).not.toBeNull();
            expect(s).not.toBeUndefined();
            expect(typeof s.remove).toEqual('function');

            called = true;
        });

        expect(called).toEqual(true);
    });

    it('can be removed', function () {
        var tree = $('#treeview-interaction-remove');

        tree.treeview({
            data: []
        }, function () {
            this.remove();
        });

        expect(tree.hasClass('treeview')).toEqual(false);
        expect(tree.find('ul').length).toEqual(0);
        expect(tree.data('treeview')).toBeUndefined();

        var hiddenContent = tree.find('.test-hidden');

        expect($(hiddenContent[0]).css('display')).not.toEqual('none');
        expect($(hiddenContent[1]).css('display')).not.toEqual('none');
    });

    it('can be used to get selected values', function () {
        var tree = $('#treeview-interaction-get-selected-values');
        var selectedValues;

        tree.treeview({
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
        }, function () {
            selectedValues = this.getSelectedValues();
        });

        expect(selectedValues).toEqual(['1', '3', '4', '7']);
    });

    it('can be used to get selected data', function () {
        var tree = $('#treeview-interaction-get-selected-data');
        var selectedData;
        var data = [{
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
        }];

        tree.treeview({
            data: data
        }, function () {
            selectedData = this.getSelectedData();
        });

        expect(selectedData).toEqual([data[0], data[0].children[0], data[0].children[1], data[2]]);
    });

    it('can be used to get selected nodes', function () {
        var tree = $('#treeview-interaction-get-selected-nodes');
        var selectedNodes;

        tree.treeview({
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
        }, function () {
            selectedNodes = this.getSelectedNodes();
        });

        expect(selectedNodes.length).toEqual(4);
        expect(selectedNodes[0]).toEqual(tree.find('li:nth-child(1)')[0]);
        expect(selectedNodes[1]).toEqual(tree.find('li:nth-child(1) li:nth-child(1)')[0]);
        expect(selectedNodes[2]).toEqual(tree.find('li:nth-child(1) li:nth-child(2)')[0]);
        expect(selectedNodes[3]).toEqual(tree.find('li:nth-child(3)')[0]);
    });

    it('can be used to select values', function () {
        var tree = $('#treeview-interaction-set-selected-values');

        tree.treeview({
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
                text: 'Baz',
                selected: true
            }]
        }, function () {
            this.setSelectedValues(['3', '4', '7']);
        });

        expect(tree.find('input.treeview-selector:checked').map(function () { return $(this).val() }).get()).toEqual(['1', '3', '4', '7']);
    });

    it('can be used to select data', function () {
        var tree = $('#treeview-interaction-set-selected-data');

        tree.treeview({
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
                text: 'Baz',
                selected: true
            }]
        }, function () {
            this.setSelectedData(function (value) { return value.text.indexOf('Ba') > -1 });
        });

        expect(tree.find('input.treeview-selector:checked').map(function () { return $(this).val() }).get()).toEqual(['3', '5', '7']);
    });

    it('can be used to select nodes', function () {
        var tree = $('#treeview-interaction-set-selected-nodes');

        tree.treeview({
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
                text: 'Baz',
                selected: true
            }]
        }, function () {
            this.setSelectedNodes(tree.find('li:first-child li'));
        });

        expect(tree.find('input.treeview-selector:checked').map(function () { return $(this).val() }).get()).toEqual(['1', '3', '4']);
    });
});