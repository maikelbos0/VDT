describe('a dropdownlist object', function () {
    it('callback is called', function () {
        var called = false;

        $('#dropdown-interaction-callback').dropdownlist({}, function () {
            called = true;
        });

        expect(called).toEqual(true);
    });

    it('callback is called if it\'s the first argument of the create function', function () {
        var called = false;

        $('#dropdown-interaction-callback-no-options').dropdownlist(function () {
            called = true;
        });

        expect(called).toEqual(true);
    });

    it('is the function scope in the callback when creating a dropdown', function () {
        var called = false;

        $('#dropdown-interaction-this').dropdownlist(null, function () {
            expect(typeof this.areAllItemsSelected).toEqual('function');
            called = true;
        });

        expect(called).toEqual(true);
    });

    it('is the function scope in the callback when a dropdown already exists', function () {
        var called = false;

        $('#dropdown-interaction-this-existing').dropdownlist();

        $('#dropdown-interaction-this-existing').dropdownlist(null, function () {
            expect(typeof this.areAllItemsSelected).toEqual('function');
            called = true;
        });

        expect(called).toEqual(true);
    });

    it('is the first parameter in the callback', function () {
        var called = false;

        $('#dropdown-interaction-first-parameter').dropdownlist(null, function (d) {
            expect(d).not.toBeNull();
            expect(d).not.toBeUndefined();
            expect(typeof d.areAllItemsSelected).toEqual('function');

            called = true;
        });

        expect(called).toEqual(true);
    });

    it('can be removed', function () {
        var dropdown = $('#dropdown-interaction-remove');

        dropdown.dropdownlist(function () {
            this.remove();
        });

        expect(dropdown.closest('.dropdownlist').length).toEqual(0);
        expect(dropdown.data('dropdownlist')).toEqual(undefined);
    });

    it('can be used to get the selected item', function () {
        var called = false;

        $('#dropdown-interaction-get-selected').dropdownlist(function () {
            var selectedItems = this.getSelectedItems();

            expect(selectedItems.length).toEqual(1);
            expect(selectedItems.not('div:first-child').length).toEqual(0);

            called = true;
        });

        expect(called).toEqual(true);
    });

    it('can be used to get the selected value', function () {
        var called = false;

        $('#dropdown-interaction-get-selected-value').dropdownlist(function () {
            var selectedValues = this.getSelectedValues();

            expect(selectedValues).toEqual([1]);

            called = true;
        });

        expect(called).toEqual(true);
    });

    it('can be used to set the selected item', function () {
        $('#dropdown-interaction-set-selected').dropdownlist(function () {
            this.setSelectedItems('div:nth-child(2)');
        });

        var fields = $('#dropdown-interaction-set-selected input.dropdownlist-field');

        expect($(fields[1]).prop('checked')).toEqual(true);
    });

    it('sets only the first selected item when setting select items in single-select', function () {
        $('#dropdown-interaction-set-selected-single').dropdownlist(function () {
            this.setSelectedItems('div');
        });

        var fields = $('#dropdown-interaction-set-selected-single input.dropdownlist-field');

        expect($(fields[0]).prop('checked')).toEqual(true);
        expect($(fields[1]).prop('checked')).toEqual(false);
        expect($(fields[2]).prop('checked')).toEqual(false);
    });
    
    it('can be used to get the selected items in multiselect', function () {
        var selectedItems;

        $('#dropdown-interaction-multiselect-get-selected').dropdownlist(function () {
            selectedItems = this.getSelectedItems();
        });

        expect(selectedItems.length).toEqual(2);
        expect(selectedItems.not('div:nth-child(3n)').length).toEqual(0);
    });

    it('can be used to get the selected values in multiselect', function () {
        var selectedValues;

        $('#dropdown-interaction-multiselect-get-values').dropdownlist(function () {
            selectedValues = this.getSelectedValues();
        });

        expect(selectedValues).toEqual([3, 3]);
    });

    it('can be used to set the selected items in multiselect', function () {
        $('#dropdown-interaction-multiselect-set-selected').dropdownlist(function () {
            this.setSelectedItems('div:nth-child(2n)');
        });

        var fields = $('#dropdown-interaction-multiselect-set-selected input.dropdownlist-field');

        expect($(fields[0]).prop('checked')).toEqual(false);
        expect($(fields[1]).prop('checked')).toEqual(true);
        expect($(fields[2]).prop('checked')).toEqual(false);
        expect($(fields[3]).prop('checked')).toEqual(true);
        expect($(fields[4]).prop('checked')).toEqual(false);
        expect($(fields[5]).prop('checked')).toEqual(true);
    });

    it('can be disabled', function () {
        var dropdown = $('#dropdown-interaction-disable');

        dropdown.dropdownlist(function () {
            this.disable();
        });

        var fields = dropdown.find('input.dropdownlist-field');

        expect($(fields[0]).prop('disabled')).toEqual(true);
        expect($(fields[1]).prop('disabled')).toEqual(true);
        expect($(fields[2]).prop('disabled')).toEqual(true);

        expect(dropdown.closest('.dropdownlist').hasClass('dropdownlist-disabled')).toEqual(true);
    });

    it('can be enabled', function () {
        var dropdown = $('#dropdown-interaction-enabled');

        dropdown.dropdownlist(function () {
            this.disable();
        });

        var fields = dropdown.find('input.dropdownlist-field');

        expect($(fields[0]).prop('disabled')).toEqual(undefined);
        expect($(fields[1]).prop('disabled')).toEqual(undefined);
        expect($(fields[2]).prop('disabled')).toEqual(undefined);

        expect(dropdown.closest('.dropdownlist').hasClass('dropdownlist-disabled')).toEqual(false);
    });
});