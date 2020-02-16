describe('a basic datagridview', function () {
    it('can be created', function () {
        var grid = $('#basic-datagridview-created');

        expect(grid.length).toEqual(1);
        expect(function () {
            grid.datagridview({
                columns: []
            });
        }).not.toThrow();
        expect(grid.data('datagridview')).toBeTruthy();
    });

    it('hides the already present content', function () {
        var grid = $('#basic-datagridview-hides');

        grid.datagridview({
            columns: []
        });

        var hiddenContent = grid.find('.test-hidden');

        expect($(hiddenContent[0]).css('display')).toEqual('none');
        expect($(hiddenContent[1]).css('display')).toEqual('none');
    });

    it('will add a header', function () {
        var grid = $('#basic-datagridview-header');

        grid.datagridview({
            columns: []
        });
        expect(grid.find('.datagridview-header').length).toEqual(1);
    });

    it('will add a body', function () {
        var grid = $('#basic-datagridview-body');

        grid.datagridview({
            columns: []
        });
        expect(grid.find('.datagridview-body').length).toEqual(1);
    });

    it('will add a footer', function () {
        var grid = $('#basic-datagridview-footer');

        grid.datagridview({
            columns: []
        });
        expect(grid.find('.datagridview-footer').length).toEqual(1);
    });

    it('needs required option "columns"', function () {
        var grid = $('#basic-datagridview-columns-required');

        expect(grid.length).toEqual(1);
        expect(function () {
            grid.datagridview();
        }).toThrow('datagridview error: expected required option "columns"');
    });

    it('needs option "columns" to be an array', function () {
        var grid = $('#basic-datagridview-columns-array');

        expect(grid.length).toEqual(1);
        expect(function () {
            grid.datagridview({
                columns: 5
            });
        }).toThrow('datagridview error: expected option "columns" to be an array');
    });

    it('needs all items in "columns" to have property "data"', function () {
        var grid = $('#basic-datagridview-columns-item-data');

        expect(grid.length).toEqual(1);
        expect(function () {
            grid.datagridview({
                columns: [
                    { data: 'test' },
                    {}
                ]
            });
        }).toThrow('datagridview error: expected each item in option "columns" to have property "data"');
    });

    it('will add a header with the right header name', function () {
        var grid = $('#basic-datagridview-header-name');

        grid.datagridview({
            columns: [
                { data: 'test', header: 'Test column' }
            ]
        });
        expect(grid.find('.datagridview-header-cell').text()).toEqual('Test column');
    });

    it('will add a header with the data source as fallback', function () {
        var grid = $('#basic-datagridview-header-data');

        grid.datagridview({
            columns: [
                { data: 'test' }
            ]
        });
        expect(grid.find('.datagridview-header-cell').text()).toEqual('test');
    });

    it('will add data when populating', function () {
        var grid = $('#basic-datagridview-data');

        grid.datagridview({
            columns: [
                { data: 'test' }
            ]
        }, function () {
            this.populate(null, [
                { test: 'Test 1' },
                { test: 'Test 2' },
            ]);
        });

        expect(grid.find('.datagridview-body > .datagridview-row:first-child > div').text()).toEqual('Test 1');
        expect(grid.find('.datagridview-body > .datagridview-row:nth-child(2) > div').text()).toEqual('Test 2');
    });

    it('will add totals when provided', function () {
        var grid = $('#basic-datagridview-totals');

        grid.datagridview({
            columns: [
                { data: 'test' },
                { data: 'value' }
            ]
        }, function () {
            this.populate(null, [
                { test: 'Test 1', value: 1 },
                { test: 'Test 2', value: 2 },
            ], { test: 'Test', value: 3 });
        });

        expect(grid.find('.datagridview-body > .datagridview-total-row > div:first-child').text()).toEqual('Test');
        expect(grid.find('.datagridview-body > .datagridview-total-row > div:nth-child(2)').text()).toEqual('3');
    });

    it('will omit total row when not provided', function () {
        var grid = $('#basic-datagridview-no-totals');

        grid.datagridview({
            columns: [
                { data: 'test' },
                { data: 'value' }
            ]
        }, function () {
            this.populate(null, [
                { test: 'Test 1', value: 1 },
                { test: 'Test 2', value: 2 },
            ]);
        });

        expect(grid.find('.datagridview-body > .datagridview-total-row').length).toEqual(0);
    });
});