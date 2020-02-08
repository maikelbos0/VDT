describe('numericinput format options', function () {
    it('have expected defaults', function () {
        var input = $('#input-format-defaults');

        input.numericinput();

        input.val('-1234.5678');
        input.change();

        expect(input.val()).toEqual('-1,234.57');
    });

    it('can be provided for decimal separator', function () {
        var input = $('#input-format-decimal-separator');
        
        input.numericinput();

        input.val('-1234\'5678');
        input.change();

        expect(input.val()).toEqual('-1,234\'57');
    });

    it('can be provided for decimal digits', function () {
        var input = $('#input-format-decimal-digits');

        input.numericinput();

        input.val('-1234.5678');
        input.change();

        expect(input.val()).toEqual('-1,234.568');
    });

    it('can be provided for negative symbol', function () {
        var input = $('#input-format-negative-symbol');

        input.numericinput();

        input.val('~1234.5678');
        input.change();

        expect(input.val()).toEqual('~1,234.57');
    });

    it('can be provided for group separator', function () {
        var input = $('#input-format-group-separator');

        input.numericinput();

        input.val('-1 234.5678');
        input.change();

        expect(input.val()).toEqual('-1 234.57');
    });

    it('can be provided for group sizes', function () {
        var input = $('#input-format-group-sizes');

        input.numericinput();

        input.val('-12341234.5678');
        input.change();

        expect(input.val()).toEqual('-1,23,41,234.57');
    });
});