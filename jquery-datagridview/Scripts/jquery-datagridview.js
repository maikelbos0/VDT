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
    $.fn.datagridview.defaults = {
        // If true, the datagridview will adjust its height to however much room is available in the parent
        // If false, the datagridview will adjust its height to the rows it contains
        fillHeight: function (element) {
            return $(element).data('fill-height') !== undefined && $(element).data('fill-height') != false;
        }
    }

    // Datagridview implementation
    function DataGridView(element, options) {
        this.element = element;
        this.options = options;
        this.fillHeight = this.options.fillHeight(this.element);

        this.element.addClass('datagridview');
        this.header = this.element.find('thead');
        this.body = this.element.find('tbody');
        this.footer = this.element.find('tfoot');

        // If no header is found, create it
        if (this.header.length === 0) {
            this.header = this.createElement('<thead>', 'datagridview-header');
            this.element.append(this.header);
        }

        // If no body is found, create it and move all rows
        if (this.body.length === 0) {
            this.body = this.createElement('<tbody>', 'datagridview-body');
            this.element.append(this.body);
            this.body.append(this.element.find('tr'));
        }

        // If the header contains no row, assume the first row from the body
        if (this.header.find('tr').length === 0) {
            this.header.append(this.body.find('tr').first());
        }

        // If no header is found, create it
        if (this.footer.length === 0) {
            this.footer = this.createElement('<tfoot>', 'datagridview-footer');
            this.element.append(this.footer);
        }
    }

    // Create an element and merge attribute objects to attributes
    DataGridView.prototype.createElement = function (tagName, className) {
        let attributes = $.extend.apply({}, Array.prototype.slice.call(arguments, 2));
        let element = $(tagName, attributes).addClass(className);

        return element;
    }

    // Remove the entire datagridview; resets the base element to its former state
    DataGridView.prototype.remove = function () {
        this.element.removeClass('datagridview');

        // If we had no header before, remove it
        this.element.prepend(this.header.filter('.datagridview-header').find('tr'));
        this.header.filter('.datagridview-header').remove();

        // If we had no body before, remove it
        this.element.append(this.body.filter('.datagridview-body').find('tr'));
        this.body.filter('.datagridview-body').remove();

        // If we had no footer before, remove it
        this.element.find('tfoot.datagridview-footer').remove();
    }

    // Event handlers should not be accessible from the object itself
    let eventHandlers = {
    }

}(jQuery));