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
});