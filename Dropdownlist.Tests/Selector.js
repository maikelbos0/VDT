/// <reference path="Selector.html" />

describe('the selector text', function () {
    it('of a single-select dropdown without a default selection should be initialized with the text of the first option', function () {
        $('#dropdown-selector-1').dropdownlist();

        expect($('#dropdown-selector-1').closest('.dropdownlist').find('.dropdownlist-selector-text').text()).toEqual('Choice number 1');
    });

    it('of a single-select dropdown should be initialized with the text of the selected option', function () {
        $('#dropdown-selector-2').dropdownlist();

        expect($('#dropdown-selector-2').closest('.dropdownlist').find('.dropdownlist-selector-text').text()).toEqual('Second choice');
    });

    it('of a single-select dropdown should be updated to the text of the new option after changing the selection', function () {
        $('#dropdown-selector-1').dropdownlist(function () {
            this.setSelectedItems('div:last-child');
        });

        expect($('#dropdown-selector-1').closest('.dropdownlist').find('.dropdownlist-selector-text').text()).toEqual('Final option');
    });

    it('of a multiselect dropdown without a default selection should be initialized with the empty text', function () {
        $('#dropdown-selector-3').dropdownlist();

        expect($('#dropdown-selector-3').closest('.dropdownlist').find('.dropdownlist-selector-text').text()).toEqual('(Select...)');
    });

    it('of a multiselect dropdown should be initialized with the text of the selected options', function () {
        $('#dropdown-selector-4').dropdownlist();

        expect($('#dropdown-selector-4').closest('.dropdownlist').find('.dropdownlist-selector-text').text()).toEqual('Second choice, A third option');
    });

    it('of a multiselect dropdown should be updated to the text of the new options after changing the selection', function () {
        $('#dropdown-selector-3').dropdownlist(function () {
            this.setSelectedItems('div:not(:nth-child(2))');
        });

        expect($('#dropdown-selector-3').closest('.dropdownlist').find('.dropdownlist-selector-text').text()).toEqual('Choice number 1, A third option');
    });

    it('of a multiselect dropdown should be updated to the empty text after clearing the selection', function () {
        $('#dropdown-selector-4').dropdownlist(function () {
            this.clearSelectedItems();
        });

        expect($('#dropdown-selector-4').closest('.dropdownlist').find('.dropdownlist-selector-text').text()).toEqual('(Select...)');
    });
});