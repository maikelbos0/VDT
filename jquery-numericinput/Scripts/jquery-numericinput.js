(function ($) {

    // Extension for creating numeric input; supports multiple creations in one call
    $.fn.numericinput = function (settings, callback) {
        // Allow callback to be the only argument
        if ($.isFunction(settings)) {
            callback = settings;
            settings = null;
        }

        return $(this).each(function () {
            // Get object from data
            let numericinput = $(this).data('numericinput');

            if (!numericinput) {
                // Create object
                let options = $.extend({}, $.fn.numericinput.defaults, settings);
                numericinput = new Numericinput($(this), options);

                // Add object to data
                $(this).data('numericinput', numericinput);
            }

            // Call the callback, bound to the numericinput
            if ($.isFunction(callback)) {
                callback.bind(numericinput)(numericinput);
            }
        });
    }

    // Set defaults for extension
    $.fn.numericinput.defaults = {
        // Defaults to the data-property decimal-separator with as fallback '.'
        getDecimalSeparator: function (element) {
            let decimalSeparator = $(element).data('decimal-separator');

            if (!decimalSeparator) {
                decimalSeparator = '.';
            }

            return decimalSeparator;
        },
        // Defaults to the data-property decimal-digits with as fallback 2
        getDecimalDigits: function (element) {
            let decimalDigits = parseInt($(element).data('decimal-digits'));

            if (isNaN(decimalDigits) || decimalDigits < 0) {
                decimalDigits = 2;
            }

            return decimalDigits;
        },
        // Defaults to the data-property negative-symbol with as fallback '-'
        getNegativeSymbol: function (element) {
            let negativeSymbol = $(element).data('negative-symbol');

            if (!negativeSymbol) {
                negativeSymbol = '-';
            }

            return negativeSymbol;
        },
        // Defaults to the data-property group-separator with as fallback ','
        getGroupSeparator: function (element) {
            let groupSeparator = $(element).data('group-separator');

            if (!groupSeparator) {
                groupSeparator = ',';
            }

            return groupSeparator;
        },
        // Defaults to the data-property group-sizes with as fallback [3]
        getGroupSizes: function (element) {
            let groupSizes = ($(element).data('group-sizes') || '').toString().split(',').map(function (size) {
                return parseInt(size);
            }).filter(function (size) {
                return !isNaN(size);
            });

            if (groupSizes.length == 0) {
                groupSizes = [3];
            }

            return groupSizes;
        },
        // Defaults to the data-property maximum-value
        getMaximumValue: function (element) {
            let maximumValue = parseInt($(element).data('maximum-value'));

            if (isNaN(maximumValue)) {
                maximumValue = null;
            }

            return maximumValue;
        },
        // Defaults to the data-property minimum-value
        getMinimumValue: function (element) {
            let minimumValue = parseInt($(element).data('minimum-value'));

            if (isNaN(minimumValue)) {
                minimumValue = null;
            }

            return minimumValue;
        },
        // The function that gets called to show the user an error status
        // Defaults to a function that adds a red border
        showError: function (element) {
            element.css('border-color', 'red');
        },
        // The function that gets called to remove the error status
        // Defaults to a function that removes the red border
        hideError: function (element) {
            element.css('border-color', '');
        },
        // The duration in milliseconds between showing and hiding the error
        // Defaults to the data-property error-display-duration with as fallback 200
        getErrorDisplayDuration: function (element) {
            let duration = parseInt($(element).data('error-display-duration'));

            if (isNaN(duration)) {
                duration = 200;
            }

            return duration;
        }
    }

    // Numericinput implementation
    function Numericinput(element, options) {
        this.element = element;
        this.options = options;

        this.decimalSeparator = options.getDecimalSeparator(this.element);
        this.decimalDigits = options.getDecimalDigits(this.element);
        this.negativeSymbol = options.getNegativeSymbol(this.element);
        this.groupSeparator = options.getGroupSeparator(this.element);
        this.groupSizes = options.getGroupSizes(this.element);
        this.maximumValue = options.getMaximumValue(this.element);
        this.minimumValue = options.getMinimumValue(this.element);
        this.showError = options.showError;
        this.hideError = options.hideError;
        this.errorDisplayDuration = options.getErrorDisplayDuration(this.element);

        // Event handlers
        this.element.on('change', this, eventHandlers.change);

        // Trigger change to validate the  value
        this.element.trigger('change');
    }

    // Remove the numeric input properties; resets the input element to its former state
    Numericinput.prototype.remove = function () {
        this.element.off('change', eventHandlers.change);
        this.element.removeData('numericinput');
    }

    // Temporarily set the input to error state
    Numericinput.prototype.error = function () {
        let base = this;

        this.showError(this.element);

        window.setTimeout(function () {
            base.hideError(base.element);
        }, this.errorDisplayDuration);
    }

    // Get the value from the input and try to parse it as a number
    Numericinput.prototype.getValue = function () {
        let stringValue = this.element.val()
            .replace(this.groupSeparator, '')
            .replace(this.negativeSymbol, '-')
            .replace(this.decimalSeparator, '.');

        if (stringValue == '') {
            return null;
        }
        else {
            return parseFloat(stringValue);
        }
    }

    // Set the value in the input to a formatted number
    Numericinput.prototype.setValue = function (value) {
        let formattedValue = '';

        if (!isNaN(value) && value !== null) {
            let isNegative = value < 0;
            let absoluteValue = Math.abs(value);
            let integerValue = Math.floor(absoluteValue).toString().split("");
            let groupIndex = 0;
            let groupSize = this.groupSizes[groupIndex];

            while (integerValue.length > 0) {
                if (groupSize == 0) {
                    if (groupIndex < this.groupSizes.length - 1) {
                        groupIndex++;
                    }

                    formattedValue = this.groupSeparator + formattedValue;
                    groupSize = this.groupSizes[groupIndex];
                }

                formattedValue = integerValue.pop() + formattedValue;
                groupSize--;
            }

            if (this.decimalDigits > 0) {
                formattedValue += this.decimalSeparator + absoluteValue.toFixed(this.decimalDigits).substr(-this.decimalDigits);
            }

            if (isNegative) {
                formattedValue = this.negativeSymbol + formattedValue;
            }
        }

        this.element.val(formattedValue);
    }

    // Event handlers should not be accessible from the object itself
    let eventHandlers = {
        change: function (e) {
            let value = e.data.getValue();
            let hasError = false;

            if (isNaN(value)) {
                hasError = true;
            }
            else if (e.data.maximumValue !== null && value > e.data.maximumValue) {
                value = e.data.maximumValue;
                hasError = true;
            }
            else if (e.data.minimumValue !== null && value < e.data.minimumValue) {
                value = e.data.minimumValue;
                hasError = true;
            }

            e.data.setValue(value);

            if (hasError) {
                e.data.error();
            }
        }
    };

}(jQuery));