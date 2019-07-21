/// <reference path="events.html" />

describe('when a user', function () {
    it('clicks on a dropdown-selector it opens', function () {
        var dropdown = $('#dropdown-events-open');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();

        expect(dropdown.closest('.dropdownlist-list').css('display')).not.toEqual('none');
    });

    it('clicks on the dropdown-selector it closes the open dropdown', function () {
        var dropdown = $('#dropdown-events-selector-close');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();

        expect(dropdown.closest('.dropdownlist-list').css('display')).toEqual('none');
    });

    it('clicks outside the dropdown it closes the open dropdown', function () {
        var dropdown = $('#dropdown-events-document-close');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        $('#alternate-element').click();

        expect(dropdown.closest('.dropdownlist-list').css('display')).toEqual('none');
    });

    it('clicks outside the dropdown it does not open the dropdown', function () {
        var dropdown = $('#dropdown-events-document-open');

        dropdown.dropdownlist();
        $('#alternate-element').click();

        expect(dropdown.closest('.dropdownlist-list').css('display')).toEqual('none');
    });

    it('clicks on a item in an open single-select dropdown it selects the item', function () {
        var dropdown = $('#dropdown-events-single-select-item');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.find('.select-item').click();

        expect(dropdown.find('.select-item input').prop('checked')).toEqual(true);
    });

    it('clicks on a item in an open single-select dropdown it updates the selector text', function () {
        var dropdown = $('#dropdown-events-single-select-item-text');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.find('.select-item').click();

        expect(dropdown.closest('.dropdownlist').find('.dropdownlist-selector-text').text()).toEqual('Second choice');
    });

    it('clicks on a item in an open single-select dropdown it closes the dropdown', function () {
        var dropdown = $('#dropdown-events-select-item-close');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.find('.select-item').click();

        expect(dropdown.closest('.dropdownlist-list').css('display')).toEqual('none');
    });

    it('clicks on a item in an open multiselect dropdown it selects the item', function () {
        var dropdown = $('#dropdown-events-multi-select-item');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.find('.select-item').click();

        expect(dropdown.find('.select-item input').prop('checked')).toEqual(true);
    });

    it('clicks on a item in an open multiselect dropdown it does not close the dropdown', function () {
        var dropdown = $('#dropdown-events-multi-select-item-open');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.find('.select-item').click();

        expect(dropdown.closest('.dropdownlist-list').css('display')).not.toEqual('none');
    });

    it('clicks on select all in an open multiselect dropdown it selects all items', function () {
        var dropdown = $('#dropdown-events-multi-select-all');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.find('.select-all').click();

        var fields = dropdown.find('input.dropdownlist-field');

        expect(fields.length).toEqual(4);

        fields.each(function () {
            expect($(this).prop('checked')).toEqual(true);
        });
    });

    it('clicks on select all in an open multiselect dropdown with all items selected it clears the selection', function () {
        var dropdown = $('#dropdown-events-multi-deselect-all');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.find('.select-all').click();

        var fields = dropdown.find('input.dropdownlist-field');

        expect(fields.length).toEqual(4);

        fields.each(function () {
            expect($(this).prop('checked')).toEqual(false);
        });
    });

    it('clicks on an item in an open multiselect dropdown with all items selected it clears the select all item', function () {
        var dropdown = $('#dropdown-events-multi-deselect-item');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.find('.select-item').click();

        expect(dropdown.find('.select-all input.dropdownlist-field').prop('checked')).toEqual(false);
    });

    it('clicks on the unselected item in an open multiselect dropdown with all but one items selected it selects the select all item', function () {
        var dropdown = $('#dropdown-events-multi-select-item-select-all');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.find('.select-item').click();

        expect(dropdown.find('.select-all input.dropdownlist-field').prop('checked')).toEqual(true);
    });

    it('clicks on an item in an open dropdown it triggers the selected items changed event', function () {
        var dropdown = $('#dropdown-events-selected-items-changed');
        var called = false;

        dropdown.dropdownlist();
        dropdown.on('dropdownlist.selectedItemsChanged', function () {
            called = true;
        });

        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.find('.select-item input').click();

        expect(called).toEqual(true);
    });
});