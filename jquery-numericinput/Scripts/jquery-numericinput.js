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
    }

    // Numericinput implementation
    function Numericinput(element, options) {
        this.element = element;
        this.options = options;
    }

    // Remove the numeric input properties; resets the input element to its former state
    Numericinput.prototype.remove = function () {
    }

    // Event handlers should not be accessible from the object itself
    let eventHandlers = {
    };

}(jQuery));