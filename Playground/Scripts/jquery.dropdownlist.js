(function ($) {
    // Keep track of existing dropdownlists
    let dropdownlists = {
        items: [],
        get: function (element) {
            return this.items.find(function (item) {
                return item.element.is($(element));
            });
        },
        contains: function (element) {
            return !!this.get(element);
        },
        add: function (dropdownlist) {
            this.items.push(dropdownlist);
        },
        remove: function (dropdownlist) {
            this.items = this.items.filter(function (item) {
                return item !== dropdownlist;
            });
        }
    };

    // Extension for creating dropdownlists; supports multiple creations in one call
    $.fn.dropdownlist = function (settings) {
        return $(this).each(function () {
            if (!dropdownlists.contains(this)) {
                let options = $.extend(true, {}, $.fn.dropdownlist.defaults, settings);
                let dropdownlist = new Dropdownlist($(this), options);

                dropdownlists.add(dropdownlist);
            }
        });
    }

    // Set defaults for extension
    $.fn.dropdownlist.defaults = {
        // Items are all the possible dropdown items to select
        // Defaults to all direct children of the element
        getItems: function (element) {
            return $(element).children();
        },
        // Determine if an item should be selected during initialization
        // Multiple selected items for a single-select dropdownlist can have unexpected side effects
        isItemSelected: function (item) {
            return $(item).data('selected') !== undefined && $(item).data('selected') != false;
        },
        // The field name to use for the generated input fields
        // Defaults to the data-property field-name
        getFieldName: function (element) {
            return $(element).data('field-name');
        },
        // The field value to use for the generated input fields based on the item
        // Defaults to the data-property value of the item
        getItemValue: function (item) {
            return $(item).data('value') || $(item).text();
        },
        // The text to get for an item based on the item
        // Defaults to the text-content of the item
        getItemText: function (item) {
            return $(item).text();
        },
        // The text to display when no items are selected
        // Override this implementation to set the text or provide multi-language support
        getEmptyText: function () {
            return '(Select...)';
        },
        // Multiselect dropdowns use checkboxes, single select uses an invisible radio button
        // Defaults to false except when the data-property multiselect is provided
        isMultiselect: function (element) {
            return $(element).data('multiselect') !== undefined && $(element).data('multiselect') != false;
        }
    }

    // Extension for getting a dropdownlist object for access; only supports retrieving 1
    $.fn.getDropdownlist = function () {
        return dropdownlists.get(this);
    }

    // Dropdownlist implementation
    function Dropdownlist(element, options) {
        let base = this;

        this.element = element;
        this.options = options;
        this.fieldName = this.options.getFieldName(this.element) || "dropdownlist-" + Math.random().toString().replace('.', '');

        // Add container early so can move the element after without issues
        this.container = $('<div>', { class: 'dropdownlist' });
        this.element.before(this.container);

        // Select element
        this.selector = $('<div>', { class: 'dropdownlist-selector' }).append(
            $('<div>', { class: 'dropdownlist-selector-text' }),
            $('<div>', { class: 'dropdownlist-selector-toggle' })
        );

        // List container
        this.list = $('<div>', { class: 'dropdownlist-list' }).append(this.element).hide();

        // Add input fields
        this.options.getItems(this.element).each(function () {
            let fieldProperties = {
                name: base.fieldName,
                value: base.options.getItemValue($(this))
            };

            if (base.options.isMultiselect(base.element)) {
                fieldProperties.type = 'checkbox';
                fieldProperties.class = 'dropdownlist-field';
            }
            else {
                fieldProperties.type = 'radio';
                fieldProperties.class = 'dropdownlist-field dropdownlist-field-hidden';
            }

            if (base.options.isItemSelected($(this))) {
                fieldProperties.checked = 'true';
            }

            $(this).prepend($('<input>', fieldProperties));
        });

        // Final assembly
        this.container.append(this.selector);
        this.container.append(this.list);
        this.setSelectorText();

        // Event handlers
        this.selector.click(function (e) {
            base.toggle();
        });

        this.list.click(function (e) {
            let item = $(e.target).closest('.dropdownlist-list > * > *');

            // Only bother selecting/unselecting when clicking an item
            if (item.length === 0) {
                return;
            }

            let input = item.find('input.dropdownlist-field');

            // Let the input field handle the actual click
            if (!input.is(e.target)) {
                input.click();
            }
            else {
                // Actual click handling
                base.setSelectorText();

                if (!base.options.isMultiselect(base.element)) {
                    base.hide();
                }
            }
        });

        $(document).click(function (e) {
            if ($(e.target).closest(".dropdownlist") && $(e.target).closest(".dropdownlist").is(base.container)) {
                return;
            }

            base.hide();
        })
    }

    Dropdownlist.prototype.remove = function () {
        this.container.before(this.element);
        this.container.remove();
        this.options.getItems(this.element).find("input.dropdownlist-field").remove();

        dropdownlists.remove(this);
    }

    Dropdownlist.prototype.toggle = function () {
        this.list.toggle();
    }

    Dropdownlist.prototype.hide = function () {
        this.list.hide();
    }

    Dropdownlist.prototype.show = function () {
        this.list.hide();
    }

    Dropdownlist.prototype.setSelectorText = function () {
        let items = this.getSelectedItems();
        let text = this.options.getEmptyText();

        if (items.length > 0) {
            text = $.map(items, this.options.getItemText).join(', ');
        }

        this.container.find('.dropdownlist-selector-text').text(text);
    }

    Dropdownlist.prototype.getSelectedItems = function () {
        return this.options.getItems(this.element).has('input:checked');
    }

    Dropdownlist.prototype.getSelectedValues = function () {
        return $.map(this.getSelectedItems(), this.options.getItemValue);
    }

    /*
     * TODO
     * - Extract event implementation
     * - Event for selection changed
     * - Set of selected items
     * - Tests?
     * - Figure out NuGet package?
     * - Create examples/documentation?
     * - Project for server-side MVC implementation?
     */
}(jQuery));