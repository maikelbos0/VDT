(function ($) {

    // Extension for creating datatreeview; supports multiple creations in one call
    $.fn.datatreeview = function (settings, callback) {
        // Allow callback to be the only argument
        if ($.isFunction(settings)) {
            callback = settings;
            settings = null;
        }

        return $(this).each(function () {
            // Get object from data
            let datatreeview = $(this).data('datatreeview');

            if (!datatreeview) {
                // Validate data
                if (!settings || !settings.data) {
                    throw 'datatreeview error: expected required option "data"';
                }
                else if (!$.isArray(settings.data)) {
                    throw 'datatreeview error: expected option "data" to be an array';
                }

                // Create object
                let options = $.extend({}, $.fn.datatreeview.defaults, settings);
                datatreeview = new Datatreeview($(this), options);

                // Add object to data
                $(this).data('datatreeview', datatreeview);
            }

            // Call the callback, bound to the datatreeview
            if ($.isFunction(callback)) {
                callback.bind(datatreeview)(datatreeview);
            }
        });
    }

    // Set defaults for extension
    $.fn.datatreeview.defaults = {
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
        // The property in a data node object to determine select status
        // Defaults to the data-property selected-property with as fallback 'selected'
        getSelectedProperty: function (element) {
            return $(element).data('selected-property') || 'selected';
        },
        // The property in a data node object to use to find a node's child nodes
        // Defaults to the data-property children-property with as fallback 'children'
        getChildrenProperty: function (element) {
            return $(element).data('children-property') || 'children';
        }
    }

    // Datatreeview implementation
    function Datatreeview(element, options) {
        let base = this;

        this.element = element;
        this.options = options;
        this.valueProperty = options.getValueProperty(this.element);
        this.textProperty = options.getTextProperty(this.element);
        this.selectedProperty = options.getSelectedProperty(this.element);
        this.childrenProperty = options.getChildrenProperty(this.element);

        this.element.children().hide();
        this.element.addClass('datatreeview');

        this.list = this.createElement('<ul>', 'datatreeview-list');
        this.element.append(this.list);

        $.each(this.options.data, function (_, data) {
            base.createNode(base.list, data);
        });

        // Event handlers
        this.list.on('click', '.datatreeview-toggler', this, eventHandlers.togglerClick);
        this.list.on('change', '.datatreeview-selector', this, eventHandlers.inputChange);
    }

    // Create an element and merge attribute objects to attributes
    Datatreeview.prototype.createElement = function (tagName, className) {
        let attributes = $.extend.apply({}, Array.prototype.slice.call(arguments, 2));
        let element = $(tagName, attributes).addClass(className);

        return element;
    }

    // Create a list based on an array of node data
    Datatreeview.prototype.createList = function (node, dataArray) {
        let base = this;

        let list = this.createElement('<ul>', 'datatreeview-list');
        let toggler = this.createElement('<div>', 'datatreeview-toggler');

        toggler.data('toggle-target', list);
        node.prepend(toggler);
        node.append(list);

        $.each(dataArray, function (_, data) {
            base.createNode(list, data);
        });
    }

    // Create a node based on node data
    Datatreeview.prototype.createNode = function (list, data) {
        var nodeId = Math.random().toString().replace('.', '');
        var node = this.createElement('<li>');
        var checkbox = this.createElement('<input>', 'datatreeview-selector', { type: 'checkbox', value: data[this.valueProperty], id: nodeId });

        node.append(checkbox);
        node.append(this.createElement('<label>', 'datatreeview-selector-label', { for: nodeId }).text(data[this.textProperty]));
        node.data('node-data', data);
        list.append(node);

        if (data[this.childrenProperty]) {
            this.createList(node, data[this.childrenProperty]);

            // If we have children and all are selected, select this node as well
            if (node.find('.datatreeview-list input:checked').length === node.find('.datatreeview-list input').length) {
                checkbox.prop('checked', true);
            }
        }
        else if (data[this.selectedProperty]) {
            checkbox.prop('checked', true);
        }
    }

    // Remove the entire datatreeview; resets the base element to its former state
    Datatreeview.prototype.remove = function () {
        this.list.remove();
        this.element.removeClass('datatreeview');
        this.element.removeData('datatreeview');
        this.element.children().show();
    }

    // Get the selected values as an array
    Datatreeview.prototype.getSelectedValues = function () {
        let base = this;

        return this.getSelectedData().map(function (value) {
            return value[base.valueProperty];
        });
    }

    // Get the selected data nodes as an array
    Datatreeview.prototype.getSelectedData = function () {
        return this.getSelectedNodes().map(function () {
            return $(this).data('node-data');
        }).get();
    }

    // Get the selected nodes
    Datatreeview.prototype.getSelectedNodes = function () {
        return this.element.find('input.datatreeview-selector:checked').closest('li');
    }

    // Set selected nodes by selector/selection/function/element
    Datatreeview.prototype.setSelectedNodes = function (nodes) {
        var actualNodes = $(nodes).not(':has(li)');

        this.list.find('li').not(actualNodes).children('input.datatreeview-selector').prop('checked', false);
        $(actualNodes).children('input.datatreeview-selector').prop('checked', true);
        this.list.find('li:has(li):not(:has(li:not(:has(li)) input.datatreeview-selector:not(:checked)))').children('input.datatreeview-selector').prop('checked', true);
    }

    // Set the selected nodes based on a value array
    Datatreeview.prototype.setSelectedValues = function (values) {
        let base = this;

        this.setSelectedData(function (nodeData) {
            return values.indexOf(nodeData[base.valueProperty]) > -1;
        });
    }

    // Set selected node by filter function
    // Filter function argument is node data
    Datatreeview.prototype.setSelectedData = function (filter) {
        var nodes = this.list.find('li').filter(function () {
            return filter($(this).data('node-data'));
        });

        this.setSelectedNodes(nodes);
    }

    // Event handlers should not be accessible from the object itself
    let eventHandlers = {
        togglerClick: function (e) {
            $(e.target).toggleClass('datatreeview-toggler-closed');
            $(e.target).data('toggle-target').toggle();
        },
        inputChange: function (e) {
            var checked = $(e.target).is(':checked');
            var node = $(e.target).closest('li');

            node.find('input.datatreeview-selector').prop('checked', checked);

            if (checked) {
                node.parents('li').children('input.datatreeview-selector').prop('checked', function () {
                    return $(this).closest('li').find('input.datatreeview-selector').not(this).not(':checked').length == 0;
                });
            }
            else {
                node.parents('li').children('input.datatreeview-selector').prop('checked', false);
            }
        }
    };

}(jQuery));