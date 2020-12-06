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
        var tree = $('#treeview-interaction-get-select-values');
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
        var tree = $('#treeview-interaction-get-select-data');
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

        var selectedData;

        tree.treeview({
            data: data
        }, function () {
            selectedData = this.getSelectedData();
        });

        expect(selectedData).toEqual([data[0], data[0].children[0], data[0].children[1], data[3]]);
    });

    it('can be used to select values', function () {
        var tree = $('#treeview-interaction-select-value');

        fail();
    });

    it('can be used to deselect values', function () {
        var tree = $('#treeview-interaction-select-value');

        fail();
    });

    it('can be used to select data', function () {
        var tree = $('#treeview-interaction-select-data');

        fail();
    });

    it('can be used to deselect data', function () {
        var tree = $('#treeview-interaction-select-data');

        fail();
    });
});