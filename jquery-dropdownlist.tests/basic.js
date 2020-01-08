describe('a basic dropdownlist', function () {
    it('can be created', function () {
        var dropdown = $('#basic-dropdown-can-be-created');

        expect(dropdown.length).toEqual(1);
        expect(function () {
            dropdown.dropdownlist();
        }).not.toThrow();
        expect(dropdown.closest('.dropdownlist').length).toEqual(1);
    });

    it('creates fields with the correct name', function () {
        $('#basic-dropdown-field-name').dropdownlist();

        var fields = $('#basic-dropdown-field-name input.dropdownlist-field');

        expect(fields.length).toBeGreaterThan(0);

        fields.each(function () {
            expect($(this).prop('name')).toEqual('dropdown-value');
        });
    });

    it('is single-select by default', function () {
        $('#basic-dropdown-single-select').dropdownlist();

        var fields = $('#basic-dropdown-single-select input.dropdownlist-field');

        expect(fields.length).toBeGreaterThan(0);

        fields.each(function () {
            expect($(this).prop('type')).toEqual('radio');
        });
    });

    it('in single-select mode selects the first option by default', function () {
        $('#basic-dropdown-empty-selection').dropdownlist();

        var fields = $('#basic-dropdown-empty-selection input.dropdownlist-field');

        expect($(fields[0]).prop('checked')).toEqual(true);
    });

    it('gets field values from attribute data-value', function () {
        $('#basic-dropdown-attribute-value').dropdownlist();

        var fields = $('#basic-dropdown-attribute-value input.dropdownlist-field');

        expect($(fields[0]).val()).toEqual('1');
        expect($(fields[1]).val()).toEqual('2');
        expect($(fields[2]).val()).toEqual('3');
    });

    it('in single-select mode selects the right option by attribute data-selected', function () {
        $('#basic-dropdown-attribute-selected').dropdownlist();

        var fields = $('#basic-dropdown-attribute-selected input.dropdownlist-field');

        expect($(fields[1]).prop('checked')).toEqual(true);
    });

    it('in single-select mode selects at most one option by attribute data-selected', function () {
        $('#basic-dropdown-single-select-once').dropdownlist();

        var fields = $('#basic-dropdown-single-select-once input.dropdownlist-field:checked');

        expect(fields.length).toEqual(1);
    });

    it('gets field values from inner text as fallback', function () {
        $('#basic-dropdown-text-value').dropdownlist();

        var fields = $('#basic-dropdown-text-value input.dropdownlist-field');

        expect($(fields[0]).val()).toEqual('Choice number 1');
        expect($(fields[1]).val()).toEqual('Second choice');
        expect($(fields[2]).val()).toEqual('Final option');
    });

    it('is multiselect if data-multiselect is set to true', function () {
        $('#basic-dropdown-multiselect').dropdownlist();

        var fields = $('#basic-dropdown-multiselect input.dropdownlist-field');

        expect(fields.length).toBeGreaterThan(0);
        
        fields.each(function () {
            expect($(this).prop('type')).toEqual('checkbox');
        });
    });

    it('in multiselect mode selects nothing by default', function () {
        $('#basic-dropdown-multiselect-selection').dropdownlist();

        var fields = $('#basic-dropdown-multiselect-selection input.dropdownlist-field');

        expect(fields.length).toBeGreaterThan(0);

        fields.each(function () {
            expect($(this).prop('checked')).toEqual(false);
        });
    });

    it('in multiselect mode selects the right options by attribute data-selected', function () {
        $('#basic-dropdown-multiselect-attribute-selected').dropdownlist();

        var fields = $('#basic-dropdown-multiselect-attribute-selected input.dropdownlist-field');

        expect($(fields[0]).prop('checked')).toEqual(false);
        expect($(fields[1]).prop('checked')).toEqual(true);
        expect($(fields[2]).prop('checked')).toEqual(true);
    });

    it('in multiselect mode does not set an input name for the select all item', function () {
        $('#basic-dropdown-multiselect-field-all').dropdownlist();

        var field = $('#basic-dropdown-multiselect-field-all .select-all input.dropdownlist-field');

        expect(field.length).toEqual(1)
        expect(field.prop('name')).toEqual('');
    });

    it('is disable if data-disabled is set to true', function () {
        $('#basic-dropdown-disabled').dropdownlist();

        expect($('#basic-dropdown-disabled').closest('.dropdownlist').hasClass('dropdownlist-disabled')).toEqual(true);
    });
});