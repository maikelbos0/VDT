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

        fail();
    });

    it('unchecks a checkbox it unchecks all descendants', function () {
        var tree = $('#treeview-events-input-uncheck-children');

        fail();
    });

    it('checks a checkbox it checks ancestors as needed', function () {
        var tree = $('#treeview-events-input-check-parent');

        fail();
    });

    it('unchecks a checkbox it unchecks all ancestors', function () {
        var tree = $('#treeview-events-input-uncheck-parent');

        fail();
    });
});