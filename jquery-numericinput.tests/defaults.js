describe('numericinput defaults', function () {
    $.fn.numericinput.defaults.getGroupSeparator = function () {
        return '^';
    };

    it('can be changed', function () {
        var input = $('#input-defaults');

        input.numericinput();

        input.val('1234');
        input.change();

        expect(input.val()).toEqual('1^234.00');
    });

    it('can still be overridden in the options after being changed', function () {
        var input = $('#input-defaults-override');

        input.numericinput({
            getGroupSeparator: function () {
                return '`';
            }
        });

        input.val('1234');
        input.change();

        expect(input.val()).toEqual('1`234.00');
    });
});