describe('when a user', function () {
    function triggerMouseEvent(element, eventType, pageX, offsetX) {
        var event = jQuery.Event(eventType);
        event.which = 1;
        event.pageX = pageX;
        event.offsetX = offsetX;

        $(element).trigger(event);
    }

    it('clicks on the slider it changes value', function () {
        var slider = $('#slider-events-click');
        var value;

        slider.width('100px');
        slider.rangeslider();
        triggerMouseEvent(slider, "click", 0, 50);

        slider.rangeslider(function (s) {
            value = s.getValue();
        })

        expect(value).toEqual(50);
    });
});