(function ($) {

    // Extension for creating treeview; supports multiple creations in one call
    $.fn.treeview = function (settings, callback) {
        // Allow callback to be the only argument
        if ($.isFunction(settings)) {
            callback = settings;
            settings = null;
        }

        return $(this).each(function () {
            // Get object from data
            let treeview = $(this).data('treeview');

            if (!treeview) {
                // Create object
                let options = $.extend({}, $.fn.treeview.defaults, settings);
                treeview = new Treeview($(this), options);

                // Add object to data
                $(this).data('treeview', treeview);
            }

            // Call the callback, bound to the treeview
            if ($.isFunction(callback)) {
                callback.bind(treeview)(treeview);
            }
        });
    }

    // Set defaults for extension
    $.fn.treeview.defaults = {
        // The property in a data node object to use as node value
        // Defaults to the data-property value-property with as fallback 'value'
        getValueProperty: function (element) {
            return $(element).data('value-property') || 'value';
        },
        // The property in a data node object to use as node text
        // Defaults to the data-property text-property with as fallback 'text'
        getTextProperty: function (element) {
            return $(element).data('text-property') || 'text';
        },
        // The property in a data node object to use to find a node's child nodes
        // Defaults to the data-property children-property with as fallback 'children'
        getChildrenProperty: function (element) {
            return $(element).data('children-property') || 'children';
        }
    }

    // Treeview implementation
    function Treeview(element, options) {
        this.element = element;
        this.options = options;
        this.valueProperty = options.getValueProperty(this.element);
        this.textProperty = options.getTextProperty(this.element);
        this.childrenProperty = options.getChildrenProperty(this.element);
    }

    // Create an element and merge attribute objects to attributes
    Treeview.prototype.createElement = function (tagName, className) {
        let attributes = $.extend.apply({}, Array.prototype.slice.call(arguments, 2));
        let element = $(tagName, attributes).addClass(className);

        return element;
    }

    // Create a list based on an array of node data
    Treeview.prototype.createList = function () {

    }

    // Create a node based on node data
    Treeview.prototype.createNode = function () {

    }

    // Event handlers should not be accessible from the object itself
    let eventHandlers = {
    };

}(jQuery));