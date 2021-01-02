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
        },
        // The field name to use for the generated checkboxes
        // Defaults to the data-property field-name
        getFieldName: function (element) {
            return $(element).data('field-name');
        },
        // Allow a freehand selection of nodes where selecting nodes does not affect child or parent nodes
        hasFreehandSelection: function (element) {
            return $(element).data('freehand-select') !== undefined && $(element).data('freehand-select') != false;
        },
        // Initialize the treeview disabled or not
        // Defaults to the data-property disabled
        isDisabled: function (element) {
            return $(element).data('disabled') !== undefined && $(element).data('disabled') != false;
        },
        // Get the options used for the node toggle event
        // Looks to the data-properties toggle-duration and toggle-easing with no animation as default
        getToggleOptions: function (element) {
            var duration = parseInt($(element).data('toggle-duration'));
            var easing = $(element).data('toggle-easing');

            if (isNaN(duration) || duration < 0) {
                duration = 0;
            }

            return {
                duration: duration,
                easing: easing
            }
        },
        // Initialize the treeview collapsed or not
        // Defaults to the data-property collapsed
        isCollapsed: function (element) {
            return $(element).data('collapsed') !== undefined && $(element).data('collapsed') != false;
        },
        // Lists are containers for nodes
        // They always gets at least the class 'datatreeview-list'
        getListAttributes: function () {
            return {};
        },
        // Nodes are the visual representation of node data
        // They always gets at least the class 'datatreeview-node'
        getNodeAttributes: function () {
            return {};
        },
        // Inputs are the checkboxes used to select nodes
        // They always gets at least the class 'datatreeview-field'
        getInputAttributes: function () {
            return {};
        },
        // Labels are the text displays for nodes
        // They always gets at least the class 'datatreeview-text'
        getLabelAttributes: function () {
            return {};
        },
        // Togglers are the elements used to collapse/expand node lists
        // They always gets at least the class 'datatreeview-toggler'
        getTogglerAttributes: function () {
            return {};
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
        this.fieldName = options.getFieldName(this.element);
        this.hasFreehandSelection = options.hasFreehandSelection(this.element);
        this.isDisabled = false;
        this.toggleOptions = options.getToggleOptions(this.element);

        this.element.children().hide();
        this.element.addClass('datatreeview');

        this.list = this.createElement('<ul>', 'datatreeview-list', this.options.getListAttributes());
        this.element.append(this.list);

        // Start collapsed if needed
        let isCollapsed = options.isCollapsed(this.element);

        $.each(this.options.data, function (_, data) {
            base.createNode(base.list, data, isCollapsed);
        });

        // Disable if needed
        if (this.options.isDisabled(this.element)) {
            this.disable();
        }

        // Event handlers
        this.list.on('click', '.datatreeview-toggler', this, eventHandlers.togglerClick);
        this.list.on('change', '.datatreeview-field', this, eventHandlers.inputChange);
    }

    // Create an element and merge attribute objects to attributes
    Datatreeview.prototype.createElement = function (tagName, className) {
        let attributes = $.extend.apply({}, Array.prototype.slice.call(arguments, 2));
        let element = $(tagName, attributes).addClass(className);

        return element;
    }

    // Create a list based on an array of node data
    Datatreeview.prototype.createList = function (node, dataArray, isCollapsed) {
        let base = this;

        let list = this.createElement('<ul>', 'datatreeview-list', this.options.getListAttributes());
        let toggler = this.createElement('<div>', 'datatreeview-toggler', this.options.getTogglerAttributes());

        if (isCollapsed) {
            toggler.addClass('datatreeview-toggler-closed');
            list.hide();
        }

        node.find('.datatreeview-node-content').prepend(toggler);
        node.append(list);

        $.each(dataArray, function (_, data) {
            base.createNode(list, data, isCollapsed);
        });
    }

    // Create a node based on node data
    Datatreeview.prototype.createNode = function (list, data, isCollapsed) {
        let node = this.createElement('<li>', 'datatreeview-node', this.options.getNodeAttributes());
        let content = this.createElement('<div>', 'datatreeview-node-content');
        let checkbox = this.createElement('<input>', 'datatreeview-field', {
            type: 'checkbox',
            name: this.fieldName,
            value: data[this.valueProperty]
        }, this.options.getInputAttributes());
        let label = this.createElement('<label>', 'datatreeview-text', this.options.getLabelAttributes())
            .text(data[this.textProperty])
            .prepend(checkbox);
        let hasChildren = data[this.childrenProperty] && data[this.childrenProperty].length > 0;
        let useSelectedProperty = this.hasFreehandSelection || !hasChildren;

        content.append(label);
        node.append(content);
        node.data('node-data', data);
        list.append(node);

        if (hasChildren) {
            this.createList(node, data[this.childrenProperty], isCollapsed);
        }

        if (useSelectedProperty && data[this.selectedProperty]) {
            checkbox.prop('checked', true);
        }

        if (!useSelectedProperty && node.find('.datatreeview-list input.datatreeview-field:checked').length === node.find('.datatreeview-list input.datatreeview-field').length) {
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

    // Get the selected nodes
    Datatreeview.prototype.getSelectedNodes = function () {
        return this.element.find('input.datatreeview-field:checked').closest('li.datatreeview-node');
    }

    // Get the selected data nodes as an array
    Datatreeview.prototype.getSelectedData = function () {
        return this.getSelectedNodes().map(function () {
            return $(this).data('node-data');
        }).get();
    }

    // Get the selected values as an array
    Datatreeview.prototype.getSelectedValues = function () {
        let base = this;

        return this.getSelectedData().map(function (value) {
            return value[base.valueProperty];
        });
    }

    // Set selected nodes by selector/selection/function/element
    Datatreeview.prototype.setSelectedNodes = function (nodes) {
        let actualNodes = $(nodes);

        if (!this.hasFreehandSelection) {
            actualNodes = actualNodes.not(':has(li)')
        }

        this.list.find('li.datatreeview-node').not(actualNodes).find('> label.datatreeview-text > input.datatreeview-field').prop('checked', false);
        $(actualNodes).find('> label.datatreeview-text > input.datatreeview-field').prop('checked', true);

        if (!this.hasFreehandSelection) {
            this.list.find('li.datatreeview-node:has(li.datatreeview-node):not(:has(li.datatreeview-node:not(:has(li.datatreeview-node)) input.datatreeview-field:not(:checked)))').find('> label.datatreeview-text > input.datatreeview-field').prop('checked', true);
        }

        this.triggerSelectionChanged();
    }

    // Trigger the selection changed event after automated or manual changes
    Datatreeview.prototype.triggerSelectionChanged = function () {
        this.element.trigger('datatreeview.selectionChanged', [this.getSelectedData(), this.getSelectedValues()]);
    }

    // Set selected node by filter function
    // Filter function argument is node data
    Datatreeview.prototype.setSelectedData = function (filter) {
        let nodes = this.list.find('li.datatreeview-node').filter(function () {
            return filter($(this).data('node-data'));
        });

        this.setSelectedNodes(nodes);
    }

    // Set the selected nodes based on a value array
    Datatreeview.prototype.setSelectedValues = function (values) {
        let base = this;

        this.setSelectedData(function (nodeData) {
            return values.indexOf(nodeData[base.valueProperty]) > -1;
        });
    }

    // Enable the treeview if it is disabled
    Datatreeview.prototype.enable = function () {
        if (!this.isDisabled) {
            return;
        }

        this.isDisabled = false;
        this.element.find('input.datatreeview-field').prop('disabled', this.isDisabled);
        this.element.removeClass('datatreeview-disabled');
    }

    // Disable the treeview if it is enabled
    Datatreeview.prototype.disable = function () {
        if (this.isDisabled) {
            return;
        }

        this.isDisabled = true;
        this.element.find('input.datatreeview-field').prop('disabled', this.isDisabled);
        this.element.addClass('datatreeview-disabled');
    }

    // Collapse one or more nodes by selector/selection/function/element
    Datatreeview.prototype.collapseNodes = function (nodes) {
        nodes = $(nodes).filter(':has(> .datatreeview-toggler:not(.datatreeview-toggler-closed))');

        if (nodes.length > 0) {
            nodes.children('.datatreeview-toggler').addClass('datatreeview-toggler-closed');
            nodes.children('ul').slideToggle(this.toggleOptions);

            this.element.trigger('datatreeview.nodesCollapsed', [nodes]);
        }
    }

    // Expand one or more nodes by selector/selection/function/element
    Datatreeview.prototype.expandNodes = function (nodes) {
        nodes = $(nodes).filter(':has(> .datatreeview-toggler-closed)');

        if (nodes.length > 0) {
            $(nodes).children('.datatreeview-toggler').removeClass('datatreeview-toggler-closed');
            nodes.children('ul').slideToggle(this.toggleOptions);

            this.element.trigger('datatreeview.nodesExpanded', [nodes]);
        }
    }

    // Event handlers should not be accessible from the object itself
    let eventHandlers = {
        togglerClick: function (e) {
            let toggler = $(e.target);
            let node = $(e.target).parent('li');

            if (toggler.hasClass('datatreeview-toggler-closed')) {
                e.data.expandNodes(node);
            }
            else {
                e.data.collapseNodes(node);
            }
        },
        inputChange: function (e) {
            if (!e.data.hasFreehandSelection) {
                let checked = $(e.target).is(':checked');
                let node = $(e.target).closest('li.datatreeview-node');

                node.find('input.datatreeview-field').prop('checked', checked);

                if (checked) {
                    node.parents('li.datatreeview-node').find('> label.datatreeview-text > input.datatreeview-field').prop('checked', function () {
                        return $(this).closest('li.datatreeview-node').find('input.datatreeview-field').not(this).not(':checked').length == 0;
                    });
                }
                else {
                    node.parents('li.datatreeview-node').find('> label.datatreeview-text > input.datatreeview-field').prop('checked', false);
                }
            }

            e.data.triggerSelectionChanged();
        }
    };

}(jQuery));