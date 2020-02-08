describe('a basic numericinput', function () {
    it('can be created', function () {
        var input = $('#basic-input-can-be-created');

        expect(input.length).toEqual(1);
        expect(function () {
            input.numericinput();
        }).not.toThrow();
        expect(input.hasClass('numericinput')).toEqual(true);
    });

    it('can be removed', function () {
        var input = $('#basic-input-can-be-removed');

        input.numericinput();
        input.numericinput(function () {
            this.remove();
        });

        expect(input.hasClass('numericinput')).toEqual(false);
    });
});