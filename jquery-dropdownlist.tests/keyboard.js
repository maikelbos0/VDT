/// <reference path="keyboard.html" />

describe('the keyboard', function () {
    function simulateKeydown(element, key) {
        var event = jQuery.Event("keydown");
        event.which = key;
        element.trigger(event);
    }

    let keyCodes = {
        ENTER: 13,
        ESCAPE: 27,
        SPACE: 32,
        ARROW_UP: 38,
        ARROW_DOWN: 40
    };

    it('enter key can be used to open the dropdown', function () {
        var dropdown = $('#dropdown-keyboard-enter-open');

        dropdown.dropdownlist();
        simulateKeydown(dropdown.closest('.dropdownlist').find('.dropdownlist-selector'), keyCodes.ENTER);

        expect(dropdown.closest('.dropdownlist-list').css('display')).not.toEqual('none');
    });

    it('space bar can be used to open the dropdown', function () {
        var dropdown = $('#dropdown-keyboard-space-open');

        dropdown.dropdownlist();
        simulateKeydown(dropdown.closest('.dropdownlist').find('.dropdownlist-selector'), keyCodes.SPACE);

        expect(dropdown.closest('.dropdownlist-list').css('display')).not.toEqual('none');
    });

    it('down arrow can be used to open the dropdown', function () {
        var dropdown = $('#dropdown-keyboard-down-open');

        dropdown.dropdownlist();
        simulateKeydown(dropdown.closest('.dropdownlist').find('.dropdownlist-selector'), keyCodes.ARROW_DOWN);

        expect(dropdown.closest('.dropdownlist-list').css('display')).not.toEqual('none');
    });

    it('enter key can be used to close the dropdown', function () {
        var dropdown = $('#dropdown-keyboard-enter-close');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        simulateKeydown(dropdown.closest('.dropdownlist').find('.dropdownlist-selector'), keyCodes.ENTER);

        expect(dropdown.closest('.dropdownlist-list').css('display')).toEqual('none');
    });

    it('space bar can be used to close the dropdown', function () {
        var dropdown = $('#dropdown-keyboard-space-close');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        simulateKeydown(dropdown.closest('.dropdownlist').find('.dropdownlist-selector'), keyCodes.SPACE);

        expect(dropdown.closest('.dropdownlist-list').css('display')).toEqual('none');
    });

    it('escape key can be used to close the dropdown', function () {
        var dropdown = $('#dropdown-keyboard-escape-close');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        simulateKeydown(dropdown.closest('.dropdownlist').find('.dropdownlist-selector'), keyCodes.ESCAPE);

        expect(dropdown.closest('.dropdownlist-list').css('display')).toEqual('none');
    });

    it('enter key can be used to select the active item', function () {
        var dropdown = $('#dropdown-keyboard-enter-select');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.find('.dropdownlist-list-item-active').removeClass('dropdownlist-list-item-active');
        dropdown.find('.select-item').addClass('dropdownlist-list-item-active');
        simulateKeydown(dropdown.closest('.dropdownlist'), keyCodes.ENTER);

        var fields = dropdown.find('input.dropdownlist-field');

        expect($(fields[0]).prop('checked')).toEqual(false);
        expect($(fields[1]).prop('checked')).toEqual(true);
        expect($(fields[2]).prop('checked')).toEqual(false);
    });

    it('space bar can be used to select the active item', function () {
        var dropdown = $('#dropdown-keyboard-space-select');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.find('.dropdownlist-list-item-active').removeClass('dropdownlist-list-item-active');
        dropdown.find('.select-item').addClass('dropdownlist-list-item-active');
        simulateKeydown(dropdown.closest('.dropdownlist'), keyCodes.SPACE);

        var fields = dropdown.find('input.dropdownlist-field');

        expect($(fields[0]).prop('checked')).toEqual(false);
        expect($(fields[1]).prop('checked')).toEqual(true);
        expect($(fields[2]).prop('checked')).toEqual(false);
    });

    it('escape key does not change the selection', function () {
        var dropdown = $('#dropdown-keyboard-escape-not-select');
        
        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.find('.dropdownlist-list-item-active').removeClass('dropdownlist-list-item-active');
        dropdown.find('.select-item').addClass('dropdownlist-list-item-active');
        simulateKeydown(dropdown.closest('.dropdownlist'), keyCodes.ESCAPE);

        var fields = dropdown.find('input.dropdownlist-field');

        expect($(fields[0]).prop('checked')).toEqual(true);
        expect($(fields[1]).prop('checked')).toEqual(false);
        expect($(fields[2]).prop('checked')).toEqual(false);
    });

    it('enter key closes a single-select dropdownlist when selecting', function () {
        var dropdown = $('#dropdown-keyboard-enter-single-select');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.find('.dropdownlist-list-item-active').removeClass('dropdownlist-list-item-active');
        dropdown.find('.select-item').addClass('dropdownlist-list-item-active');
        simulateKeydown(dropdown.closest('.dropdownlist'), keyCodes.ENTER);

        expect(dropdown.closest('.dropdownlist-list').css('display')).toEqual('none');
    });

    it('enter key does not close a multiselect dropdownlist when selecting', function () {
        var dropdown = $('#dropdown-keyboard-enter-multiselect');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.find('.dropdownlist-list-item-active').removeClass('dropdownlist-list-item-active');
        dropdown.find('.select-item').addClass('dropdownlist-list-item-active');
        simulateKeydown(dropdown.closest('.dropdownlist'), keyCodes.ENTER);

        expect(dropdown.closest('.dropdownlist-list').css('display')).not.toEqual('none');
    });

    it('enter key selects the active item when in the text search', function () {
        var dropdown = $('#dropdown-keyboard-search-enter-select');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.find('.dropdownlist-list-item-active').removeClass('dropdownlist-list-item-active');
        dropdown.find('.select-item').addClass('dropdownlist-list-item-active');
        simulateKeydown(dropdown.closest('.dropdownlist').find('.dropdownlist-search'), keyCodes.ENTER);

        var fields = dropdown.find('input.dropdownlist-field');

        expect($(fields[0]).prop('checked')).toEqual(false);
        expect($(fields[1]).prop('checked')).toEqual(true);
        expect($(fields[2]).prop('checked')).toEqual(false);
    });

    it('space key does not select the active item when in the text search', function () {
        var dropdown = $('#dropdown-keyboard-search-space-select');

        dropdown.dropdownlist();
        dropdown.closest('.dropdownlist').find('.dropdownlist-selector').click();
        dropdown.find('.dropdownlist-list-item-active').removeClass('dropdownlist-list-item-active');
        dropdown.find('.select-item').addClass('dropdownlist-list-item-active');
        simulateKeydown(dropdown.closest('.dropdownlist').find('.dropdownlist-search'), keyCodes.SPACE);

        var fields = dropdown.find('input.dropdownlist-field');

        expect($(fields[0]).prop('checked')).toEqual(true);
        expect($(fields[1]).prop('checked')).toEqual(false);
        expect($(fields[2]).prop('checked')).toEqual(false);
    });
});