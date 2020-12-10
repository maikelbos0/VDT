describe('rangeslider defaults', function () {
    $.fn.rangeslider.defaults.getValue = function () {
        return 30;
    };

    it('can be changed', function () {
        var slider = $('#rangeslider-defaults');

        slider.rangeslider();

        expect(slider.find('input').val()).toEqual('30');
    });

    it('can still be overridden in the options after being changed', function () {
        var slider = $('#rangeslider-defaults-override');

        slider.rangeslider({
            getValue: function () {
                return 50;
            }
        });

        expect(slider.find('input').val()).toEqual('50');
    });
});