describe('when a user', function () {
    it('changes the input value to an invalid numer it triggers an error event', function () {
        var input = $('#input-event-error-event');
        var called = false;

        input.numericinput();
        input.on('numericinput.error', function () {
            called = true;
        });

        input.val('a');
        input.change();

        expect(called).toEqual(true);
    });
});