describe('when a user', function () {
    it('clicks on a toggler it hides the child items and changes the class', function () {
        var tree = $('#treeview-events-toggler-click');

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

        tree.find('li:nth-child(2) > .treeview-toggler').click();

        expect(tree.find('li:nth-child(2) > .treeview-toggler').hasClass('treeview-toggler-closed')).toEqual(true);
        expect(tree.find('li ul').css('display')).toEqual('none');
    });

    it('clicks on a closed toggler it shows the child items and changes the class', function () {
        var tree = $('#treeview-events-toggler-click-open');

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

        tree.find('li:nth-child(2) > .treeview-toggler').click();
        tree.find('li:nth-child(2) > .treeview-toggler').click();

        expect(tree.find('li:nth-child(2) > .treeview-toggler').hasClass('treeview-toggler-closed')).toEqual(false);
        expect(tree.find('li ul').css('display')).not.toEqual('none');
    });

    it('checks a checkbox it checks all descendants', function () {
        var tree = $('#treeview-events-input-check-children');

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

        tree.find('li:nth-child(2):has(li) > input.treeview-selector').click();

        expect(tree.find('input:checked').length).toEqual(3);
    });

    it('unchecks a checkbox it unchecks all descendants', function () {
        var tree = $('#treeview-events-input-uncheck-children');

        tree.treeview({
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

        tree.find('li:nth-child(2):has(li) > input.treeview-selector').click();

        expect(tree.find('input:checked').length).toEqual(0);
    });

    it('checks a checkbox it checks ancestors as needed', function () {
        var tree = $('#treeview-events-input-check-parent');

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
                        text: 'Quux',
                        selected: true
                    }
                ]
            }]
        });

        tree.find('li:nth-child(2) li:first-child > input.treeview-selector').click();

        expect(tree.find('input:checked').length).toEqual(3);
    });

    it('unchecks a checkbox it unchecks all ancestors', function () {
        var tree = $('#treeview-events-input-uncheck-parent');

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

        tree.find('li:nth-child(2) li:first-child > input.treeview-selector').click();

        expect(tree.find('input:checked').length).toEqual(1);
    });
});