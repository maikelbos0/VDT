describe('datagridview sorting', function () {
    function triggerMouseup(element) {
        var event = jQuery.Event("mouseup");
        event.which = 1;

        $(element).trigger(event);
    }

    it('gets triggered when clicking a header', function () {
        var grid = $('#sorting-basic');
        var called = false;

        grid.datagridview({
            columns: [
                { data: 'column' },
                { data: 'test' }
            ]
        });

        grid.on('datagridview.sorted', function () {
            called = true;
        });

        triggerMouseup(grid.find('.datagridview-header-cell-sortable'));

        expect(called).toEqual(true);
    });

    it('sorts ascending when sorting on a column', function () {
        var grid = $('#sorting-ascending');
        var metaData;

        grid.datagridview({
            columns: [
                { data: 'column' },
                { data: 'test' }
            ]
        });

        grid.on('datagridview.sorted', function (event, mData) {
            metaData = mData;
        });
        
        triggerMouseup(grid.find('.datagridview-header-cell-sortable')[0]);

        expect(metaData.sortColumn).toEqual('column');
        expect(metaData.sortDescending).toEqual(false);
    });

    it('sorts descending when sorting again on the same column', function () {
        var grid = $('#sorting-descending');
        var metaData;

        grid.datagridview({
            columns: [
                { data: 'column' },
                { data: 'test' }
            ]
        });

        grid.on('datagridview.sorted', function (event, mData) {
            metaData = mData;
            $(this).datagridview(function () {
                this.populate(mData, []);
            });
        });

        triggerMouseup(grid.find('.datagridview-header-cell-sortable')[0]);
        triggerMouseup(grid.find('.datagridview-header-cell-sortable')[0]);

        expect(metaData.sortColumn).toEqual('column');
        expect(metaData.sortDescending).toEqual(true);
    });

    it('sorts ascending when sorting again on a different column', function () {
        var grid = $('#sorting-next-ascending');
        var metaData;

        grid.datagridview({
            columns: [
                { data: 'column' },
                { data: 'test' }
            ]
        });

        grid.on('datagridview.sorted', function (event, mData) {
            metaData = mData;
            $(this).datagridview(function () {
                this.populate(mData, []);
            });
        });

        triggerMouseup(grid.find('.datagridview-header-cell-sortable')[0]);
        triggerMouseup(grid.find('.datagridview-header-cell-sortable')[1]);

        expect(metaData.sortColumn).toEqual('test');
        expect(metaData.sortDescending).toEqual(false);
    });

    it('can be provided with a sort-column that is not the data-column', function () {
        var grid = $('#sorting-sort-column');
        var metaData;

        grid.datagridview({
            columns: [
                { data: 'column', sortData: 'source-column' },
                { data: 'test' }
            ]
        });

        grid.on('datagridview.sorted', function (event, mData) {
            metaData = mData;
        });

        triggerMouseup(grid.find('.datagridview-header-cell-sortable')[0]);

        expect(metaData.sortColumn).toEqual('source-column');
    });

    it('can be disabled for a specific column', function () {
        var grid = $('#sorting-disabled');
        var metaData;

        grid.datagridview({
            columns: [
                { data: 'column', sortable: false },
                { data: 'test' }
            ]
        });

        grid.on('datagridview.sorted', function (event, mData) {
            metaData = mData;
        });

        triggerMouseup(grid.find('.datagridview-header-cell-sortable')[0]);

        expect(metaData.sortColumn).toEqual('test');
    });

    it('creates a sort toggle in the right column after sorting', function () {
        var grid = $('#sorting-toggle');

        grid.datagridview({
            columns: [
                { data: 'column' },
                { data: 'test' }
            ]
        });

        grid.on('datagridview.sorted', function (event, mData) {
            $(this).datagridview(function () {
                this.populate(mData, []);
            });
        });

        triggerMouseup(grid.find('.datagridview-header-cell-sortable')[1]);

        var toggleLocation = grid.find('.datagridview-header-cell-sortable:nth-child(2)').first();
        var toggle = toggleLocation.find('.datagridview-sort-toggle');

        expect(toggle.length).toEqual(1);
        expect(toggle.hasClass('datagridview-sort-toggle-ascending')).toEqual(true);
        expect(toggle.hasClass('datagridview-sort-toggle-descending')).toEqual(false);
    });

    it('creates a descending sort toggle in the right column after sorting descending', function () {
        var grid = $('#sorting-toggle-descending');

        grid.datagridview({
            columns: [
                { data: 'column' },
                { data: 'test' }
            ]
        });

        grid.on('datagridview.sorted', function (event, mData) {
            $(this).datagridview(function () {
                this.populate(mData, []);
            });
        });

        triggerMouseup(grid.find('.datagridview-header-cell-sortable')[1]);
        triggerMouseup(grid.find('.datagridview-header-cell-sortable')[1]);

        var toggleLocation = grid.find('.datagridview-header-cell-sortable:nth-child(2)').first();
        var toggle = toggleLocation.find('.datagridview-sort-toggle');

        expect(toggle.length).toEqual(1);
        expect(toggle.hasClass('datagridview-sort-toggle-descending')).toEqual(true);
        expect(toggle.hasClass('datagridview-sort-toggle-ascending')).toEqual(false);
    });
});