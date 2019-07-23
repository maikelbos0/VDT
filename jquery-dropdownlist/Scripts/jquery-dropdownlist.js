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
        },
        // If true, this adds a text box that can be used to search in the dropdownlist
        // Defaults to false
        hasTextSearch: function (element) {
            return $(element).data('text-search') !== undefined && $(element).data('text-search') != false;
        },
        // If text search is enabled, this is the filter that is used to determine if an item is valid
        // Defaults to searching in all the text inside the item
        itemMatchesTextSearch: function (item, searchText) {
            return $(item).text().toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1;
        }
    }

    // Dropdownlist implementation
    function Dropdownlist(element, options) {
        let base = this;
        let isItemSelected = false;

        this.element = element;
        this.options = options;
        this.fieldName = this.options.getFieldName(this.element) || 'dropdownlist-' + Math.random().toString().replace('.', '');
        this.isMultiselect = this.options.isMultiselect(this.element);
        this.selectAllItem = this.isMultiselect ? this.options.getSelectAllItem(this.element) : $();
        this.allItems = this.options.getItems(this.element).add(this.selectAllItem);
        this.items = this.options.getItems(this.element).not(this.selectAllItem);
        this.textSearch = $();
        this.emptyText = this.options.getEmptyText();
        this.container = $('<div>', { class: 'dropdownlist' });

        // Add container early so can move the element after without issues
        this.element.before(this.container);

        // Select element
        this.selector = $('<div>', { class: 'dropdownlist-selector', tabindex: 0 });
        this.selectorText = $('<div>', { class: 'dropdownlist-selector-text' });
        this.selector.append(
            this.selectorText,
            $('<div>', { class: 'dropdownlist-selector-toggle' })
        );

        // List container
        this.list = $('<div>', { class: 'dropdownlist-list' }).append(this.element).hide();

        // Search text box
        if (this.options.hasTextSearch(this.element)) {
            this.textSearch = $('<input>', { type: 'text', class: 'dropdownlist-search' });

            if (this.isMultiselect) {
                // In multiselect mode it does not replace the selector text but rather searches in the list
                this.list.prepend(this.textSearch);
            }
            else {
                // In single-select mode it replaces the selector text and acts as an autocomplete
                this.selector.prepend(this.textSearch);
                this.textSearch.hide();
            }
        }

        // Add input fields
        this.items.each(function () {
            let fieldProperties = {
                name: base.fieldName,
                value: base.options.getItemValue($(this)),
                tabindex: -1
            };

            if (base.isMultiselect) {
                fieldProperties.type = 'checkbox';
                fieldProperties.class = 'dropdownlist-field';
            }
            else {
                fieldProperties.type = 'radio';
                fieldProperties.class = 'dropdownlist-field dropdownlist-field-hidden';
            }

            if (base.options.isItemSelected($(this)) && (base.isMultiselect || !isItemSelected)) {
                fieldProperties.checked = 'true';
                isItemSelected = true;
            }

            $(this).prepend($('<input>', fieldProperties));
        });

        // For single-select, select the first option if nothing is selected
        // Having nothing selected is not a user-recoverable state
        if (!this.isMultiselect && this.getSelectedItems().length === 0) {
            this.setSelectedItems(':first');
        }

        // For multiselect, create input and set the correct value of the select all item if it exists
        if (this.isMultiselect && this.selectAllItem.length > 0) {
            this.selectAllItem.prepend($('<input>', {
                type: 'checkbox',
                class: 'dropdownlist-field',
                checked: this.areAllItemsSelected(),
                tabindex: -1
            }));
        }

        // Final assembly
        this.container.append(this.selector);
        this.container.append(this.list);
        this.setSelectorText();

        // Event handlers
        this.container.focusout(this, eventHandlers.containerFocusout);
        this.container.keydown(this, eventHandlers.containerKeydown);
        this.selector.click(this, eventHandlers.selectorClick);
        this.list.click(this, eventHandlers.listClick);
        this.allItems.find('input.dropdownlist-field').change(this, eventHandlers.inputChange);
        this.textSearch.keydown(this, eventHandlers.textSearchKeydown);
        this.textSearch.keyup(this, eventHandlers.textSearchKeyup);
        $(document).click(this, eventHandlers.documentClick);
        this.allItems.mouseover(this, eventHandlers.allItemsMouseover);
        this.allItems.mouseout(this, eventHandlers.allItemsMouseout);
    }

    // Determine whether or not the list is currently showing
    Dropdownlist.prototype.isVisible = function () {
        return this.list.css('display') !== 'none';
    }

    // Toggle the list and the text search if needed
    Dropdownlist.prototype.toggle = function () {
        if (this.isVisible()) {
            this.hide();
        }
        else {
            this.show();
        }
    }

    // Hide the list
    Dropdownlist.prototype.hide = function () {
        if (!this.isVisible()) {
            return;
        }

        this.list.hide();
        this.allItems.removeClass('dropdownlist-list-item-active');

        if (this.textSearch.length > 0) {
            if (this.textSearch.filter(document.activeElement).length > 0) {
                this.selector.focus();
            }

            if (this.isMultiselect) {
                // Clear search text
                this.textSearch.val('');
            }
            else {
                // Switch selector text and input
                this.selectorText.show();
                this.textSearch.hide();

                // Set search text to current selected item text
                this.textSearch.val(this.selectorText.text());
            }

            // Clear previous searches
            this.items.show();
        }
    }

    // Show the list
    Dropdownlist.prototype.show = function () {
        this.list.show();

        if (this.textSearch.length > 0) {
            if (!this.isMultiselect) {
                // Switch selector text and input
                this.selectorText.hide();
                this.textSearch.show().select();
            }

            this.textSearch.focus();
        }

        // Highlight the selected item for keyboard support
        if (!this.isMultiselect) {
            this.items.has('input.dropdownlist-field:checked').addClass('dropdownlist-list-item-active');
        }
    }

    // Remove the entire dropdownlist; resets the base element to its former state
    Dropdownlist.prototype.remove = function () {
        this.container.before(this.element);
        this.container.remove();
        this.items.find('input.dropdownlist-field').remove();
        this.items.removeClass('dropdownlist-list-item-active');
        this.selectAllItem.find('input.dropdownlist-field').remove();
        this.selectAllItem.removeClass('dropdownlist-list-item-active');

        // Remove object from data
        this.element.removeData('dropdownlist');
    }

    // Set the text of the selector based on current list selection
    Dropdownlist.prototype.setSelectorText = function () {
        let items = this.getSelectedItems();
        let text = this.emptyText;

        if (items.length > 0) {
            text = $.map(items, this.options.getItemText).join(', ');
        }

        this.selectorText.text(text);

        if (!this.isMultiselect && this.textSearch.length > 0) {
            this.textSearch.val(text);
        }
    }

    // Get a jQuery-object with all currently selected items
    Dropdownlist.prototype.getSelectedItems = function () {
        return this.items.has('input.dropdownlist-field:checked');
    }

    // Get an array of values from all currently selected items
    Dropdownlist.prototype.getSelectedValues = function () {
        return $.map(this.getSelectedItems(), this.options.getItemValue);
    }

    // Set selected items based on a jQuery-selector or selection
    // Multiple selected items for a single-select dropdownlist selects the first item
    Dropdownlist.prototype.setSelectedItems = function (selector) {
        let selectedItems = this.items.filter(selector);

        // Make sure we select exactly one element for single-select
        if (!this.options.isMultiselect(this.element)) {
            selectedItems = selectedItems.first();

            if (selectedItems.length === 0) {
                selectedItems = this.items.first();
            }
        }

        // Select and deselect items as required
        this.items.not(selectedItems).find('input.dropdownlist-field:checked').prop('checked', false);
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
        return this.items.has('input.dropdownlist-field:not(:checked)').length === 0;
    }

    // Event handlers should not be accessible from the object itself
    let eventHandlers = {
        // Click handler for selector
        selectorClick: function (e) {
            if ($(e.target).is(e.data.textSearch)) {
                return;
            }

            e.data.toggle();
        },

        // Change handler for inputs
        inputChange: function (e) {
            if (e.data.isMultiselect && e.data.selectAllItem.length > 0) {
                // Handle clicking of the select all
                if ($(e.target).closest(e.data.selectAllItem).length > 0) {
                    if (e.data.selectAllItem.find('input.dropdownlist-field').prop('checked')) {
                        e.data.selectAllItems();
                    }
                    else {
                        e.data.clearSelectedItems();
                    }
                }
                // Set select all
                else {
                    e.data.selectAllItem.find('input.dropdownlist-field').prop('checked', e.data.areAllItemsSelected());
                }
            }

            e.data.setSelectorText();
            e.data.element.trigger('dropdownlist.selectedItemsChanged');
        },

        // Click handler for list
        listClick: function (e) {
            let item = $(e.target).closest(e.data.allItems);

            // Only bother selecting/unselecting when clicking an item
            if (item.length === 0) {
                return;
            }

            let input = item.find('input.dropdownlist-field');

            // Let the input field handle the actual click
            if (!input.is(e.target)) {
                input.click();
            }
            // Close the dropdownlist if it's single-select
            else if (!e.data.isMultiselect) {
                e.data.hide();
            }
        },

        // Change handler for search 
        textSearchKeyup: function (e) {
            // Don't filter when input is a known dropdownlist control key
            if (e.which === keyCodes.ENTER || e.which === keyCodes.ESCAPE || e.which === keyCodes.ARROW_UP || e.which === keyCodes.ARROW_DOWN) {
                return;
            }

            let searchText = e.data.textSearch.val();
            let visibleItems = e.data.items;

            if (searchText) {
                visibleItems = visibleItems.filter(function () {
                    return e.data.options.itemMatchesTextSearch(this, searchText);
                });
            }

            e.data.items.not(visibleItems).hide();
            visibleItems.show();
        },

        // Click handler for anywhere outside the dropdownlist
        documentClick: function (e) {
            if ($(e.target).closest(e.data.container).length > 0) {
                return;
            }

            e.data.hide();
        },

        // Mouse over handler for items including select all
        allItemsMouseover: function (e) {
            $(this).addClass('dropdownlist-list-item-active');
        },

        // Mouse out handler for items including select all
        allItemsMouseout: function (e) {
            e.data.allItems.removeClass('dropdownlist-list-item-active');
        },

        // Focus out handler for container
        containerFocusout: function (e) {
            if (e.relatedTarget == null || $(e.relatedTarget).closest(e.data.container).length > 0) {
                return;
            }

            e.data.hide();
        },

        // Keydown exception for when in the text search
        textSearchKeydown: function (e) {
            if (e.which === keyCodes.SPACE) {
                e.stopPropagation();
            }
        },

        // Keydown handler for container
        containerKeydown: function (e) {
            if (e.which === keyCodes.ENTER || e.which === keyCodes.SPACE) {
                // On enter we select if an item is active or, if we're on the selector, toggle the dropdownlist
                let item = e.data.allItems.filter('.dropdownlist-list-item-active');

                if (item.length > 0) {
                    item.click();
                }
                else if ($(e.target).closest(e.data.selector).length > 0) {
                    e.data.toggle();
                }

                e.preventDefault();
            }
            else if (e.which === keyCodes.ARROW_UP) {
                // On arrow up we only need to select the next active item up
                let allItems = e.data.allItems.filter(':visible');
                let index = allItems.index(e.data.allItems.filter('.dropdownlist-list-item-active'));

                if (--index >= 0) {
                    e.data.allItems.removeClass('dropdownlist-list-item-active');
                    $(allItems[index]).addClass('dropdownlist-list-item-active');
                }

                e.preventDefault();
            }
            else if (e.which === keyCodes.ARROW_DOWN) {
                // On arrow down we open the dropdown if it is closed and select the next active item down
                if (e.data.isVisible()) {
                    let allItems = e.data.allItems.filter(':visible');
                    let index = allItems.index(e.data.allItems.filter('.dropdownlist-list-item-active'));

                    if (++index < allItems.length) {
                        e.data.allItems.removeClass('dropdownlist-list-item-active');
                        $(allItems[index]).addClass('dropdownlist-list-item-active');
                    }
                }
                else {
                    e.data.show();

                    if (e.data.isMultiselect) {
                        e.data.allItems.first().addClass('dropdownlist-list-item-active');
                    }
                }

                e.preventDefault();
            }
            else if (e.which === keyCodes.ESCAPE) {
                e.data.hide();
                e.data.selector.focus();
            }
        }
    }

    // Key codes for keyboard navigation
    let keyCodes = {
        ENTER: 13,
        ESCAPE: 27,
        SPACE: 32,
        ARROW_UP: 38,
        ARROW_DOWN: 40
    };
}(jQuery));