/// <reference path="options.html" />

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

        var fields = $('#dropdown-options-field-name input.dropdownlist-field');

        expect(fields.length).toBe(3);

        fields.each(function () {
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
        var selectedValues;

        $('#dropdown-options-select-all').dropdownlist({
            getSelectAllItem: function (element) {
                return element.find('.select-all');
            }
        }, function () {
            this.selectAllItems();

            selectedValues = this.getSelectedValues();
        });

        expect(selectedValues).toEqual([1, 2, 3]);
    });

    it('can be provided for getItemValue', function () {
        var selectedValues;

        $('#dropdown-options-item-value').dropdownlist({
            getItemValue: function (item) {
                return -1 * $(item).data('value');
            }
        }, function () {
            selectedValues = this.getSelectedValues();
        });

        expect(selectedValues).toEqual([-1, -2, -3]);
    });

    it('can be provided for isMultiselect', function () {
        $('#dropdown-options-multiselect').dropdownlist({
            isMultiselect: function (element) {
                return element.hasClass('multiselect');
            }
        });

        var fields = $('#dropdown-options-multiselect input.dropdownlist-field');

        expect(fields.length).toEqual(3);

        fields.each(function () {
            expect($(this).prop('type')).toEqual('checkbox');
        });
    });

    it('can be provided for hasTextSearch', function () {
        $('#dropdown-options-text-search').dropdownlist({
            hasTextSearch: function (element) {
                return element.hasClass('text-search-enabled');
            }
        });

        expect($('#dropdown-options-text-search').closest('.dropdownlist').find('input.dropdownlist-search').length).toEqual(1);
    });

    it('can be provided for itemMatchesTextSearch', function () {
        $('#dropdown-options-search-item').dropdownlist({
            itemMatchesTextSearch: function (item, searchText) {
                return $(item).text().toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) === 0;
            }
        },
        function () {
            this.textSearch.val('choice');
            this.textSearch.keyup();
        });

        var items = $('#dropdown-options-search-item div');

        expect(items.length).toEqual(3);
        expect($(items[0]).css('display')).toEqual('block');
        expect($(items[1]).css('display')).toEqual('none');
        expect($(items[2]).css('display')).toEqual('none');
    });

    it('can be provided for isTextSearchInsideSelector', function () {
        var dropdownlist = $('#dropdown-options-selector-text-search');

        dropdownlist.dropdownlist({
            isTextSearchInsideSelector: function (element) {
                return true;
            }
        });

        expect(dropdownlist.closest('.dropdownlist-list').find('input.dropdownlist-search').length).toEqual(0);
        expect(dropdownlist.closest('.dropdownlist').find('.dropdownlist-selector input.dropdownlist-search').length).toEqual(1);
    });

    it('can be provided for getContainerAttributes', function () {
        var dropdownlist = $('#dropdown-options-container-attributes');

        dropdownlist.dropdownlist({
            getContainerAttributes: function () {
                return { id: 'test' };
            }
        });

        expect(dropdownlist.closest('.dropdownlist').attr('id')).toEqual('test');
    });

    it('can be provided for getSelectorAttributes', function () {
        var dropdownlist = $('#dropdown-options-selector-attributes');

        dropdownlist.dropdownlist({
            getSelectorAttributes: function () {
                return { id: 'test' };
            }
        });

        expect(dropdownlist.closest('.dropdownlist').find('.dropdownlist-selector').attr('id')).toEqual('test');
    });

    it('can be provided for getSelectorTextAttributes', function () {
        var dropdownlist = $('#dropdown-options-selector-text-attributes');

        dropdownlist.dropdownlist({
            getSelectorTextAttributes: function () {
                return { id: 'test' };
            }
        });

        expect(dropdownlist.closest('.dropdownlist').find('.dropdownlist-selector-text').attr('id')).toEqual('test');
    });

    it('can be provided for getSelectorToggleAttributes', function () {
        var dropdownlist = $('#dropdown-options-selector-toggle-attributes');

        dropdownlist.dropdownlist({
            getSelectorToggleAttributes: function () {
                return { id: 'test' };
            }
        });

        expect(dropdownlist.closest('.dropdownlist').find('.dropdownlist-selector-toggle').attr('id')).toEqual('test');
    });

    it('can be provided for getListAttributes', function () {
        var dropdownlist = $('#dropdown-options-list-attributes');

        dropdownlist.dropdownlist({
            getListAttributes: function () {
                return { id: 'test' };
            }
        });

        expect(dropdownlist.closest('.dropdownlist-list').attr('id')).toEqual('test');
    });

    it('can be provided for getTextSearchAttributes', function () {
        var dropdownlist = $('#dropdown-options-text-search-attributes');

        dropdownlist.dropdownlist({
            getTextSearchAttributes: function () {
                return { id: 'test' };
            }
        });

        expect(dropdownlist.closest('.dropdownlist').find('.dropdownlist-search').attr('id')).toEqual('test');
    });

    it('can be provided for getInputAttributes', function () {
        var dropdownlist = $('#dropdown-options-input-attributes');

        dropdownlist.dropdownlist({
            getInputAttributes: function () {
                return { id: 'test' };
            }
        });

        expect(dropdownlist.find('.dropdownlist-field').attr('id')).toEqual('test');
    });

    it('can be provided for isDisabled', function () {
        var dropdownlist = $('#dropdown-options-disabled');

        dropdownlist.dropdownlist({
            isDisabled: function (element) {
                return $(element).hasClass('disabled-field');
            }
        });

        expect(dropdownlist.closest('.dropdownlist').hasClass('dropdownlist-disabled')).toEqual(true);
    });
});