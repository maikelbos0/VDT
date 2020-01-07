/// <reference path="range.html" />

describe('a rangeslider can use range options for ', function () {
    it('getting default range start', function () {
        var slider = $('#range-range-start-default');
        var value;

        slider.rangeslider(function (slider) {
            value = slider.rangeStart;
        });

        expect(value).toEqual(0);
    });

    it('getting provided range start', function () {
        var slider = $('#range-range-start-value');
        var value;

        slider.rangeslider(function (slider) {
            value = slider.rangeStart;
        });

        expect(value).toEqual(-10);
    });

    it('getting default step count', function () {
        var slider = $('#range-step-count-default');
        var value;

        slider.rangeslider(function (slider) {
            value = slider.stepCount;
        });

        expect(value).toEqual(10);
    });

    it('getting default step count for 0', function () {
        var slider = $('#range-step-count-default-0');
        var value;

        slider.rangeslider(function (slider) {
            value = slider.stepCount;
        });

        expect(value).toEqual(10);
    });

    it('getting provided step count', function () {
        var slider = $('#range-step-count-value');
        var value;

        slider.rangeslider(function (slider) {
            value = slider.stepCount;
        });

        expect(value).toEqual(5);
    });

    it('getting default step size', function () {
        var slider = $('#range-step-size-default');
        var value;

        slider.rangeslider(function (slider) {
            value = slider.stepSize;
        });

        expect(value).toEqual(10);
    });

    it('getting default step size for 0', function () {
        var slider = $('#range-step-size-default-0');
        var value;

        slider.rangeslider(function (slider) {
            value = slider.stepSize;
        });

        expect(value).toEqual(10);
    });

    it('getting provided step size', function () {
        var slider = $('#range-step-size-value');
        var value;

        slider.rangeslider(function (slider) {
            value = slider.stepSize;
        });

        expect(value).toEqual(23);
    });

    it('getting default value', function () {
        var slider = $('#range-value-default');
        var value;

        slider.rangeslider(function (slider) {
            value = slider.value;
        });

        expect(value).toEqual(0);
    });

    it('getting corrected value when invalid', function () {
        var slider = $('#range-value-invalid-value');
        var value;

        slider.rangeslider(function (slider) {
            value = slider.value;
        });

        expect(value).toEqual(10);
    });

    it('getting provided value', function () {
        var slider = $('#range-value-value');
        var value;

        slider.rangeslider(function (slider) {
            value = slider.value;
        });

        expect(value).toEqual(20);
    });
});