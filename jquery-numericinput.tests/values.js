describe('numericinput value options', function () {
    it('can be provided for maximum value', function () {
        var input = $('#input-value-maximum');

        input.numericinput();

        input.val('50');
        input.change();

        expect(input.val()).toEqual('10.00');
    });

    it('for maximum value of zero works', function () {
        var input = $('#input-value-maximum-zero');

        input.numericinput();

        input.val('50');
        input.change();

        expect(input.val()).toEqual('0.00');
    });

    it('can be provided for minimum value', function () {
        var input = $('#input-value-minimum');

        input.numericinput();

        input.val('-10');
        input.change();

        expect(input.val()).toEqual('20.00');
    });

    it('for minimum value of zero works', function () {
        var input = $('#input-value-minimum-zero');

        input.numericinput();

        input.val('-10');
        input.change();

        expect(input.val()).toEqual('0.00');
    });

    it('for error display duration', function () {
        var input = $('#input-error-display-duration');
        var duration;

        input.numericinput(function () {
            duration = this.errorDisplayDuration;
        });

        expect(duration).toEqual(400);
    });
});