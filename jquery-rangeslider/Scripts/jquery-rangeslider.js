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

    }

    // Rangeslider implementation
    function Rangeslider(element, options) {
        //let base = this;
        this.element = element;
        this.options = options;

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