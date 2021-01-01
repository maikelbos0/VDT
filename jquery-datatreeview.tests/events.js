describe('when a user', function () {
    it('clicks on a toggler it hides the child items and changes the class', function () {
        var tree = $('#datatreeview-events-toggler-click');

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

        tree.find('li > .datatreeview-toggler').click();

        expect(tree.find('li > .datatreeview-toggler').hasClass('datatreeview-toggler-closed')).toEqual(true);
        expect(tree.find('li > ul').css('display')).toEqual('none');
    });

    it('clicks on a closed toggler it shows the child items and changes the class', function () {
        var tree = $('#datatreeview-events-toggler-click-open');

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

        tree.find('li > .datatreeview-toggler').click();
        tree.find('li > .datatreeview-toggler').click();

        expect(tree.find('li > .datatreeview-toggler').hasClass('datatreeview-toggler-closed')).toEqual(false);
        expect(tree.find('li > ul').css('display')).not.toEqual('none');
    });

    it('checks a checkbox it checks all descendants', function () {
        var tree = $('#datatreeview-events-input-check-children');

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

        tree.find('> ul > li:nth-child(2) > label').click();

        expect(tree.find('input:checked').length).toEqual(3);
    });

    it('unchecks a checkbox it unchecks all descendants', function () {
        var tree = $('#datatreeview-events-input-uncheck-children');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'Foo'
            },
            {
                value: '2',
                text: 'Bar',
                selected: true,
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
            }]
        });

        tree.find('> ul > li:nth-child(2) > label').click();

        expect(tree.find('input:checked').length).toEqual(0);
    });

    it('checks a checkbox it checks ancestors as needed', function () {
        var tree = $('#datatreeview-events-input-check-parent');

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
                        text: 'Quux',
                        selected: true
                    }
                ]
            }]
        });

        tree.find('> ul > li:nth-child(2) > label').click();

        expect(tree.find('input:checked').length).toEqual(3);
    });

    it('unchecks a checkbox it unchecks all ancestors', function () {
        var tree = $('#datatreeview-events-input-uncheck-parent');

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
                        text: 'Baz',
                        selected: true
                    },
                    {
                        value: '4',
                        text: 'Quux',
                        selected: true
                    }
                ]
            }]
        });

        tree.find('li:nth-child(2) li:first-child > label').click();

        expect(tree.find('input:checked').length).toEqual(1);
    });

    it('checks a checkbox in freehand mode does not change descendants', function () {
        var tree = $('#datatreeview-events-check-input-child-freehand');

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

        tree.find('> ul > li:nth-child(2) > label').click();

        expect(tree.find('input:checked').length).toEqual(1);
    });

    it('unchecks a checkbox in freehand mode does not change descendants', function () {
        var tree = $('#datatreeview-events-uncheck-input-child-freehand');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'Foo'
            },
            {
                value: '2',
                text: 'Bar',
                selected: true,
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
            }]
        });

        tree.find('> ul > li:nth-child(2) > label').click();

        expect(tree.find('input:checked').length).toEqual(2);
    });

    it('checks a checkbox in freehand mode does not change ancestors', function () {
        var tree = $('#datatreeview-events-check-input-parent-freehand');

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
                        text: 'Quux',
                        selected: true
                    }
                ]
            }]
        });

        tree.find('> ul > li:nth-child(2) > label').click();

        expect(tree.find('input:checked').length).toEqual(2);
    });

    it('unchecks a checkbox in freehand mode does not change ancestors', function () {
        var tree = $('#datatreeview-events-uncheck-input-parent-freehand');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'Foo'
            },
            {
                value: '2',
                text: 'Bar',
                selected: true,
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
            }]
        });

        tree.find('li:nth-child(2) li:first-child > label').click();

        expect(tree.find('input:checked').length).toEqual(2);
    });

    it('changes the treeview selection it triggers the selection changed event', function () {
        var tree = $('#datatreeview-events-selection-changed');
        var selectedData;
        var selectedValues;
        var data = [{
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
        }];

        tree.datatreeview({
            data: data
        });

        tree.on('datatreeview.selectionChanged', function (_, data, values) {
            selectedData = data;
            selectedValues = values;
        });

        tree.find('> ul > li:first-child > label').click();

        expect(selectedData).toEqual([data[0]]);
        expect(selectedValues).toEqual(['1']);
    });

    it('toggles open a treeview node it triggers the nodes expanded event', function () {
        var tree = $('#datatreeview-events-toggled-open');
        var toggledNode;

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

        tree.find('> ul > li:nth-child(2) > .datatreeview-toggler').click();

        tree.on('datatreeview.nodesExpanded', function (_, node) {
            toggledNode = node;
        });

        tree.find('> ul > li:nth-child(2) > .datatreeview-toggler').click();

        expect(toggledNode.get()).toEqual(tree.find('> ul > li:nth-child(2)').get());
    });

    it('toggles closed a treeview node it triggers the nodes collapsed event', function () {
        var tree = $('#datatreeview-events-toggled-closed');
        var toggledNode;

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

        tree.on('datatreeview.nodesCollapsed', function (_, node) {
            toggledNode = node;
        });

        tree.find('> ul > li:nth-child(2) > .datatreeview-toggler').click();
        
        expect(toggledNode.get()).toEqual(tree.find('> ul > li:nth-child(2)').get());
    });
});