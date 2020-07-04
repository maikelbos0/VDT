describe('populating a datagridview', function () {
    it('resets the select all checkbox if present', function () {
        var grid = $('#populating-datagridview-select-all');

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

        grid.find('.datagridview-header input').click();

        expect(grid.find('.datagridview-header input').is(':checked')).toEqual(true);

        grid.datagridview(function () {
            this.populate(null, [
                { test: 'Test 1' },
                { test: 'Test 2' },
            ]);
        });

        expect(grid.find('.datagridview-header input').is(':checked')).toEqual(false);
    });

    it('renders zeroes correctly', function () {
        var grid = $('#populating-datagridview-zero');

        grid.datagridview({
            columns: [
                { data: 'test' }
            ]
        }, function () {
            this.populate(null, [
                { test: '0' },
                { test: 0 },
            ]);
        });

        expect(grid.find('.datagridview-body > .datagridview-row:first-child > div').text()).toEqual('0');
        expect(grid.find('.datagridview-body > .datagridview-row:nth-child(2) > div').text()).toEqual('0');
    });
});