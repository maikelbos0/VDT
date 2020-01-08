describe('the selector text', function () {
    it('of a single-select dropdown without a default selection should be initialized with the text of the first option', function () {
        $('#dropdown-selector-first-option').dropdownlist();

        expect($('#dropdown-selector-first-option').closest('.dropdownlist').find('.dropdownlist-selector-text').text()).toEqual('Choice number 1');
    });

    it('of a single-select dropdown should be initialized with the text of the selected option', function () {
        $('#dropdown-selector-selected-option').dropdownlist();

        expect($('#dropdown-selector-selected-option').closest('.dropdownlist').find('.dropdownlist-selector-text').text()).toEqual('Second choice');
    });

    it('of a single-select dropdown should be updated to the text of the new option after changing the selection', function () {
        $('#dropdown-selector-changed-selection').dropdownlist(function () {
            this.setSelectedItems('div:last-child');
        });

        expect($('#dropdown-selector-changed-selection').closest('.dropdownlist').find('.dropdownlist-selector-text').text()).toEqual('Final option');
    });

    it('of a multiselect dropdown without a default selection should be initialized with the empty text', function () {
        $('#dropdown-selector-multiselect-empty').dropdownlist();

        expect($('#dropdown-selector-multiselect-empty').closest('.dropdownlist').find('.dropdownlist-selector-text').text()).toEqual('(Select...)');
    });

    it('of a multiselect dropdown should be initialized with the text of the selected options', function () {
        $('#dropdown-selector-multiselect-selected-options').dropdownlist();

        expect($('#dropdown-selector-multiselect-selected-options').closest('.dropdownlist').find('.dropdownlist-selector-text').text()).toEqual('Second choice, A third option');
    });

    it('of a multiselect dropdown should be updated to the text of the new options after changing the selection', function () {
        $('#dropdown-selector-multiselect-changed-selection').dropdownlist(function () {
            this.setSelectedItems('div:not(:nth-child(2))');
        });

        expect($('#dropdown-selector-multiselect-changed-selection').closest('.dropdownlist').find('.dropdownlist-selector-text').text()).toEqual('Choice number 1, A third option');
    });

    it('of a multiselect dropdown should be updated to the empty text after clearing the selection', function () {
        $('#dropdown-selector-multiselect-cleared-selection').dropdownlist(function () {
            this.clearSelectedItems();
        });

        expect($('#dropdown-selector-multiselect-cleared-selection').closest('.dropdownlist').find('.dropdownlist-selector-text').text()).toEqual('(Select...)');
    });
});