/// <reference path="Base.html" />

(function ($) {
    $.fn.test = function () {
        return this;
    }
}(jQuery));

describe("A basic Dropdownlist", function () {
    it('can be created', function () {
        expect(function () {
            // Testing jQeury plugins works, but testing dropdownlist does not work yet
            //$('#base-dropdown').dropdownlist();
            $('#base-dropdown').test();
        }).not.toThrow();
    });
});