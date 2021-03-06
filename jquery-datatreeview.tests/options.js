﻿describe('a datatreeview option', function () {
    it('can be provided for getValueProperty', function () {
        var tree = $('#datatreeview-options-value-property');
        
        tree.datatreeview({
            data: [{
                value: '1',
                data: '2',
                text: 'Test'
            }],
            getValueProperty: function () {
                return 'data';
            }
        });

        expect(tree.find('input').val()).toEqual('2');
    });

    it('can be provided for getTextProperty', function () {
        var tree = $('#datatreeview-options-text-property');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'Test',
                content: 'Foo'
            }],
            getTextProperty: function () {
                return 'content';
            }
        });

        expect(tree.find('li').text()).toEqual('Foo');
    });

    it('can be provided for getSelectedProperty', function () {
        var tree = $('#datatreeview-options-selected-property');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'Test',
                isChecked: true
            }],
            getSelectedProperty: function () {
                return 'isChecked';
            }
        });

        expect(tree.find('input').is(':checked')).toEqual(true);
    });

    it('can be provided for getChildrenProperty', function () {
        var tree = $('#datatreeview-options-children-property');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'Test',
                nodes: [{
                    value: '2',
                    text: 'Foo'
                },
                {
                    value: '3',
                    text: 'Bar'
                }]
            }],
            getChildrenProperty: function () {
                return 'nodes';
            }
        });

        expect(tree.find('li li').length).toEqual(2);
    });

    it('can be provided for getFieldName', function () {
        var tree = $('#datatreeview-options-field-name');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'Test'
            }],
            getFieldName: function () {
                return 'field';
            }
        });

        expect(tree.find('input').prop('name')).toEqual('field');
    });

    it('can be provided for hasFreehandSelection', function () {
        var tree = $('#datatreeview-options-freehand-selection');
        var hasFreehandSelection;

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'Test'
            }],
            hasFreehandSelection: function () {
                return true;
            }
        },
        function () {
            hasFreehandSelection = this.hasFreehandSelection;
        });

        expect(hasFreehandSelection).toEqual(true);
    });

    it('can be provided for getToggleOptions', function () {
        var tree = $('#datatreeview-options-toggle');
        var options;

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'Test',
                children: [
                    { value: '2', text: 'Foo' },
                    { value: '3', text: 'Bar' },
                ]
            }],
            getToggleOptions: function () {
                return {
                    duration: 600,
                    easing: 'linear'
                };
            }
        },
        function () {
            options = this.toggleOptions;
        });

        expect(options).toEqual({
            duration: 600,
            easing: 'linear'
        });

        tree.find('.datatreeview-toggler').click();

        expect(tree.find('li > ul').css('display')).not.toEqual('none');
    });

    it('can be provided for isCollapsed', function () {
        var tree = $('#datatreeview-options-collapsed');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'Test',
                children: [
                    { value: '2', text: 'Foo' },
                    { value: '3', text: 'Bar' },
                ]
            }],
            isCollapsed: function () {
                return true;
            }
        });

        expect(tree.find('li > ul').css('display')).toEqual('none');
        expect(tree.find('li').hasClass('datatreeview-node-collapsed')).toEqual(true);
    });

    it('can be provided for getListAttributes', function () {
        var tree = $('#datatreeview-options-list-attributes');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'Test',
                children: [
                    { value: '2', text: 'Foo' },
                    { value: '3', text: 'Bar' },
                ]
            }],
            getListAttributes: function () {
                return { class: 'test' };
            }
        });

        tree.find('ul').each(function () {
            expect($(this).hasClass('test')).toEqual(true);
        });
    });

    it('can be provided for getNodeAttributes', function () {
        var tree = $('#datatreeview-options-node-attributes');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'Test',
                children: [
                    { value: '2', text: 'Foo' },
                    { value: '3', text: 'Bar' },
                ]
            }],
            getNodeAttributes: function () {
                return { class: 'test' };
            }
        });

        tree.find('li').each(function () {
            expect($(this).hasClass('test')).toEqual(true);
        });
    });

    it('can be provided for getNodeContentAttributes', function () {
        var tree = $('#datatreeview-options-node-content-attributes');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'Test',
                children: [
                    { value: '2', text: 'Foo' },
                    { value: '3', text: 'Bar' },
                ]
            }],
            getNodeContentAttributes: function () {
                return { class: 'test' };
            }
        });

        tree.find('.datatreeview-node-content').each(function () {
            expect($(this).hasClass('test')).toEqual(true);
        });
    });

    it('can be provided for getInputAttributes', function () {
        var tree = $('#datatreeview-options-input-attributes');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'Test',
                children: [
                    { value: '2', text: 'Foo' },
                    { value: '3', text: 'Bar' },
                ]
            }],
            getInputAttributes: function () {
                return { class: 'test' };
            }
        });

        tree.find('input').each(function () {
            expect($(this).hasClass('test')).toEqual(true);
        });
    });

    it('can be provided for getLabelAttributes', function () {
        var tree = $('#datatreeview-options-label-attributes');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'Test',
                children: [
                    { value: '2', text: 'Foo' },
                    { value: '3', text: 'Bar' },
                ]
            }],
            getLabelAttributes: function () {
                return { class: 'test' };
            }
        });

        tree.find('label').each(function () {
            expect($(this).hasClass('test')).toEqual(true);
        });
    });

    it('can be provided for getTogglerAttributes', function () {
        var tree = $('#datatreeview-options-toggler-attributes');

        tree.datatreeview({
            data: [{
                value: '1',
                text: 'Test',
                children: [
                    { value: '2', text: 'Foo' },
                    { value: '3', text: 'Bar' },
                ]
            }],
            getTogglerAttributes: function () {
                return { class: 'test' };
            }
        });

        tree.find('.datatreeview-toggler').each(function () {
            expect($(this).hasClass('test')).toEqual(true);
        });
    });
});