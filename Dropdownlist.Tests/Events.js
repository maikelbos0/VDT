/// <reference path="Events.html" />

describe('when a user', function () {
    it('clicks on a dropdown-selector it opens', function () {
        $('#dropdown-events-open').dropdownlist();

        $('#dropdown-events-open').closest('.dropdownlist').find('.dropdownlist-selector').click();

        expect($('#dropdown-events-open').closest('.dropdownlist').find('.dropdownlist-list').css('display')).toEqual('block');
    });

    it('clicks on the dropdown-selector it closes the open dropdown', function () {
        $('#dropdown-events-selector-close').dropdownlist();

        $('#dropdown-events-selector-close').closest('.dropdownlist').find('.dropdownlist-selector').click();
        $('#dropdown-events-selector-close').closest('.dropdownlist').find('.dropdownlist-selector').click();

        expect($('#dropdown-events-selector-close').closest('.dropdownlist').find('.dropdownlist-list').css('display')).toEqual('none');
    });

    it('clicks outside the dropdown it closes the open dropdown', function () {
        $('#dropdown-events-selector-close').dropdownlist();

        $('#dropdown-events-selector-close').closest('.dropdownlist').find('.dropdownlist-selector').click();
        $('#alternate-element').click();

        expect($('#dropdown-events-selector-close').closest('.dropdownlist').find('.dropdownlist-list').css('display')).toEqual('none');
    });

    it('clicks on a item in an open single-select dropdown it selects the item', function () {
        fail();
    });

    it('clicks on a item in an open single-select dropdown it closes the dropdown', function () {
        fail();
    });

    it('clicks on a item in an open multiselect dropdown it selects the item', function () {
        fail();
    });

    it('clicks on a item in an open multiselect dropdown it does not close the dropdown', function () {
        fail();
    });

    it('clicks on select all in an open multiselect dropdown it selects all items', function () {
        fail();
    });

    it('clicks on select all in an open multiselect dropdown with all items selected it clears the selection', function () {
        fail();
    });

    it('clicks on an item in an open multiselect dropdown with all items selected it clears the select all item', function () {
        fail();
    });

    it('clicks on the unselected item in an open multiselect dropdown with all but one items selected it selects the select all item', function () {
        fail();
    });

    it('clicks on an item in an open dropdown it triggers the selected items changed event', function () {
        fail();
    });
});