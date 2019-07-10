/// <reference path="Basic.html" />

describe("a basic dropdownlist", function () {
    it('can be created', function () {
        var dropdown = $('#base-dropdown-1');

        expect(dropdown.length).toEqual(1);

        expect(function () {
            dropdown.dropdownlist();
        }).not.toThrow();
    });

    it('creates fields with the correct name', function () {
        $('#base-dropdown-1').dropdownlist();

        var fields = $('#base-dropdown-1').find('input.dropdownlist-field[name="dropdown-value"]');

        expect(fields.length).toEqual(3);
    });

    it('is single-select by default', function () {
        $('#base-dropdown-1').dropdownlist();

        var fields = $('#base-dropdown-1').find('input.dropdownlist-field[type="radio"]');

        expect(fields.length).toEqual(3);
    });

    it('in single-select mode selects the first option by default', function () {
        $('#base-dropdown-1').dropdownlist();

        var field = $('#base-dropdown-1').find('input.dropdownlist-field').first();

        expect(field.prop('checked')).toEqual(true);
    });

    it('gets field values from attribute data-value', function () {
        $('#base-dropdown-1').dropdownlist();

        var fields = $('#base-dropdown-1').find('input.dropdownlist-field');

        expect($(fields[0]).val()).toEqual('1');
        expect($(fields[1]).val()).toEqual('2');
        expect($(fields[2]).val()).toEqual('3');
    });

    it('in single-select mode selects the right option by attribute data-selected', function () {
        $('#base-dropdown-2').dropdownlist();

        var field = $('#base-dropdown-2').find('input.dropdownlist-field:checked');

        expect(field.val()).toEqual('Second choice');
    });

    it('gets field values from inner text as fallback', function () {
        $('#base-dropdown-2').dropdownlist();

        var fields = $('#base-dropdown-2').find('input.dropdownlist-field');

        expect($(fields[0]).val()).toEqual('Choice number 1');
        expect($(fields[1]).val()).toEqual('Second choice');
        expect($(fields[2]).val()).toEqual('Final option');
    });
});