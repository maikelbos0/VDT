describe('a datatreeview object', function () {
    it('callback is called', function () {
        var called = false;

        $('#datatreeview-interaction-callback').datatreeview({
            data: []
        }, function () {
            called = true;
        });

        expect(called).toEqual(true);
    });

    it('is the function scope in the callback when creating a datatreeview', function () {
        var called = false;

        $('#datatreeview-interaction-this').datatreeview({
            data: []
        }, function () {
            expect(typeof this.remove).toEqual('function');
            called = true;
        });

        expect(called).toEqual(true);
    });

    it('is the function scope in the callback when a datatreeview already exists', function () {
        var called = false;

        $('#datatreeview-interaction-this-existing').datatreeview({
            data: []
        });

        $('#datatreeview-interaction-this-existing').datatreeview(null, function () {
            expect(typeof this.remove).toEqual('function');
            called = true;
        });

        expect(called).toEqual(true);
    });

    it('callback is called if it\'s the first argument of the function after creating', function () {
        var called = false;

        $('#datatreeview-interaction-callback-no-options').datatreeview({
            data: []
        });

        $('#datatreeview-interaction-callback-no-options').datatreeview(function () {
            called = true;
        });

        expect(called).toEqual(true);
    });

    it('is the first parameter in the callback', function () {
        var called = false;

        $('#datatreeview-interaction-first-parameter').datatreeview({
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
        var tree = $('#datatreeview-interaction-remove');

        tree.datatreeview({
            data: []
        }, function () {
            this.remove();
        });

        expect(tree.hasClass('datatreeview')).toEqual(false);
        expect(tree.find('ul').length).toEqual(0);
        expect(tree.data('datatreeview')).toBeUndefined();

        var hiddenContent = tree.find('.test-hidden');

        expect($(hiddenContent[0]).css('display')).not.toEqual('none');
        expect($(hiddenContent[1]).css('display')).not.toEqual('none');
    });

    it('can be used to get selected values', function () {
        var tree = $('#datatreeview-interaction-get-selected-values');
        var selectedValues;

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
        }, function () {
            selectedValues = this.getSelectedValues();
        });

        expect(selectedValues).toEqual(['1', '3', '4', '7']);
    });

    it('can be used to get selected data', function () {
        var tree = $('#datatreeview-interaction-get-selected-data');
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

        tree.datatreeview({
            data: data
        }, function () {
            selectedData = this.getSelectedData();
        });

        expect(selectedData).toEqual([data[0], data[0].children[0], data[0].children[1], data[2]]);
    });

    it('can be used to get selected nodes', function () {
        var tree = $('#datatreeview-interaction-get-selected-nodes');
        var selectedNodes;

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
        var tree = $('#datatreeview-interaction-set-selected-values');

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
                text: 'Baz',
                selected: true
            }]
        }, function () {
            this.setSelectedValues(['3', '4', '7']);
        });

        expect(tree.find('input:checked').map(function () { return $(this).val() }).get()).toEqual(['1', '3', '4', '7']);
    });

    it('can be used to select data', function () {
        var tree = $('#datatreeview-interaction-set-selected-data');

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
                text: 'Baz',
                selected: true
            }]
        }, function () {
            this.setSelectedData(function (value) { return value.text.indexOf('Ba') > -1 });
        });

        expect(tree.find('input:checked').map(function () { return $(this).val() }).get()).toEqual(['3', '5', '7']);
    });

    it('can be used to select nodes', function () {
        var tree = $('#datatreeview-interaction-set-selected-nodes');

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
                text: 'Baz',
                selected: true
            }]
        }, function () {
            this.setSelectedNodes(tree.find('li:first-child li'));
        });

        expect(tree.find('input:checked').map(function () { return $(this).val() }).get()).toEqual(['1', '3', '4']);
    });

    it('can be used to select nodes in freehand selection mode', function () {
        var tree = $('#datatreeview-interaction-set-selected-nodes-freehand');

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
                text: 'Baz',
                selected: true
            }]
        }, function () {
            this.setSelectedNodes(tree.find('li:first-child, li li:first-child'));
        });

        expect(tree.find('input:checked').map(function () { return $(this).val() }).get()).toEqual(['1', '3', '5']);
    });

    it('can be enabled', function () {
        var tree = $('#datatreeview-interaction-enable');

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
        }, function () {
                this.disable();
                this.enable();
        });

        expect(tree.find('input:checkbox:not(:disabled)').length).toEqual(3);
    });

    it('can be disabled', function () {
        var tree = $('#datatreeview-interaction-disable');

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
        }, function () {
            this.disable();
        });

        expect(tree.find('input:checkbox:disabled').length).toEqual(3);
    });
});