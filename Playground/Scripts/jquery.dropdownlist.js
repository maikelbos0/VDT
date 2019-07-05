(function ($) {
    $.fn.dropdownlist = function (settings) {
        let options = $.extend({}, $.fn.dropdownlist.defaults, settings);

        return $(this).each(function () {
            let element = $(this);

            options.initialization.createSelectBox(element);

            options.initialization.getItems(this).each(function () {
                console.log("- " + options.getItemValue(this));
            });
        });
    };

    $.fn.dropdownlist.defaults = {
        multiselect: false,
        initialization: {
            getItems: function (element) {
                return $(element).children();
            },
            isItemSelected: function (item) {
                return $(item).data("selected") !== undefined && $(item).data("selected") !== "false";
            },
            createSelectBox: function (element) {
                let selectBox = $('<div>', { class: "dropdownlist" });

                $(element).before(selectBox);
                selectBox.append($('<div>', { class: "dropdownlist-selector" }));
                selectBox.append($('<div>', { class: "dropdownlist-list" }).append(element));
            }
        },
        getItemValue: function (item) {
            return $(item).data("value") || $(item).text()
        }
    }
}(jQuery));