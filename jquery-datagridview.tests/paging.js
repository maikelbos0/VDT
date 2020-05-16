describe('datagridview paging', function () {
    $.fn.datagridview.defaults.getFooterPlugins = function () {
        return [
            $.fn.datagridview.footerPlugins.displayBasic,
            $.fn.datagridview.footerPlugins.displayFull,
            $.fn.datagridview.footerPlugins.prevNext,
            $.fn.datagridview.footerPlugins.pageInput,
            $.fn.datagridview.footerPlugins.pageSizeInput
        ];
    }

    function triggerKeyboardEvent(element, eventType, key) {
        var event = jQuery.Event(eventType);
        event.which = key;
        element.trigger(event);
    }

    let keyCodes = {
        ENTER: 13
    };

    it('elements get added', function () {
        var grid = $('#paging-element');

        grid.datagridview({ columns: [] });

        expect(grid.find('.datagridview-footer').length).toEqual(1);
        expect(grid.find('.datagridview-footer .datagridview-footer-element').length).toEqual(5);
    });

    it('elements have access to the meta data', function () {
        var grid = $('#paging-access-meta-data');
        var mData = null;

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
        var grid = $('#paging-prev-next-first-previous');

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 156, 25, 2);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.prevNext
                ];
            }
        });

        expect(grid.find('.datagridview-footer-element button.datagridview-paging-first').length).toEqual(1);
        expect(grid.find('.datagridview-footer-element button.datagridview-paging-prev').length).toEqual(1);
    });

    it('prev-next buttons for first and previous are disabled on first page', function () {
        var grid = $('#paging-prev-next-first-previous-disabled');

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 156, 25, 0);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.prevNext
                ];
            }
        });

        expect(grid.find('.datagridview-footer-element button.datagridview-paging-first').prop('disabled')).toEqual(true);
        expect(grid.find('.datagridview-footer-element button.datagridview-paging-prev').prop('disabled')).toEqual(true);
    });

    it('prev-next buttons for first and previous are enabled on second page', function () {
        var grid = $('#paging-prev-next-first-previous-enabled');

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 156, 25, 1);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.prevNext
                ];
            }
        });

        expect(grid.find('.datagridview-footer-element button.datagridview-paging-first').prop('disabled')).toEqual(false);
        expect(grid.find('.datagridview-footer-element button.datagridview-paging-prev').prop('disabled')).toEqual(false);
    });

    it('prev-next buttons for first triggers request for first page', function () {
        var grid = $('#paging-prev-next-first-event');
        var mData = null;

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 156, 25, 2);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.prevNext
                ];
            }
        });

        grid.on('datagridview.paged', function (e, metaData) {
            mData = metaData;
        });

        grid.find('.datagridview-footer-element .datagridview-paging-first').click();

        expect(mData).not.toEqual(null);
        expect(mData.page).toEqual(0);
    });

    it('prev-next buttons for previous triggers request for previous page', function () {
        var grid = $('#paging-prev-next-prev-event');
        var mData = null;

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 156, 25, 2);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.prevNext
                ];
            }
        });

        grid.on('datagridview.paged', function (e, metaData) {
            mData = metaData;
        });

        grid.find('.datagridview-footer-element .datagridview-paging-prev').click();

        expect(mData).not.toEqual(null);
        expect(mData.page).toEqual(1);
    });

    it('prev-next contains buttons for last and next', function () {
        var grid = $('#paging-prev-next-next-last');

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 156, 25, 2);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.prevNext
                ];
            }
        });

        expect(grid.find('.datagridview-footer-element button.datagridview-paging-next').length).toEqual(1);
        expect(grid.find('.datagridview-footer-element button.datagridview-paging-last').length).toEqual(1);
    });

    it('prev-next buttons for last and next are disabled on last page', function () {
        var grid = $('#paging-prev-next-next-last-disabled');

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 156, 25, 6);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.prevNext
                ];
            }
        });

        expect(grid.find('.datagridview-footer-element button.datagridview-paging-next').prop('disabled')).toEqual(true);
        expect(grid.find('.datagridview-footer-element button.datagridview-paging-last').prop('disabled')).toEqual(true);
    });

    it('prev-next buttons for last and next are enabled on second to last page', function () {
        var grid = $('#paging-prev-next-next-last-enabled');

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 156, 25, 5);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.prevNext
                ];
            }
        });

        expect(grid.find('.datagridview-footer-element button.datagridview-paging-next').prop('disabled')).toEqual(false);
        expect(grid.find('.datagridview-footer-element button.datagridview-paging-last').prop('disabled')).toEqual(false);
    });

    it('prev-next buttons for last triggers request for last page', function () {
        var grid = $('#paging-prev-next-last-event');
        var mData = null;

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 156, 25, 2);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.prevNext
                ];
            }
        });

        grid.on('datagridview.paged', function (e, metaData) {
            mData = metaData;
        });

        grid.find('.datagridview-footer-element .datagridview-paging-last').click();

        expect(mData).not.toEqual(null);
        expect(mData.page).toEqual(6);
    });

    it('prev-next buttons for next triggers request for next page', function () {
        var grid = $('#paging-prev-next-next-event');
        var mData = null;

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 156, 25, 2);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.prevNext
                ];
            }
        });

        grid.on('datagridview.paged', function (e, metaData) {
            mData = metaData;
        });

        grid.find('.datagridview-footer-element .datagridview-paging-next').click();

        expect(mData).not.toEqual(null);
        expect(mData.page).toEqual(3);
    });

    it('prev-next contains buttons for specific pages', function () {
        var grid = $('#paging-prev-next-buttons');

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 156, 25, 2);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.prevNext
                ];
            }
        });

        expect(grid.find('.datagridview-footer-element button.datagridview-paging-page').length).toEqual(7);
    });

    it('prev-next button for current page is disabled', function () {
        var grid = $('#paging-prev-next-buttons-current');

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 156, 25, 2);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.prevNext
                ];
            }
        });

        expect(grid.find('.datagridview-footer-element button.datagridview-paging-page:nth-child(3)').prop('disabled')).not.toEqual(true);
    });

    it('prev-next button for all pages except current page are enabled', function () {
        var grid = $('#paging-prev-next-buttons-enabled');

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 156, 25, 2);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.prevNext
                ];
            }
        });

        var buttons = grid.find('.datagridview-footer-element button.datagridview-paging-page');

        expect($(buttons[0]).prop('disabled')).toEqual(false);
        expect($(buttons[1]).prop('disabled')).toEqual(false);
        expect($(buttons[3]).prop('disabled')).toEqual(false);
        expect($(buttons[4]).prop('disabled')).toEqual(false);
        expect($(buttons[5]).prop('disabled')).toEqual(false);
        expect($(buttons[6]).prop('disabled')).toEqual(false);
    });

    it('prev-next button for page 3 triggers request for page 3', function () {
        var grid = $('#paging-prev-next-page-request');
        var mData = null;

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 156, 25, 0);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.prevNext
                ];
            }
        });

        grid.on('datagridview.paged', function (e, metaData) {
            mData = metaData;
        });

        $(grid.find('.datagridview-footer-element .datagridview-paging-page')[2]).click();

        expect(mData).not.toEqual(null);
        expect(mData.page).toEqual(2);
    });

    it('prev-next button for page 3 triggers request with same page size', function () {
        var grid = $('#paging-prev-next-page-size');
        var mData = null;

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 156, 25, 0);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.prevNext
                ];
            }
        });

        grid.on('datagridview.paged', function (e, metaData) {
            mData = metaData;
        });

        $(grid.find('.datagridview-footer-element .datagridview-paging-page')[2]).click();

        expect(mData).not.toEqual(null);
        expect(mData.rowsPerPage).toEqual(25);
    });

    it('prev-next contains button for plus 5 when needed', function () {
        var grid = $('#paging-prev-next-plus-5');

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 126, 25, 0);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.prevNext
                ];
            }
        });

        expect(grid.find('.datagridview-footer-element button.datagridview-paging-plus-5').length).toEqual(1);
    });

    it('prev-next contains button for minus 5 when needed', function () {
        var grid = $('#paging-prev-next-minus-5');

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 126, 25, 5);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.prevNext
                ];
            }
        });

        expect(grid.find('.datagridview-footer-element button.datagridview-paging-minus-5').length).toEqual(1);
    });

    it('prev-next button for plus 5 is removed when not needed', function () {
        var grid = $('#paging-prev-next-plus-5-invisible');

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 125, 25, 0);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.prevNext
                ];
            }
        });

        expect(grid.find('.datagridview-footer-element button.datagridview-paging-plus-5').length).toEqual(0);
    });

    it('prev-next button for minus 5 is removed when not needed', function () {
        var grid = $('#paging-prev-next-minus-5-invisible');

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 125, 25, 4);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.prevNext
                ];
            }
        });

        expect(grid.find('.datagridview-footer-element button.datagridview-paging-minus-5').length).toEqual(0);
    });

    it('prev-next button for plus 5 from page 1 triggers request for page 6', function () {
        var grid = $('#paging-prev-next-plus-5-request');
        var mData = null;

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 156, 25, 0);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.prevNext
                ];
            }
        });

        grid.on('datagridview.paged', function (e, metaData) {
            mData = metaData;
        });

        $(grid.find('.datagridview-footer-element .datagridview-paging-plus-5')).click();

        expect(mData).not.toEqual(null);
        expect(mData.page).toEqual(5);
    });

    it('prev-next button for minus 5 from page 11 triggers request for page 6', function () {
        var grid = $('#paging-prev-next-minus-5-request');
        var mData = null;

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 256, 25, 10);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.prevNext
                ];
            }
        });

        grid.on('datagridview.paged', function (e, metaData) {
            mData = metaData;
        });

        $(grid.find('.datagridview-footer-element .datagridview-paging-minus-5')).click();

        expect(mData).not.toEqual(null);
        expect(mData.page).toEqual(5);
    });

    it('page input contains the right elements', function () {
        var grid = $('#paging-page');

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 156, 25, 2);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.pageInput
                ];
            }
        });

        expect(grid.find('.datagridview-footer-element span.datagridview-paging-page-label').length).toEqual(1);
        expect(grid.find('.datagridview-footer-element input.datagridview-paging-page').length).toEqual(1);
        expect(grid.find('.datagridview-footer-element button.datagridview-paging-go').length).toEqual(1);
    });

    it('page input for page 3 triggers request for page 3', function () {
        var grid = $('#paging-page-request');
        var mData = null;

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 156, 25, 0);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.pageInput
                ];
            }
        });

        grid.on('datagridview.paged', function (e, metaData) {
            mData = metaData;
        });

        grid.find('.datagridview-footer-element input.datagridview-paging-page').val(3);
        grid.find('.datagridview-footer-element .datagridview-paging-go').click();

        expect(mData).not.toEqual(null);
        expect(mData.page).toEqual(2);
    });

    it('page input triggers on enter', function () {
        var grid = $('#paging-page-enter');
        var mData = null;

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 156, 25, 0);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.pageInput
                ];
            }
        });

        grid.on('datagridview.paged', function (e, metaData) {
            mData = metaData;
        });

        grid.find('.datagridview-footer-element input.datagridview-paging-page').val(3);
        triggerKeyboardEvent(grid.find('.datagridview-footer-element input.datagridview-paging-page'), 'keydown', keyCodes.ENTER);

        expect(mData).not.toEqual(null);
        expect(mData.page).toEqual(2);
    })

    it('page size input contains the right elements', function () {
        var grid = $('#paging-page-size');

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 156, 25, 2);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.pageSizeInput
                ];
            }
        });

        expect(grid.find('.datagridview-footer-element span.datagridview-paging-page-size-label').length).toEqual(1);
        expect(grid.find('.datagridview-footer-element input.datagridview-paging-page-size').length).toEqual(1);
        expect(grid.find('.datagridview-footer-element button.datagridview-paging-go').length).toEqual(1);
    });

    it('page size input for page size 50 triggers request for same page with page size 50', function () {
        var grid = $('#paging-page-size-request');
        var mData = null;

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 156, 25, 0);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.pageSizeInput
                ];
            }
        });

        grid.on('datagridview.paged', function (e, metaData) {
            mData = metaData;
        });

        grid.find('.datagridview-footer-element input.datagridview-paging-page-size').val(50);
        grid.find('.datagridview-footer-element .datagridview-paging-go').click();

        expect(mData).not.toEqual(null);
        expect(mData.page).toEqual(0);
        expect(mData.rowsPerPage).toEqual(50);
    });

    it('page size triggers on enter', function () {
        var grid = $('#paging-page-size-enter');
        var mData = null;

        grid.datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData(null, false, 156, 25, 0);
            },
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.pageSizeInput
                ];
            }
        });

        grid.on('datagridview.paged', function (e, metaData) {
            mData = metaData;
        });

        grid.find('.datagridview-footer-element input.datagridview-paging-page-size').val(50);
        triggerKeyboardEvent(grid.find('.datagridview-footer-element input.datagridview-paging-page-size'), 'keydown', keyCodes.ENTER);

        expect(mData).not.toEqual(null);
        expect(mData.page).toEqual(0);
        expect(mData.rowsPerPage).toEqual(50);
    })
});