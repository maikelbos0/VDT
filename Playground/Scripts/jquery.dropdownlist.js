(function ($) {
    $.fn.dropdownlist = function (settings) {
        let options = $.extend({}, $.fn.dropdownlist.defaults, settings);

        return $(this).each(function () {
            let element = $(this);
            let list = $('<div>', { class: "dropdownlist" });
            let listSelector = $('<div>', { class: "dropdownlist-selector" }).append(
                $('<div>', { class: "dropdownlist-selector-text" }).text(options.getEmptyText()),
                $('<div>', { class: "dropdownlist-selector-toggle" })
            );

            $(element).before(list);
            list.append(listSelector);

            let listList = $('<div>', { class: "dropdownlist-list" }).append(element);
            listList.hide();
            list.append(listList);
            
            options.initialization.getItems(this).each(function () {
                console.log("- " + options.getItemValue(this));
            });
        });
    };

    $.fn.dropdownlist.defaults = {
        initialization: {
            getItems: function (element) {
                return $(element).children();
            },
            isItemSelected: function (item) {
                return $(item).data("selected") !== undefined && $(item).data("selected") !== "false";
            }
        },
        getItemValue: function (item) {
            return $(item).data("value") || $(item).text()
        },
        getEmptyText: function () {
            return '(Select...)'
        },
        multiselect: false
    }
}(jQuery));