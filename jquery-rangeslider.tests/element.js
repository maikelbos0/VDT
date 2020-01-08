describe('creating an element for rangeslider', function () {
    it('succeeds', function () {
        var slider = $('#element-succeeds');
        var element;

        slider.rangeslider(function () {
            element = this.createElement('<div>', 'rangeslider');
        });

        expect(element.prop('tagName')).toEqual('DIV');
        expect(element.hasClass('rangeslider')).toEqual(true);
    });

    it('succeeds with attributes', function () {
        var slider = $('#element-attributes');
        var element;

        slider.rangeslider(function () {
            element = this.createElement('<div>', 'rangeslider', { id: 'test', value: 'value' });
        });

        expect(element.attr('id')).toEqual('test');
        expect(element.attr('value')).toEqual('value');
    });

    it('succeeds with multiple attributes objects', function () {
        var slider = $('#element-attributes-multiple');
        var element;

        slider.rangeslider(function () {
            element = this.createElement('<div>', 'rangeslider', { id: 'test', value: 'value' }, { id: 'test2' });
        });

        expect(element.attr('id')).toEqual('test2');
        expect(element.attr('value')).toEqual('value');
    });

    it('class always gets added', function () {
        var slider = $('#element-attributes-class');
        var element;

        slider.rangeslider(function () {
            element = this.createElement('<div>', 'rangeslider', { class: 'form-control' });
        });

        expect(element.hasClass('rangeslider')).toEqual(true);
        expect(element.hasClass('form-control')).toEqual(true);
    });
});