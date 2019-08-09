/// <reference path="paging.html" />

describe('datagridview paging', function () {
    function triggerMouseup(element) {
        var event = jQuery.Event("mouseup");
        event.which = 1;

        $(element).trigger(event);
    }

    /*
    function generateData(dataRow, length) {
        var data = new Array()
        Array(15).fill()
    }
    */

    $.fn.datagridview.defaults.getFooterPlugins = function () {
        return [
            $.fn.datagridview.footerPlugins.displayBasic,
            $.fn.datagridview.footerPlugins.displayFull,
            $.fn.datagridview.footerPlugins.prevNext,
            $.fn.datagridview.footerPlugins.pageInput,
            $.fn.datagridview.footerPlugins.pageSizeInput
        ];
    }

    /*
    $.fn.datagridview.footerPlugins.custom = function (footerElement, metaData, datagridview) {
    }
    */

    it('elements get added', function () {
        var grid = $('#paging-element');

        grid.datagridview({ columns: [] });

        expect(grid.find('.datagridview-footer').length).toEqual(1);
        expect(grid.find('.datagridview-footer .datagridview-footer-element').length).toEqual(5);
    });

    it('elements have access to the meta data', function () {
        var grid = $('#paging-access-meta-data');
        var mData;

        grid.datagridview({
            columns: [],
            getFooterPlugins: function () {
                return [
                    function (footerElement, metaData, datagridview) {
                        mData = metaData;
                    }
                ]
            }
        });

        expect(mData).not.toEqual(null);
        expect(mData instanceof DataGridViewMetaData).toEqual(true);
    });

    it('elements have access to the datagridview', function () {
        var grid = $('#paging-access-grid');
        var datagrid;

        grid.datagridview({
            columns: [],
            getFooterPlugins: function () {
                return [
                    function (footerElement, metaData, datagridview) {
                        datagrid = datagridview;
                    }
                ]
            }
        });

        expect(datagrid).not.toEqual(null);
        expect(datagrid.element).toEqual(grid);
    });

    it('elements have access to the footer element', function () {
        var grid = $('#paging-access-element');
        var footer;

        grid.datagridview({
            columns: [],
            getFooterPlugins: function () {
                return [
                    function (footerElement, metaData, datagridview) {
                        footer = footerElement;
                    }
                ]
            }
        });

        expect(footer).not.toEqual(null);
        expect(footer.hasClass('datagridview-footer-element')).toEqual(true);
    });

    it('basic display contains the right information', function () {
        var grid = $('#paging-basic-display');

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 156, 25, 2);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.displayBasic
                ];
            }
        });

        expect(grid.find('.datagridview-footer-element').text()).toEqual('Page 3 of 7');
    });

    it('extended display contains the right information', function () {
        var grid = $('#paging-extended-display');

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 156, 25, 2);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.displayFull
                ];
            }
        });

        expect(grid.find('.datagridview-footer-element').text()).toEqual('Page 3 of 7, rows 51 to 75 of 156');
    });

    it('prev-next contains buttons for first and previous', function () {
        fail();
    });

    it('prev-next buttons for first and previous are disabled on first page', function () {
        fail();
    });

    it('prev-next buttons for first and previous are enabled on second page', function () {
        fail();
    });

    it('prev-next buttons for first triggers request for first page', function () {
        fail();
    });

    it('prev-next buttons for previous triggers request for previous page', function () {
        fail();
    });

    it('prev-next contains buttons for last and next', function () {
        fail();
    });

    it('prev-next buttons for last and next are disabled on last page', function () {
        fail();
    });

    it('prev-next buttons for last and next are enabled on second to page', function () {
        fail();
    });

    it('prev-next buttons for last triggers request for last page', function () {
        fail();
    });

    it('prev-next buttons for next triggers request for next page', function () {
        fail();
    });

    it('prev-next contains buttons for specific pages', function () {
        fail();
    });

    it('prev-next button for current page is disabled', function () {
        fail();
    });

    it('prev-next button for all pages except current page are enabled', function () {
        fail();
    });

    it('prev-next button for page 3 triggers request for page 3', function () {
        fail();
    });

    it('prev-next button for page 3 triggers request with same page size', function () {
        fail();
    });

    it('page input contains the right elements', function () {
        fail();
    });

    it('page input for page 3 triggers request for page 3', function () {
        fail();
    });

    it('page size input contains the right elements', function () {
        fail();
    });

    it('page size input for page size 50 triggers request for same page with page size 50', function () {
        fail();
    });
});