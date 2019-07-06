(function ($) {
    // Keep track of existing dropdownlists
    let dropdownlists = [];

    // Create extension
    $.fn.dropdownlist = function (settings) {
        return $(this).each(function () {
            let existingLists = dropdownlists.filter(function (list) {
                return list.element.is($(this));
            });

            if (existingLists.length > 0) {
                debugger;
                let dropdownlist = existingLists[0];

                if (typeof settings === 'string' && settings in dropdownlist) {
                    // We can't return a value here but we want to.
                }
            }
            else {
                let options = $.extend({}, $.fn.dropdownlist.defaults, settings);
                let dropdownlist = new Dropdownlist($(this), options);

                dropdownlist.initialize();
                dropdownlists.push(dropdownlist);
            }
        });
    };

    // Set defaults for extension
    $.fn.dropdownlist.defaults = {
        initialization: {
            getItems: function (element) {
                return $(element).children();
            },
            isItemSelected: function (item) {
                return $(item).data('selected') !== undefined && $(item).data('selected') !== 'false';
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

    // Dropdownlist implementation
    function Dropdownlist(element, options) {
        this.element = element;
        this.options = options;
        this.list = null;
        this.container = null;
        this.selector = null;
    }

    Dropdownlist.prototype.destroy = function () {
        this.container.before(this.element);
        this.container.destroy();
    }

    Dropdownlist.prototype.test = function () {
        return 'test';
    }

    Dropdownlist.prototype.initialize = function () {
        // Alias for event handlers
        let base = this;

        // Add container early so can move the element after without issues
        this.container = $('<div>', { class: 'dropdownlist' });
        this.element.before(this.container);

        // Select element
        this.selector = $('<div>', { class: 'dropdownlist-selector' }).append(
            $('<div>', { class: 'dropdownlist-selector-text' }).text(this.options.getEmptyText()),
            $('<div>', { class: 'dropdownlist-selector-toggle' })
        );
        this.selector.click(function () {
            base.toggle();
        });

        // List container
        this.list = $('<div>', { class: 'dropdownlist-list' }).append(this.element).hide();

        // Final assembly
        this.container.append(this.selector);
        this.container.append(this.list);
    }

    Dropdownlist.prototype.toggle = function () {
        this.list.toggle();
    }

    /*
     * TODO
     * - Checkboxes
     * - Event handlers
     * - ?
     */
}(jQuery));