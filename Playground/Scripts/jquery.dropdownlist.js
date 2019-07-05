(function ($) {
    $.fn.dropdownlist = function (settings) {
        let options = $.extend({}, $.fn.dropdownlist.defaults, settings);

        return $(this).each(function () {
            let element = $(this);
            let selectBox = $('<div>', { class: "dropdownlist" });

            $(element).before(selectBox);
            selectBox.append($('<div>', { class: "dropdownlist-selector" }).append(
                $('<div>', { class: "dropdownlist-selector-text" }).text(options.emptyText),
                $('<div>', { class: "dropdownlist-selector-toggle" })
            ));
            selectBox.append($('<div>', { class: "dropdownlist-list" }).append(element));

            options.initialization.getItems(this).each(function () {
                console.log("- " + options.getItemValue(this));
            });
        });
    };

    $.fn.dropdownlist.defaults = {
        multiselect: false,
        emptyText: '(Click to select...)',
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
        }
    }
}(jQuery));