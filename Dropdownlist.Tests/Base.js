/// <reference path="Base.html" />

describe("a basic dropdownlist", function () {
    it('can be created', function () {
        expect(function () {
            $('#base-dropdown').dropdownlist();
        }).not.toThrow();
    });
});