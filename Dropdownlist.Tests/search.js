/// <reference path="search.html" />

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
    
    it('filter is in the list for a multiselect dropdown', function () {
        var dropdown = $('#dropdown-search-multiselect-filter-position');

        dropdown.dropdownlist();

        expect(dropdown.closest('.dropdownlist-list').find('input.dropdownlist-search').length).toEqual(1);
    });

    it('filter is in the selector for a single-select dropdown', function () {
        var dropdown = $('#dropdown-search-filter-position');

        dropdown.dropdownlist();

        expect(dropdown.closest('.dropdownlist').find('.dropdownlist-selector input.dropdownlist-search').length).toEqual(1);
    });

    it('in a closed single-select dropdown is hidden', function () {
        fail();
    });

    it('hides the selector text in an open single-select dropdown', function () {
        fail();
    });

    it('does not hide the selector text in an open multiselect dropdown', function () {
        fail();
    });

    it('filters the list of items in a dropdown when typing', function () {
        fail();
    });

    it('does not leave items hidden after closing and reopening a dropdown', function () {
        fail();
    });

    it('hiding items does not change the selected items in a dropdown', function () {
        // in multiselect
        fail();
    });

    it('copies the selector text after the selection changes in a single-select dropdown', function () {
        fail();
    });

    it('changes back to the selector text after typing a value and closing and opening a single-select dropdown', function () {
        fail();
    });

    it('is replaced by the selector text after opening and closing a single-select dropdown', function () {
        fail();
    });
});