describe('a basic numericinput', function () {
    it('can be created', function () {
        var input = $('#basic-input-can-be-created');

        expect(input.length).toEqual(1);
        expect(function () {
            input.numericinput();
        }).not.toThrow();
        expect(input.data('numericinput')).toBeTruthy();
    });

    it('can be removed', function () {
        var input = $('#basic-input-can-be-removed');

        input.numericinput();
        input.numericinput(function () {
            this.remove();
        });

        expect(input)
        expect(input.data('numericinput')).toBeUndefined();
    });

    it('validates valid input on change', function () {
        var input = $('#basic-input-validates-valid');

        input.numericinput();

        input.val('00234.56');
        input.change();

        expect(input.val()).toEqual('234.56');
        expect(input.css('border-color')).toEqual('');
    });

    it('validates invalid input on change', function () {
        var input = $('#basic-input-validates-invalid');

        input.numericinput();

        input.val('a');
        input.change();

        expect(input.val()).toEqual('');
        expect(input.css('border-color')).toEqual('red');
    });

    it('clears the error for invalid input', function () {
        jasmine.clock().install();

        var input = $('#basic-input-clears-invalid');

        input.numericinput();

        input.val('a');
        input.change();

        jasmine.clock().tick(500);

        expect(input.css('border-color')).toEqual('');

        jasmine.clock().uninstall();
    });

    it('leaves the initial empty value', function () {
        var input = $('#basic-input-empty-initial-value');

        input.numericinput();

        expect(input.val()).toEqual('');
    });

    it('formats the initial valid value', function () {
        var input = $('#basic-input-valid-initial-value');

        input.numericinput();

        expect(input.val()).toEqual('123.00');
    });

    it('clears the initial invalid value', function () {
        var input = $('#basic-input-invalid-initial-value');

        input.numericinput();

        expect(input.val()).toEqual('');
        expect(input.css('border-color')).toEqual('red');
    });
});