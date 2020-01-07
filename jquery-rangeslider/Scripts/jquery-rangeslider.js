(function ($) {

    // Extension for creating range slider; supports multiple creations in one call
    $.fn.rangeslider = function (settings, callback) {
        // Allow callback to be the only argument
        if ($.isFunction(settings)) {
            callback = settings;
            settings = null;
        }

        return $(this).each(function () {
            // Get object from data
            let rangeslider = $(this).data('rangeslider');

            if (!rangeslider) {
                // Create object
                let options = $.extend({}, $.fn.rangeslider.defaults, settings);
                rangeslider = new Rangeslider($(this), options);

                // Add object to data
                $(this).data('rangeslider', rangeslider);
            }

            // Call the callback, bound to the rangeslider
            if ($.isFunction(callback)) {
                callback.bind(rangeslider)(rangeslider);
            }
        });
    }

    // Set defaults for extension
    $.fn.rangeslider.defaults = {
        // The starting point of the value range
        // Defaults to the data-property range-start with as fallback 0
        getRangeStart: function (element) {
            let rangeStart = parseInt($(element).data('range-start'));

            if (isNaN(rangeStart)) {
                rangeStart = 0;
            }

            return rangeStart;
        },
        // The number of steps
        // The number of possible values is step count + 1
        // Defaults to the data-property step-count with as fallback 10
        getStepCount: function (element) {
            let stepCount = parseInt($(element).data('step-count'));

            if (isNaN(stepCount) || stepCount <= 0) {
                stepCount = 10;
            }

            return stepCount;
        },
        // The value increase for each step
        // The range end value will be range start + step count * step size
        // Defaults to the data-property step-size with as fallback 10
        getStepSize: function (element) {
            let stepSize = parseInt($(element).data('step-size'));

            if (isNaN(stepSize) || stepSize <= 0) {
                stepSize = 10;
            }

            return stepSize;
        },
        // The value when initializing the range slider
        // Values outside the range of valid values will be corrected when initializing
        // Defaults to the data-property value with as fallback 0
        getValue: function (element) {
            let value = parseInt($(element).data('value'));

            if (isNaN(value)) {
                value = 0;
            }

            return value;
        }
    }

    // Rangeslider implementation
    function Rangeslider(element, options) {
        let base = this;
        this.element = element;
        this.options = options;

        this.rangeStart = options.getRangeStart(this.element);
        this.stepCount = options.getStepCount(this.element);
        this.stepSize = options.getStepSize(this.element);
        this.value = options.getValue(this.element);

        if (this.value < this.rangeStart) {
            this.value = this.rangeStart;
        }
        else if (this.value > this.rangeStart + this.stepCount * this.stepSize) {
            this.value = this.rangeStart + this.stepCount * this.stepSize;
        }
        else if (Math.round(this.value / this.stepSize) !== this.value / this.stepSize) {
            this.value = Math.round(this.value / this.stepSize) * this.stepSize;
        }

        this.element.addClass('rangeslider');
        this.element.children().hide();

        this.track = this.createElement('<div>', 'rangeslider-track'); //, this.options.getTrackAttributes());
        this.thumb = this.createElement('<div>', 'rangeslider-thumb'); //, this.options.getThumbAttributes());
        this.element.append(this.track, this.thumb);


    }

    // Create an element and merge attribute objects to attributes
    Rangeslider.prototype.createElement = function (tagName, className) {
        let attributes = $.extend.apply({}, Array.prototype.slice.call(arguments, 2));
        let element = $(tagName, attributes).addClass(className);

        return element;
    }

}(jQuery));