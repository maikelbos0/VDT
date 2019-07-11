/// <reference path="Interaction.html" />

describe('a dropdownlist object', function () {
    it('is returned in the callback', function () {
        var called = false;

        $('#dropdown-interaction-1').dropdownlist({}, function () {
            called = true;
        });

        expect(called).toEqual(true);
    });

    it('callback is called if it\'s the first argument of the create function', function () {
        var called = false;

        $('#dropdown-interaction-1').dropdownlist(function () {
            called = true;
        });

        expect(called).toEqual(true);
    });

    it('callback is called  of the extension function when creating a dropdown', function () {
        $('#dropdown-interaction-1').dropdownlist(null, function () {
            expect(typeof this.areAllItemsSelected).toEqual('function');
        });
    });

    it('is given in the callback of the extension function when a dropdown already exists', function () {
        $('#dropdown-interaction-1').dropdownlist();

        $('#dropdown-interaction-1').dropdownlist(null, function () {
            expect(typeof this.areAllItemsSelected).toEqual('function');
        });
    });

    it('is the first parameter in the callback of the extension function', function () {
        $('#dropdown-interaction-1').dropdownlist(null, function (d) {

            expect(d).not.toBeNull();
            expect(d).not.toBeUndefined();
            expect(typeof d.areAllItemsSelected).toEqual('function');
        });
    });

    it('can be removed', function () {
        var dropdown = $('#dropdown-interaction-1');

        dropdown.dropdownlist(function () {
            this.remove();
        });

        expect(dropdown.closest('.dropdownlist').length).toEqual(0);
    });

    it('can be used to get the selected item', function () {
        $('#dropdown-interaction-1').dropdownlist(function () {
            var selectedItems = this.getSelectedItems();

            expect(selectedItems.length).toEqual(1);
            expect(selectedItems.not('#dropdown-interaction-1 div:first-child').length).toEqual(0);
        });
    });

    it('can be used to get the selected value', function () {
        $('#dropdown-interaction-1').dropdownlist(function () {
            var selectedValues = this.getSelectedValues();

            expect(selectedValues).toEqual([1]);
        });
    });

    it('can be used to set the selected item', function () {
        $('#dropdown-interaction-1').dropdownlist(function () {
            this.setSelectedItems('#dropdown-interaction-1 div:nth-child(2)');
                       
            var fields = $('#dropdown-interaction-1').find('input.dropdownlist-field');

            expect($(fields[1]).prop('checked')).toEqual(true);
        });
    });

    /*
     * TODO
     * Get/set/clear selected items and multiselect
     * More test files:
     * - Multiselect dropdown setup
     * - Setting options (each)
     * - Changing defaults
     * */
});