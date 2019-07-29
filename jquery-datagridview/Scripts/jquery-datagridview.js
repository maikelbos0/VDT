(function ($) {

    // Extension for creating datagridviews; supports multiple creations in one call
    $.fn.datagridview = function (settings, callback) {
        // Allow callback to be the only argument
        if ($.isFunction(settings)) {
            callback = settings;
            settings = null;
        }

        return $(this).each(function () {
            let datagridview = $(this).data('datagridview');

            if (!$(this).data('datagridview')) {
                // Validate columns
                if (!settings || !settings.columns) {
                    throw 'datagridview error: expected required option "columns"';
                }
                else if (!$.isArray(settings.columns)) {
                    throw 'datagridview error: expected option "columns" to be an array';
                }
                else if (!settings.columns.every(function (column) {
                    return !!column.data;
                })) {
                    throw 'datagridview error: expected each item in option "columns" to have property "data"';
                }

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
        let base = this;

        this.element = element;
        this.options = options;
        this.fillHeight = this.options.fillHeight(this.element);
        this.data = [];

        this.element.addClass('datagridview');
        this.element.children().hide();

        this.headerRow = this.createElement('<tr>');
        this.header = this.createElement('<thead>', 'datagridview-header').append(this.headerRow);
        this.body = this.createElement('<tbody>', 'datagridview-body');
        this.footer = this.createElement('<tfoot>', 'datagridview-footer');
        this.element.append(
            this.header,
            this.body,
            this.footer
        );

        this.style = $('<style>', { type: 'text/css' });
        $('body').append(this.style);

        // Create columns
        this.options.columns.forEach(function (column) {
            // Define class
            column._class = 'datagridview-' + Math.random().toString().replace('.', '');
            column.width = isNaN(column.width) || column.width < 0 ? 10 : parseInt(column.width);

            base.headerRow.append($('<th>').text(column.header || column.data).addClass(column._class).attr('title', column.header || column.data));
        });

        this.setColumnWidth();
    }

    // Set the width of the column classes
    DataGridView.prototype.setColumnWidth = function () {
        this.style.html(this.options.columns.reduce(function (style, column) {
            return style + '.' + column._class + '{ width: ' + column.width + '%}\n';
        }, ''));

        this.element.css('width', this.options.columns.reduce(function (w, c) { return w + c.width; }, 0) + '%');
    }

    // Fill the grid with the data
    // TODO: research performance; preliminary results are 50 cells per ms in Chrome, 5 in IE10
    DataGridView.prototype.populate = function (data) {        
        let newBody = this.createElement('<tbody>', 'datagridview-body');

        for (let r = 0; r < data.length; r++) {
            let dataRow = data[r];
            let row = $('<tr>');

            for (let c = 0; c < this.options.columns.length; c++) {
                let column = this.options.columns[c];

                row.append($('<td>').text(dataRow[column.data] || "").addClass(column._class).attr('title', dataRow[column.data] || ""));
            }

            newBody.append(row);
        };

        this.body.replaceWith(newBody);
        this.body = newBody;
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
        this.element.children().show();
        this.header.remove();
        this.body.remove();
        this.footer.remove();
        this.style.remove();
    }

    // Event handlers should not be accessible from the object itself
    let eventHandlers = {
    }

}(jQuery));