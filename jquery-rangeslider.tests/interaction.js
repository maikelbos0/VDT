describe('a rangeslider object', function () {
    it('callback is called', function () {
        var called = false;

        $('#rangeslider-interaction-callback').rangeslider({}, function () {
            called = true;
        });

        expect(called).toEqual(true);
    });

    it('is the function scope in the callback when creating a rangeslider', function () {
        var called = false;

        $('#rangeslider-interaction-this').rangeslider({}, function () {
            expect(typeof this.setStep).toEqual('function');
            called = true;
        });

        expect(called).toEqual(true);
    });

    it('is the function scope in the callback when a rangeslider already exists', function () {
        var called = false;

        $('#rangeslider-interaction-this-existing').rangeslider();

        $('#rangeslider-interaction-this-existing').rangeslider(null, function () {
            expect(typeof this.setStep).toEqual('function');
            called = true;
        });

        expect(called).toEqual(true);
    });

    it('callback is called if it\'s the first argument of the function after creating', function () {
        var called = false;

        $('#rangeslider-interaction-callback-no-options').rangeslider();

        $('#rangeslider-interaction-callback-no-options').rangeslider(function () {
            called = true;
        });

        expect(called).toEqual(true);
    });

    it('is the first parameter in the callback', function () {
        var called = false;

        $('#rangeslider-interaction-first-parameter').rangeslider({}, function (s) {
            expect(s).not.toBeNull();
            expect(s).not.toBeUndefined();
            expect(typeof s.setStep).toEqual('function');

            called = true;
        });

        expect(called).toEqual(true);
    });

    it('can be removed', function () {
        var slider = $('#rangeslider-interaction-remove');

        slider.rangeslider(function () {
            this.remove();
        });

        expect(slider.hasClass('.slider')).toEqual(false);
        expect(slider.find('.rangeslider-track').length).toEqual(0);
        expect(slider.find('.rangeslider-thumb').length).toEqual(0);

        var hiddenContent = slider.find('.test-hidden');

        expect($(hiddenContent[0]).css('display')).not.toEqual('none');
        expect($(hiddenContent[1]).css('display')).not.toEqual('none');
    });

    it('can be used to get the value out', function () {
        var slider = $('#rangeslider-interaction-get-value');
        var value;

        slider.rangeslider(function () {
            value = this.getValue();
        });

        expect(value).toEqual(10);
    });

    it('can be used to set the current step', function () {
        var slider = $('#rangeslider-interaction-set-step');
        var value;

        slider.rangeslider(function () {
            this.setStep(3);
            value = this.getValue();
        });

        expect(value).toEqual(30);
    });

    it('can be used to set the current value', function () {
        var slider = $('#rangeslider-interaction-set-value');
        var value;

        slider.rangeslider(function () {
            this.setValue(12);
            value = this.getValue();
        });

        expect(value).toEqual(10);
    });
});