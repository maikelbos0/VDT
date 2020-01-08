describe('creating an element for dropdownlist', function () {
    it('succeeds', function () {
        var dropdown = $('#element-succeeds');
        var element;

        dropdown.dropdownlist(function () {
            element = this.createElement('<div>', 'dropdownlist');
        });

        expect(element.prop('tagName')).toEqual('DIV');
        expect(element.hasClass('dropdownlist')).toEqual(true);
    });

    it('succeeds with attributes', function () {
        var dropdown = $('#element-attributes');
        var element;

        dropdown.dropdownlist(function () {
            element = this.createElement('<div>', 'dropdownlist', { id: 'test', value: 'value' });
        });

        expect(element.attr('id')).toEqual('test');
        expect(element.attr('value')).toEqual('value');
    });

    it('succeeds with multiple attributes objects', function () {
        var dropdown = $('#element-attributes-multiple');
        var element;

        dropdown.dropdownlist(function () {
            element = this.createElement('<div>', 'dropdownlist', { id: 'test', value: 'value' }, { id: 'test2' });
        });

        expect(element.attr('id')).toEqual('test2');
        expect(element.attr('value')).toEqual('value');
    });

    it('class always gets added', function () {
        var dropdown = $('#element-attributes-class');
        var element;

        dropdown.dropdownlist(function () {
            element = this.createElement('<div>', 'dropdownlist', { class: 'form-control' });
        });

        expect(element.hasClass('dropdownlist')).toEqual(true);
        expect(element.hasClass('form-control')).toEqual(true);
    });
    
    it('for selector always has the right tabindex', function () {
        var dropdown = $('#element-attributes-selector-tabindex');

        dropdown.dropdownlist({
            getSelectorAttributes: function () {
                return { tabindex: '5' };
            }
        });

        expect(dropdown.closest('.dropdownlist').find('.dropdownlist-selector').attr('tabindex')).toEqual('0');
    });

    it('for input elements always has the right tabindex', function () {
        var dropdown = $('#element-attributes-input-tabindex');

        dropdown.dropdownlist({
            getInputAttributes: function () {
                return { tabindex: '0' };
            }
        });

        var fields = dropdown.find('input.dropdownlist-field');

        expect($(fields[0]).attr('tabindex')).toEqual('-1');
        expect($(fields[1]).attr('tabindex')).toEqual('-1');
        expect($(fields[2]).attr('tabindex')).toEqual('-1');
        expect($(fields[3]).attr('tabindex')).toEqual('-1');
    });

    it('for input elements always has the right type', function () {
        var dropdown = $('#element-attributes-input-type');

        dropdown.dropdownlist({
            getInputAttributes: function () {
                return { type: 'radio' };
            }
        });

        var fields = dropdown.find('input.dropdownlist-field');

        expect($(fields[0]).attr('type')).toEqual('checkbox');
        expect($(fields[1]).attr('type')).toEqual('checkbox');
        expect($(fields[2]).attr('type')).toEqual('checkbox');
        expect($(fields[3]).attr('type')).toEqual('checkbox');
    });
});