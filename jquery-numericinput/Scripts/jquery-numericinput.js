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
                negativeSymbol = '.';
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
            let groupSizes = ($(element).data('group-sizes') || '').split(',').map(function (size) {
                return parseInt(size);
            }).filter(function (size) {
                return !isNaN(size);
            });

            if (groupSizes.length == 0) {
                groupSizes = [3];
            }

            return groupSizes;
        },
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

        this.element.addClass('numericinput');

        // Event handlers
        this.element.on('change', this, eventHandlers.change);
    }

    // Remove the numeric input properties; resets the input element to its former state
    Numericinput.prototype.remove = function () {
        this.element.removeClass('numericinput');
    }

    // Event handlers should not be accessible from the object itself
    let eventHandlers = {
        change: function (e) {
            let value = parseFloat(e.data.element.val());
            let hasError = false;

            if (isNaN(value)) {
                hasError = true;
                e.data.element.val("");
            }
            else {
                e.data.element.val(value);
            }

            if (hasError) {
                e.data.element.addClass("numericinput-error");

                window.setTimeout(function () {
                    e.data.element.removeClass("numericinput-error");
                }, 200);
            }
        }
    };

}(jQuery));