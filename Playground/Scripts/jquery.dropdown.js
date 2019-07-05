(function ($) {
    $.fn.dropdown = function (settings) {
        var options = $.extend({}, $.fn.dropdown.defaults, settings);

        console.log(options);

        return this;
    };

    $.fn.dropdown.defaults = {
        multiselect: false,
        valueAttribute: "value",
        selectedAttribute: "selected"
    }
}(jQuery));