/// <reference path="Options.html" />

describe('a dropdownlist option', function () {
    it('can be provided for getItems', function () {
        $('#dropdown-options-items').dropdownlist({
            getItems: function (element) {
                return $(element).children(':not(.header,.footer)');
            }
        });

        expect($('#dropdown-options-items input.dropdownlist-field').length).toEqual(3);
    });

    it('can be provided for isItemSelected', function () {
        $('#dropdown-options-item-selected').dropdownlist({
            isItemSelected: function (item) {
                return $(item).hasClass('selected');
            }
        });

        var fields = $('#dropdown-options-item-selected input.dropdownlist-field');

        expect($(fields[0]).prop('checked')).toEqual(false);
        expect($(fields[1]).prop('checked')).toEqual(true);
        expect($(fields[2]).prop('checked')).toEqual(false);
    });

    it('can be provided for getFieldName', function () {
        $('#dropdown-options-field-name').dropdownlist({
            getFieldName: function () {
                return 'my-field-name';
            }
        });

        $('#dropdown-options-field-name input.dropdownlist-field').each(function () {
            expect($(this).prop('name')).toEqual('my-field-name');
        });
    });

    it('can be provided for getItemText', function () {
        $('#dropdown-options-item-text').dropdownlist({
            getItemText: function (item) {
                return $(item).data('value') + ' - ' + $(item).text();
            }
        });

        expect($('#dropdown-options-item-text').closest('.dropdownlist').find('.dropdownlist-selector-text').text()).toEqual('1 - Choice number 1');
    });

    it('can be provided for getEmptyText', function () {
        var user = {
            language: 'NL'
        };

        $('#dropdown-options-empty-text').dropdownlist({
            getEmptyText: function () {
                switch (user.language) {
                    case 'NL':
                        return 'Selecteer een optie...';
                    default:
                        return 'Select an option...';
                }
            }
        });

        expect($('#dropdown-options-empty-text').closest('.dropdownlist').find('.dropdownlist-selector-text').text()).toEqual('Selecteer een optie...');
    });

    it('can be provided for getSelectAllItem', function () {
        $('#dropdown-options-select-all').dropdownlist({
            getSelectAllItem: function (element) {
                return element.find('.select-all');
            }
        }, function () {
            this.selectAllItems();

            expect(this.getSelectedValues()).toEqual([1, 2, 3]);
        });
    });

    it('can be provided for getItemValue', function () {
        $('#dropdown-options-item-value').dropdownlist({
            getItemValue: function (item) {
                return -1 * $(item).data('value');
            }
        }, function () {
                expect(this.getSelectedValues()).toEqual([-1, -2, -3]);
        });
    });

    it('can be provided for isMultiselect', function () {
        $('#dropdown-options-multiselect').dropdownlist({
            isMultiselect: function (element) {
                return element.hasClass('multiselect');
            }
        });

        $('#dropdown-options-multiselect input.dropdownlist-field').each(function () {
            expect($(this).prop('type')).toEqual('checkbox');
        });
    });
});