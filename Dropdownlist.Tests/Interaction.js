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
            expect(selectedItems.not('div:first-child').length).toEqual(0);
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
            this.setSelectedItems('div:nth-child(2)');
        });

        var fields = $('#dropdown-interaction-1 input.dropdownlist-field');

        expect($(fields[1]).prop('checked')).toEqual(true);
    });

    it('sets only the first selected item when setting select items in single-select', function () {
        $('#dropdown-interaction-1').dropdownlist(function () {
            this.setSelectedItems('div');
        });

        var fields = $('#dropdown-interaction-1 input.dropdownlist-field');

        expect($(fields[0]).prop('checked')).toEqual(true);
        expect($(fields[1]).prop('checked')).toEqual(false);
        expect($(fields[2]).prop('checked')).toEqual(false);
    });

    it('can be used to get the selected items in multiselect', function () {
        $('#dropdown-interaction-2').dropdownlist(function () {
            var selectedItems = this.getSelectedItems();

            expect(selectedItems.length).toEqual(2);
            expect(selectedItems.not('div:nth-child(3n)').length).toEqual(0);
        });
    });

    it('can be used to get the selected values in multiselect', function () {
        $('#dropdown-interaction-2').dropdownlist(function () {
            var selectedValues = this.getSelectedValues();

            expect(selectedValues).toEqual([3, 3]);
        });
    });

    it('can be used to set the selected items in multiselect', function () {
        $('#dropdown-interaction-2').dropdownlist(function () {
            this.setSelectedItems('div:nth-child(2n)');
        });

        var fields = $('#dropdown-interaction-2 input.dropdownlist-field');

        expect($(fields[0]).prop('checked')).toEqual(false);
        expect($(fields[1]).prop('checked')).toEqual(true);
        expect($(fields[2]).prop('checked')).toEqual(false);
        expect($(fields[3]).prop('checked')).toEqual(true);
        expect($(fields[4]).prop('checked')).toEqual(false);
        expect($(fields[5]).prop('checked')).toEqual(true);
    });
});