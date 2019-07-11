/// <reference path="Interaction.html" />

describe('a dropdownlist object', function () {
    it('is returned in the callback', function () {
        var called = false;

        $('#dropdown-interaction-1').dropdownlist({}, function () {
            called = true;
        });

        expect(called).toEqual(true);
    });

    it('is returned in the callback if it\'s the first argument of the create function', function () {
        var called = false;

        $('#dropdown-interaction-1').dropdownlist(function () {
            called = true;
        });

        expect(called).toEqual(true);
    });

    it('is given in the callback of the extension function when creating a dropdown', function () {
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
});