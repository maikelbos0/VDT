describe('dropdownlist defaults', function () {
    $.fn.dropdownlist.defaults.getFieldName = function () {
        return 'field';
    };

    it('can be changed', function () {
        $('#dropdown-defaults').dropdownlist();

        var fields = $('#dropdown-defaults input.dropdownlist-field');

        expect(fields.length).toBeGreaterThan(0);
        
        fields.each(function () {
            expect($(this).prop('name')).toEqual('field');
        });
    });

    it('can still be overridden in the options after being changed', function () {
        $('#dropdown-defaults-override').dropdownlist({
            getFieldName: function () {
                return 'field-override';
            }
        });

        var fields = $('#dropdown-defaults-override input.dropdownlist-field');

        expect(fields.length).toBeGreaterThan(0);
        
        fields.each(function () {
            expect($(this).prop('name')).toEqual('field-override');
        });
    });
});