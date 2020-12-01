﻿(function ($) {

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
        let base = this;

        this.element = element;
        this.options = options;
        this.valueProperty = options.getValueProperty(this.element);
        this.textProperty = options.getTextProperty(this.element);
        this.childrenProperty = options.getChildrenProperty(this.element);

        this.element.addClass('treeview');
        this.element.children().hide();

        this.list = this.createElement('<ul>', 'treeview-list');
        this.element.append(this.list);

        $.each(this.options.data, function (_, data) {
            base.createNode(base.list, data);
        });

        // Event handlers
        this.element.on('click', '.treeview-toggler', this, eventHandlers.togglerClick);
        this.element.on('change', '.treeview-selector', this, eventHandlers.inputChange);
    }

    // Create an element and merge attribute objects to attributes
    Treeview.prototype.createElement = function (tagName, className) {
        let attributes = $.extend.apply({}, Array.prototype.slice.call(arguments, 2));
        let element = $(tagName, attributes).addClass(className);

        return element;
    }

    // Create a list based on an array of node data
    Treeview.prototype.createList = function (node, dataArray) {
        let base = this;

        let list = $('<ul>', { class: 'treeview-list' });
        let toggler = $('<div>', { class: 'treeview-toggler' });

        toggler.data('toggle-target', list);
        node.prepend(toggler);
        node.append(list);

        $.each(dataArray, function (_, data) {
            base.createNode(list, data);
        });
    }

    // Create a node based on node data
    Treeview.prototype.createNode = function (list, data) {
        var nodeId = Math.random().toString().replace('.', '');
        var node = $('<li>');
        var checkbox = $('<input>', { class: 'treeview-selector', type: 'checkbox', value: data[this.valueProperty], id: nodeId });

        node.append(checkbox);
        node.append($('<label>', { for: nodeId, class: 'treeview-selector-label' }).text(data[this.textProperty]));
        node.data('node-data', data);
        list.append(node);

        if (data[this.childrenProperty]) {
            this.createList(node, data[this.childrenProperty]);
        }
    }

    // Event handlers should not be accessible from the object itself
    let eventHandlers = {
        togglerClick: function (e) {
            $(e.target).toggleClass('treeview-toggler-closed');
            $(e.target).data('toggle-target').toggle();
        },
        inputChange: function (e) {
            var checked = $(e.target).is(':checked');
            var node = $(e.target).closest('li');

            node.find('input.treeview-selector').prop('checked', checked);

            if (checked) {
                node.parents('li').children('input.treeview-selector').prop('checked', function () {
                    return $(this).closest('li').find('input.treeview-selector').not(this).not(':checked').length == 0;
                });
            }
            else {
                node.parents('li').children('input.treeview-selector').prop('checked', false);
            }
        }
    };

}(jQuery));