/// <reference path="Basic.html" />

describe('a basic dropdownlist', function () {
    it('can be created', function () {
        var dropdown = $('#basic-dropdown-1');

        expect(dropdown.length).toEqual(1);
        expect(function () {
            dropdown.dropdownlist();
        }).not.toThrow();
        expect(dropdown.closest('.dropdownlist').length).toEqual(1);
    });

    it('creates fields with the correct name', function () {
        $('#basic-dropdown-1').dropdownlist();

        $('#basic-dropdown-1 input.dropdownlist-field').each(function () {
            expect($(this).prop('name')).toEqual('dropdown-value');
        });
    });

    it('is single-select by default', function () {
        $('#basic-dropdown-1').dropdownlist();

        $('#basic-dropdown-1 input.dropdownlist-field').each(function () {
            expect($(this).prop('type')).toEqual('radio');
        });
    });

    it('in single-select mode selects the first option by default', function () {
        $('#basic-dropdown-1').dropdownlist();

        var fields = $('#basic-dropdown-1 input.dropdownlist-field');

        expect($(fields[0]).prop('checked')).toEqual(true);
    });

    it('gets field values from attribute data-value', function () {
        $('#basic-dropdown-1').dropdownlist();

        var fields = $('#basic-dropdown-1 input.dropdownlist-field');

        expect($(fields[0]).val()).toEqual('1');
        expect($(fields[1]).val()).toEqual('2');
        expect($(fields[2]).val()).toEqual('3');
    });

    it('in single-select mode selects the right option by attribute data-selected', function () {
        $('#basic-dropdown-2').dropdownlist();

        var fields = $('#basic-dropdown-2 input.dropdownlist-field');

        expect($(fields[1]).prop('checked')).toEqual(true);
    });

    it('in single-select mode selects at most one option by attribute data-selected', function () {
        $('#basic-dropdown-5').dropdownlist();

        var fields = $('#basic-dropdown-5 input.dropdownlist-field:checked');

        expect(fields.length).toEqual(1);
    });

    it('gets field values from inner text as fallback', function () {
        $('#basic-dropdown-2').dropdownlist();

        var fields = $('#basic-dropdown-2 input.dropdownlist-field');

        expect($(fields[0]).val()).toEqual('Choice number 1');
        expect($(fields[1]).val()).toEqual('Second choice');
        expect($(fields[2]).val()).toEqual('Final option');
    });

    // is multiselect if data-multiselect is set to true
    // in multiselect mode selects nothing by default
    // in multiselect mode selects the right options by attribute data-selected
});