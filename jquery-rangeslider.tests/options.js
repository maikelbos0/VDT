describe('a rangeslider option', function () {
    it('can be provided for getRangeStart', function () {
        var slider = $('#options-range-start');
        var value;
        
        slider.rangeslider({
            getRangeStart: function (element) {
                return -10;
            }
        },
        function (slider) {
            value = slider.rangeStart;
        });

        expect(value).toEqual(-10);
    });

    it('can be provided for getStepCount', function () {
        var slider = $('#options-step-count');
        var value;

        slider.rangeslider({
            getStepCount: function (element) {
                return 15;
            }
        },
        function (slider) {
            value = slider.stepCount;
        });

        expect(value).toEqual(15);
    });

    it('can be provided for getStepSize', function () {
        var slider = $('#options-step-size');
        var value;

        slider.rangeslider({
            getStepSize: function (element) {
                return 23;
            }
        },
        function (slider) {
            value = slider.stepSize;
        });

        expect(value).toEqual(23);
    });

    it('can be provided for getValue', function () {
        var slider = $('#options-value');
        var value;

        slider.rangeslider({
            getValue: function (element) {
                return 20;
            }
        },
        function (slider) {
            value = slider.getValue();
        });

        expect(value).toEqual(20);
    });
});