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

    it('drags the slider it changes the step', function () {
        var slider = $('#slider-events-drag');
        var value;

        slider.width('100px');
        slider.rangeslider();
        triggerMouseEvent(slider.find('.rangeslider-thumb'), "mousedown", 50, 0);
        triggerMouseEvent(slider.find('.rangeslider-thumb'), "mousemove", 70, 0);

        slider.rangeslider(function (s) {
            value = s.getValue();
        })

        expect(value).toEqual(20);
    });

    it('drags the slider too far left it changes the step to 0', function () {
        var slider = $('#slider-events-drag-min');
        var value;

        slider.width('100px');
        slider.rangeslider();
        triggerMouseEvent(slider.find('.rangeslider-thumb'), "mousedown", 50, 0);
        triggerMouseEvent(slider.find('.rangeslider-thumb'), "mousemove", -150, 0);

        slider.rangeslider(function (s) {
            value = s.getValue();
        })

        expect(value).toEqual(0);
    });

    it('drags the slider too far right it changes the step to the step count', function () {
        var slider = $('#slider-events-drag-max');
        var value;

        slider.width('100px');
        slider.rangeslider();
        triggerMouseEvent(slider.find('.rangeslider-thumb'), "mousedown", 50, 0);
        triggerMouseEvent(slider.find('.rangeslider-thumb'), "mousemove", 150, 0);

        slider.rangeslider(function (s) {
            value = s.getValue();
        })

        expect(value).toEqual(100);
    });
});