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
        initialization: {
            getItems: function (element) {
                return $(element).children();
            },
            isItemSelected: function (item) {
                return $(item).data('selected') !== undefined && $(item).data('selected') !== 'false';
            },
            fieldName: null,
            getFieldName: function (element) {
                return $(element).data('field-name');

            }
        },
        getItemValue: function (item) {
            return $(item).data('value') || $(item).text()
        },
        getEmptyText: function () {
            return '(Select...)'
        },
        multiselect: false
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

        // Add container early so can move the element after without issues
        this.container = $('<div>', { class: 'dropdownlist' });
        this.element.before(this.container);

        // Select element
        this.selector = $('<div>', { class: 'dropdownlist-selector' }).append(
            $('<div>', { class: 'dropdownlist-selector-text' }).text(this.options.getEmptyText()),
            $('<div>', { class: 'dropdownlist-selector-toggle' })
        );

        // List container
        this.list = $('<div>', { class: 'dropdownlist-list' }).append(this.element).hide();

        // Add input fields
        let fieldName = this.options.initialization.fieldName || this.options.initialization.getFieldName(this.element) || "dropdownlist-" + dropdownlists.items.length;
        console.log(fieldName);

        // Final assembly
        this.container.append(this.selector);
        this.container.append(this.list);

        // Event handlers
        this.selector.click(function (e) {
            base.toggle();
        });

        this.options.initialization.getItems(this.element).click(function (e) {
            console.log('Chose an item: ' + base.options.getItemValue(e.target));
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

    /*
     * TODO
     * - Checkboxes
     * - Event handlers
     * - ?
     */
}(jQuery));