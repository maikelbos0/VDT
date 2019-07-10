/// <reference path="Basic.html" />

describe("a basic dropdownlist", function () {
    it('can be created', function () {
        var dropdown = $('#base-dropdown');

        expect(dropdown.length).toEqual(1);

        expect(function () {
            dropdown.dropdownlist();
        }).not.toThrow();
    });

    it('creates fields with the correct name', function () {
        $('#base-dropdown').dropdownlist();

        var fields = $('#base-dropdown').find('input.dropdownlist-field[name="dropdown-value"]');

        expect(fields.length).toEqual(3);
    });

    it('is single-select by default', function () {
        $('#base-dropdown').dropdownlist();

        var fields = $('#base-dropdown').find('input.dropdownlist-field[type="radio"]');

        expect(fields.length).toEqual(3);
    });

    it('in single-select mode selects the first option by default', function () {
        $('#base-dropdown').dropdownlist();

        var field = $('#base-dropdown').find('input.dropdownlist-field').first();

        expect(field.prop('checked')).toEqual(true);
    });

    it('has the correct field values', function () {
        $('#base-dropdown').dropdownlist();

        var fields = $('#base-dropdown').find('input.dropdownlist-field');

        expect($(fields[0]).val()).toEqual('1');
        expect($(fields[1]).val()).toEqual('2');
        expect($(fields[2]).val()).toEqual('Final option');
    });
});