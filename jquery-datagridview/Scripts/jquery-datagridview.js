var test = 1;

(function ($) {

    // Extension for creating datagridviews; supports multiple creations in one call
    $.fn.datagridview = function (settings, callback) {
        // Allow callback to be the only argument
        if ($.isFunction(settings)) {
            callback = settings;
            settings = null;
        }

        return $(this).each(function () {
            let datagridview = $(this).data('datagridview');;

            if (!$(this).data('datagridview')) {
                // Create object
                let options = $.extend({}, $.fn.datagridview.defaults, settings);
                datagridview = new DataGridView($(this), options);

                // Add object to data
                $(this).data('datagridview', datagridview);
            }

            // Call the callback, bound to the datagridview
            if ($.isFunction(callback)) {
                callback.bind(datagridview)(datagridview);
            }
        });
    }

    // Set defaults for extension
    $.fn.datagridview.defaults = {}

    // Datagridview implementation
    function DataGridView(element, options) {
        this.element = element;
        this.options = options;
    }

    // Event handlers should not be accessible from the object itself
    let eventHandlers = {
    }

}(jQuery));