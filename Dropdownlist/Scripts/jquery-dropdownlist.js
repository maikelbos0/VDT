(function ($) {
    // Extension for creating dropdownlists; supports multiple creations in one call
    $.fn.dropdownlist = function (settings, callback) {
        // Allow callback to be the only argument
        if ($.isFunction(settings)) {
            callback = settings;
            settings = null;
        }

        return $(this).each(function () {
            let dropdownlist;

            if ($(this).closest('.dropdownlist').length === 0) {
                let options = $.extend({}, $.fn.dropdownlist.defaults, settings);
                dropdownlist = new Dropdownlist($(this), options);

                // Add object to data
                $(this).data('dropdownlist', dropdownlist);
            }
            else {
                // Get object from data
                dropdownlist = $(this).data('dropdownlist');
            }

            // Call the callback, bound to the dropdownlist
            if ($.isFunction(callback)) {
                callback.bind(dropdownlist)(dropdownlist);
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
        // Item that triggers a select all in case of multiselect
        // Defaults to the first direct child with data-property select-all enabled
        getSelectAllItem: function (element) {
            return $(element).children().filter('[data-select-all]').first();
        },
        // Determine if an item should be selected during initialization
        // Multiple selected items for a single-select dropdownlist selects the first item
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

    // Dropdownlist implementation
    function Dropdownlist(element, options) {
        let base = this;
        let isItemSelected = false;

        this.element = element;
        this.options = options;
        this.fieldName = this.options.getFieldName(this.element) || 'dropdownlist-' + Math.random().toString().replace('.', '');

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

            if (base.options.isItemSelected($(this)) && (base.options.isMultiselect(base.element) || !isItemSelected)) {
                fieldProperties.checked = 'true';
                isItemSelected = true;
            }

            $(this).prepend($('<input>', fieldProperties));
        });

        // For single-select, select the first option if nothing is selected
        // Having nothing selected is not a user-recoverable state
        if (!this.options.isMultiselect(this.element) && this.getSelectedItems().length === 0) {
            this.setSelectedItems(':first');
        }

        // Final assembly
        this.container.append(this.selector);
        this.container.append(this.list);
        this.setSelectorText();

        // Event handlers
        this.selector.click(this, this.selectorClick);
        this.list.click(this, this.listClick);
        $(document).click(this, this.documentClick);
    }

    // Click handler for selector
    Dropdownlist.prototype.selectorClick = function (e) {
        e.data.list.toggle();
    }

    // Click handler for list
    Dropdownlist.prototype.listClick = function (e) {
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
            let selectAllItem = e.data.options.getSelectAllItem(e.data.element);
            let isMultiselect = e.data.options.isMultiselect(e.data.element);

            if (isMultiselect && selectAllItem.length > 0) {
                // Handle clicking of the select all
                if ($(e.target).closest(selectAllItem).length > 0) {
                    if (selectAllItem.find('input.dropdownlist-field').prop('checked')) {
                        e.data.selectAllItems();
                    }
                    else {
                        e.data.clearSelectedItems();
                    }
                }
                // Set select all
                else {
                    selectAllItem.find('input.dropdownlist-field').prop('checked', e.data.areAllItemsSelected());
                }
            }

            e.data.setSelectorText();

            if (!isMultiselect) {
                e.data.list.hide();
            }

            e.data.element.trigger('dropdownlist.selectedItemsChanged');
        }
    }

    // Click handler for anywhere outside the dropdownlist
    Dropdownlist.prototype.documentClick = function (e) {
        if ($(e.target).closest('.dropdownlist').is(e.data.container)) {
            return;
        }

        e.data.list.hide();
    }

    // Remove the entire dropdownlist; resets the base element to its former state
    Dropdownlist.prototype.remove = function () {
        this.container.before(this.element);
        this.container.remove();
        this.options.getItems(this.element).find('input.dropdownlist-field').remove();

        // Remove object from data
        this.element.removeData('dropdownlist');
    }

    // Set the text of the selector based on current list selection
    Dropdownlist.prototype.setSelectorText = function () {
        let items = this.getSelectedItems();
        let text = this.options.getEmptyText();

        if (items.length > 0) {
            text = $.map(items, this.options.getItemText).join(', ');
        }

        this.container.find('.dropdownlist-selector-text').text(text);
    }

    // Get a jQuery-object with all currently selected items
    Dropdownlist.prototype.getSelectedItems = function () {
        return this.options.getItems(this.element).has('input.dropdownlist-field:checked').not(this.options.getSelectAllItem(this.element));
    }

    // Get an array of values from all currently selected items
    Dropdownlist.prototype.getSelectedValues = function () {
        return $.map(this.getSelectedItems(), this.options.getItemValue);
    }

    // Set selected items based on a jQuery-selector or selection
    // Multiple selected items for a single-select dropdownlist selects the first item
    Dropdownlist.prototype.setSelectedItems = function (selector) {
        let items = this.options.getItems(this.element);
        let selectedItems = items.filter(selector);

        if (!this.options.isMultiselect(this.element)) {
            selectedItems = selectedItems.first();

            if (selectedItems.length === 0) {
                selectedItems = items.first();
            }
        }

        items.not(selectedItems).find('input.dropdownlist-field:checked').prop('checked', false);
        selectedItems.find('input.dropdownlist-field:not(:checked)').prop('checked', true);

        this.setSelectorText();
    }

    // Select all items
    Dropdownlist.prototype.selectAllItems = function () {
        this.setSelectedItems('*');
    }

    // Deselect all items
    Dropdownlist.prototype.clearSelectedItems = function () {
        this.setSelectedItems(false);
    }

    // Check if all items are currently selected
    Dropdownlist.prototype.areAllItemsSelected = function () {
        return this.options.getItems(this.element).has('input.dropdownlist-field:not(:checked)').not(this.options.getSelectAllItem(this.element)).length === 0;
    }

    /*
     * TODO
     * - Add options for attributes of container, list and selector
     * - Add filter textbox
     * - Add keyboard support?
     * - No more recursive / deep merging of settings?
     * - Tests
     * - Figure out NuGet package?
     * - Create examples/documentation?
     * - Project for server-side MVC implementation?
     */
}(jQuery));