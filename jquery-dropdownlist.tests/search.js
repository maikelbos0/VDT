describe('the text search', function () {
    it('is disabled by default', function () {
        var dropdown = $('#dropdown-search-disabled');

        dropdown.dropdownlist();

        expect(dropdown.closest('.dropdownlist').find('input.dropdownlist-search').length).toEqual(0);
    });

    it('is enabled if data-text-search is set to true', function () {
        var dropdown = $('#dropdown-search-enabled');

        dropdown.dropdownlist();

        expect(dropdown.closest('.dropdownlist').find('input.dropdownlist-search').length).toEqual(1);
    });

    it('is in the list by default', function () {
        var dropdown = $('#dropdown-search-filter-list');

        dropdown.dropdownlist();

        expect(dropdown.closest('.dropdownlist-list').find('input.dropdownlist-search').length).toEqual(1);
    });

    it('is in the selector when the option is provided', function () {
        var dropdown = $('#dropdown-search-filter-selector');

        dropdown.dropdownlist();

        expect(dropdown.closest('.dropdownlist').find('.dropdownlist-selector input.dropdownlist-search').length).toEqual(1);
    });

    it('in the selector in a closed dropdown is hidden', function () {
        var dropdown = $('#dropdown-search-hidden');

        dropdown.dropdownlist();

        expect(dropdown.closest('.dropdownlist').find('.dropdownlist-selector input.dropdownlist-search').css('display')).toEqual('none');
    });

    it('hides the selector text when it is in the selector', function () {
        var dropdown = $('#dropdown-search-visible');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();

        expect(dropdown.closest('.dropdownlist').find('.dropdownlist-selector input.dropdownlist-search').css('display')).not.toEqual('none');
        expect(dropdown.closest('.dropdownlist').find('.dropdownlist-selector .dropdownlist-selector-text').css('display')).toEqual('none');
    });

    it('does not close a single-select dropdown on click', function () {
        var dropdown = $('#dropdown-search-field-click');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.closest('.dropdownlist').find('.dropdownlist-search').click();

        expect(dropdown.closest('.dropdownlist').find('.dropdownlist-list').css('display')).not.toEqual('none');
    });

    it('does not hide the selector text when it is in the list', function () {
        var dropdown = $('#dropdown-search-not-hidden');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();

        expect(dropdown.closest('.dropdownlist').find('.dropdownlist-selector .dropdownlist-selector-text').css('display')).not.toEqual('none');
    });

    it('filters the list of items in a dropdown when typing', function () {
        var dropdown = $('#dropdown-search-field-filter');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.closest('.dropdownlist').find('.dropdownlist-search').val('final');
        dropdown.closest('.dropdownlist').find('.dropdownlist-search').keyup();

        var items = dropdown.children('div');

        expect($(items[0]).css('display')).toEqual('none');
        expect($(items[1]).css('display')).toEqual('none');
        expect($(items[2]).css('display')).not.toEqual('none');
    });

    it('does not hide the select all item', function () {
        var dropdown = $('#dropdown-search-field-filter-select-all');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.closest('.dropdownlist').find('.dropdownlist-search').val('final');
        dropdown.closest('.dropdownlist').find('.dropdownlist-search').keyup();

        expect(dropdown.find('.select-all').css('display')).not.toEqual('none');
    });

    it('does not leave items hidden after closing and reopening a dropdown', function () {
        var dropdown = $('#dropdown-search-field-filter-end');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.closest('.dropdownlist').find('.dropdownlist-search').val('final');
        dropdown.closest('.dropdownlist').find('.dropdownlist-search').keyup();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();

        var items = dropdown.children('div');

        expect($(items[0]).css('display')).not.toEqual('none');
        expect($(items[1]).css('display')).not.toEqual('none');
        expect($(items[2]).css('display')).not.toEqual('none');
    });

    it('hiding items does not change the selected items in a dropdown', function () {
        var dropdown = $('#dropdown-search-field-filter-selection');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.closest('.dropdownlist').find('.dropdownlist-search').val('final');
        dropdown.closest('.dropdownlist').find('.dropdownlist-search').keyup();

        var selectedItems;

        dropdown.dropdownlist(function () {
            selectedItems = this.getSelectedItems();
        });

        expect(selectedItems.length).toEqual(3);
    });

    it('copies the selector text after the selection changes if it is in the selector', function () {
        var dropdown = $('#dropdown-search-field-text');

        dropdown.dropdownlist(function () {
            this.setSelectedItems(dropdown.find('.select-item'));
        });

        expect(dropdown.closest('.dropdownlist').find('.dropdownlist-search').val()).toEqual('Second choice');
    });

    it('changes back to the selector text after typing a value and closing and opening if it is in the selector', function () {
        var dropdown = $('#dropdown-search-field-selector-text');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.closest('.dropdownlist').find('.dropdownlist-search').val('final');
        dropdown.closest('.dropdownlist').find('.dropdownlist-search').keyup();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();

        expect(dropdown.closest('.dropdownlist').find('.dropdownlist-search').val()).toEqual('Choice number 1');
    });

    it('is replaced by the selector text after opening and closing if it is in the selector', function () {
        var dropdown = $('#dropdown-search-hidden-after');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();

        expect(dropdown.closest('.dropdownlist').find('.dropdownlist-selector input.dropdownlist-search').css('display')).toEqual('none');
        expect(dropdown.closest('.dropdownlist').find('.dropdownlist-selector .dropdownlist-selector-text').css('display')).not.toEqual('none');
    });
});