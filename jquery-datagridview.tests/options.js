describe('a datagridview option', function () {
    function triggerMouseEvent(element, eventType, pageX) {
        var event = jQuery.Event(eventType);
        event.which = 1;
        event.pageX = pageX;

        $(element).trigger(event);
    }

    it('can be provided for getMetaData', function () {
        var metaData;

        $('#datagridview-options-meta-data').datagridview({
            columns: [],
            getMetaData: function () {
                return new DataGridViewMetaData('test', false, 0, 25, 0);
            }
        }, function () {
            metaData = this.getMetaData();
        });

        expect(metaData.sortColumn).toEqual('test');
    });

    it('can be provided for getFooterPlugins', function () {
        var grid = $('#datagridview-options-footer-plugins');

        grid.datagridview({
            columns: [{ data: 'test' }],
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.prevNext,
                    $.fn.datagridview.footerPlugins.displayFull
                ];
            }
        }, function () {
            this.populate(new DataGridViewMetaData('test', false, 2, 25, 0), [
                { test: '1' },
                { test: '2' }
            ])
        });

        expect(grid.find('.datagridview-footer-element').length).toEqual(2);
    });

    it('can be provided for allowColumnResize', function () {
        var grid = $('#datagridview-options-headers-resizable');

        grid.datagridview({
            columns: [{ data: 'test' }],
            allowColumnResize: function () {
                return true;
            }
        });

        expect(grid.find('.datagridview-header-drag').length).toEqual(1);
    });

    it('can be provided for allowColumnMove', function () {
        var grid = $('#datagridview-options-headers-move');
        var allow = false;

        grid.datagridview({
            columns: [{ data: 'test' }],
            allowColumnMove: function () {
                return true;
            }
        }, function () {
            allow = this.allowColumnMove;
        });

        expect(allow).toEqual(true);
    });

    it('can be provided for allowSelect', function () {
        var grid = $('#datagridview-options-allow-select');
        var allowSelect = false;

        grid.datagridview({
            columns: [],
            allowSelect: function () {
                return true;
            }
        }, function () {
            allowSelect = this.allowSelect;
        });

        expect(allowSelect).toEqual(true);
    });

    it('can be provided for isMultiselect', function () {
        var grid = $('#datagridview-options-multiselect');
        var isMultiselect = false;

        grid.datagridview({
            columns: [],
            isMultiselect: function () {
                return true;
            }
        }, function () {
            isMultiselect = this.isMultiselect;
        });

        expect(isMultiselect).toEqual(true);
    });

    it('can be provided for hasMultiselectCheckboxes', function () {
        var grid = $('#datagridview-options-checkboxselect');
        var hasMultiselectCheckboxes = false;

        grid.datagridview({
            columns: [],
            hasMultiselectCheckboxes: function () {
                return true;
            }
        }, function () {
            hasMultiselectCheckboxes = this.hasMultiselectCheckboxes;
        });

        expect(hasMultiselectCheckboxes).toEqual(true);
    });

    it('can be provided for getContentContainerAttributes', function () {
        var grid = $('#datagridview-options-content-container-attributes');

        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ],
            getContentContainerAttributes: function () {
                return { class: 'test' };
            }
        });

        expect(grid.find('.datagridview-content-container').hasClass('test')).toEqual(true);
    });

    it('can be provided for getHeaderAttributes', function () {
        var grid = $('#datagridview-options-header-attributes');

        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ],
            getHeaderAttributes: function () {
                return { class: 'test' };
            }
        });

        expect(grid.find('.datagridview-header').hasClass('test')).toEqual(true);
    });

    it('can be provided for getSortToggleAttributes', function () {
        var grid = $('#datagridview-options-sort-toggle-attributes');

        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ],
            getMetaData: function () {
                return new DataGridViewMetaData('test1', false, 0, 25, 0);
            },
            getSortToggleAttributes: function () {
                return { class: 'test' };
            }
        });

        expect(grid.find('.datagridview-sort-toggle').length).toEqual(1);
        expect(grid.find('.datagridview-sort-toggle').hasClass('test')).toEqual(true);
    });

    it('can be provided for getHeaderCellAttributes', function () {
        var grid = $('#datagridview-options-header-cell-attributes');

        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ],
            getHeaderCellAttributes: function () {
                return { class: 'test' };
            }
        });

        var headers = grid.find('.datagridview-header-cell');

        expect(headers.length).toBe(2);
        expect($(headers[0]).hasClass('test')).toEqual(true);
        expect($(headers[1]).hasClass('test')).toEqual(true);
    });

    it('can be provided for getHeaderDragAttributes', function () {
        var grid = $('#datagridview-options-header-drag-attributes');

        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ],
            getHeaderDragAttributes: function () {
                return { class: 'test' };
            }
        });

        var headers = grid.find('.datagridview-header-drag');

        expect(headers.length).toBe(2);
        expect($(headers[0]).hasClass('test')).toEqual(true);
        expect($(headers[1]).hasClass('test')).toEqual(true);
    });

    it('can be provided for getHeaderMoveIndicatorAttributes', function () {
        var grid = $('#datagridview-options-header-move-indicator-attributes');

        grid.width('100px');
        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ],
            getHeaderMoveIndicatorAttributes: function () {
                return { class: 'test' };
            }
        });

        triggerMouseEvent(grid.find('.datagridview-header-cell').first(), 'mousedown', -100);
        triggerMouseEvent(grid, 'mousemove', 0);

        expect(grid.find('.datagridview-header-move-indicator').hasClass('test')).toEqual(true);

        triggerMouseEvent(grid, 'mouseup', 100);
    });

    it('can be provided for getHeaderMoveTitleAttributes', function () {
        var grid = $('#datagridview-options-header-move-title-attributes');

        grid.width('100px');
        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ],
            getHeaderMoveTitleAttributes: function () {
                return { class: 'test' };
            }
        });

        triggerMouseEvent(grid.find('.datagridview-header-cell').first(), 'mousedown', -100);
        triggerMouseEvent(grid, 'mousemove', 0);

        expect(grid.find('.datagridview-header-move-title').hasClass('test')).toEqual(true);

        triggerMouseEvent(grid, 'mouseup', 100);
    });

    it('can be provided for getBodyAttributes', function () {
        var grid = $('#datagridview-options-body-attributes');

        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ],
            getBodyAttributes: function () {
                return { class: 'test' };
            }
        }, function () {
            this.populate(new DataGridViewMetaData(null, false, 2, 25, 0), [
                { test1: 'test', test2: 'test' },
                { test1: 'test', test2: 'test' }
            ])
        });

        expect(grid.find('.datagridview-body').hasClass('test')).toEqual(true);
    });

    it('can be provided for getRowAttributes', function () {
        var grid = $('#datagridview-options-row-attributes');

        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ],
            getRowAttributes: function () {
                return { class: 'test' };
            }
        }, function () {
            this.populate(new DataGridViewMetaData(null, false, 2, 25, 0), [
                { test1: 'test', test2: 'test' },
                { test1: 'test', test2: 'test' }
            ])
        });

        var rows = grid.find('.datagridview-row');

        expect(rows.length).toBe(2);
        expect($(rows[0]).hasClass('test')).toEqual(true);
        expect($(rows[1]).hasClass('test')).toEqual(true);
    });

    it('can be provided for getCellAttributes', function () {
        var grid = $('#datagridview-options-cell-attributes');

        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ],
            getCellAttributes: function () {
                return { class: 'test' };
            }
        }, function () {
            this.populate(new DataGridViewMetaData(null, false, 2, 25, 0), [
                { test1: 'test', test2: 'test' },
                { test1: 'test', test2: 'test' }
            ])
        });

        var cells = grid.find('.datagridview-row > div');

        expect(cells.length).toBe(4);
        expect($(cells[0]).hasClass('test')).toEqual(true);
        expect($(cells[3]).hasClass('test')).toEqual(true);
    });

    it('can be provided for getTotalRowAttributes', function () {
        var grid = $('#datagridview-options-total-row-attributes');

        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ],
            getTotalRowAttributes: function () {
                return { class: 'test' };
            }
        }, function () {
            this.populate(new DataGridViewMetaData(null, false, 2, 25, 0), [
                { test1: 'test', test2: 'test' },
                { test1: 'test', test2: 'test' }
            ], { test1: 'test', test2: 'test' })
        });

        expect(grid.find('.datagridview-total-row').hasClass('test')).toEqual(true);
    });

    it('can be provided for getTotalCellAttributes', function () {
        var grid = $('#datagridview-options-total-cell-attributes');

        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ],
            getTotalCellAttributes: function () {
                return { class: 'test' };
            }
        }, function () {
            this.populate(new DataGridViewMetaData(null, false, 2, 25, 0), [
                { test1: 'test', test2: 'test' },
                { test1: 'test', test2: 'test' }
            ], { test1: 'test', test2: 'test' })
        });

        var cells = grid.find('.datagridview-total-row > div');

        expect(cells.length).toBe(2);
        expect($(cells[0]).hasClass('test')).toEqual(true);
        expect($(cells[1]).hasClass('test')).toEqual(true);
    });

    it('can be provided for getFooterAttributes', function () {
        var grid = $('#datagridview-options-footer-attributes');

        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ],
            getFooterAttributes: function () {
                return { class: 'test' };
            }
        }, function () {
            this.populate(new DataGridViewMetaData(null, false, 2, 25, 0), [
                { test1: 'test', test2: 'test' },
                { test1: 'test', test2: 'test' }
            ])
        });

        expect(grid.find('.datagridview-footer').hasClass('test')).toEqual(true);
    });

    it('can be provided for getFooterElementAttributes', function () {
        var grid = $('#datagridview-options-footer-element-attributes');

        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ],
            getFooterElementAttributes: function () {
                return { class: 'test' };
            }
        }, function () {
            this.populate(new DataGridViewMetaData(null, false, 2, 25, 0), [
                { test1: 'test', test2: 'test' },
                { test1: 'test', test2: 'test' }
            ])
        });

        var footers = grid.find('.datagridview-footer-element');

        expect(footers.length).toBe(4);
        expect($(footers[0]).hasClass('test')).toEqual(true);
        expect($(footers[3]).hasClass('test')).toEqual(true);
    });

    it('can be provided for getStyleAttributes', function () {
        var grid = $('#datagridview-options-style-attributes');
        var style = null;

        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ],
            getStyleAttributes: function () {
                return { class: 'test' };
            }
        }, function () {
            this.populate(new DataGridViewMetaData(null, false, 2, 25, 0), [
                { test1: 'test', test2: 'test' },
                { test1: 'test', test2: 'test' }
            ]);

            style = this.style;
        });

        expect(style).not.toBeNull();
        expect(style.hasClass('test')).toEqual(true);
    });

    it('can be provided for the text of the basic display footer', function () {
        var grid = $('#datagridview-options-resources-basic');

        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ],
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.displayBasic
                ]
            },
            resources: {
                getDisplayBasicText: function (datagridview, page, totalPages) {
                    return 'Pagina ' + page + ' van ' + totalPages;
                }
            }
        }, function () {
            this.populate(new DataGridViewMetaData(null, false, 3, 2, 0), [
                { test1: 'test', test2: 'test' },
                { test1: 'test', test2: 'test' },
                { test1: 'test', test2: 'test' }
            ]);
        });

        expect(grid.find('.datagridview-footer-element div').text()).toEqual('Pagina 1 van 2');
    });

    it('can be provided for the text of the full display footer', function () {
        var grid = $('#datagridview-options-resources-full');

        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ],
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.displayFull
                ]
            },
            resources: {
                getDisplayFullText: function (datagridview, page, totalPages, startRow, endRow, totalRows) {
                    return 'Rijen ' + startRow + ' tot ' + endRow + ' van ' + totalRows + ', pagina ' + page + ' van ' + totalPages;
                }
            }
        }, function () {
            this.populate(new DataGridViewMetaData(null, false, 3, 2, 0), [
                { test1: 'test', test2: 'test' },
                { test1: 'test', test2: 'test' },
                { test1: 'test', test2: 'test' }
            ]);
        });

        expect(grid.find('.datagridview-footer-element div').text()).toEqual('Rijen 1 tot 2 van 3, pagina 1 van 2');
    });

    it('can be provided for the label text of the page input footer', function () {
        var grid = $('#datagridview-options-resources-page');

        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ],
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.pageInput
                ]
            },
            resources: {
                getPageText: function (datagridview) {
                    return 'Pagina: ';
                }
            }
        }, function () {
            this.populate(new DataGridViewMetaData(null, false, 3, 2, 0), [
                { test1: 'test', test2: 'test' },
                { test1: 'test', test2: 'test' },
                { test1: 'test', test2: 'test' }
            ]);
        });

        expect(grid.find('.datagridview-footer-element span').text()).toEqual('Pagina: ');
    });

    it('can be provided for the label text of the page size input footer', function () {
        var grid = $('#datagridview-options-resources-page-size');

        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ],
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.pageSizeInput
                ]
            },
            resources: {
                getPageSizeText: function (datagridview) {
                    return 'Paginagrootte: ';
                }
            }
        }, function () {
            this.populate(new DataGridViewMetaData(null, false, 3, 2, 0), [
                { test1: 'test', test2: 'test' },
                { test1: 'test', test2: 'test' },
                { test1: 'test', test2: 'test' }
            ]);
        });

        expect(grid.find('.datagridview-footer-element span').text()).toEqual('Paginagrootte: ');
    });

    it('can be provided for the button text of the page input footers', function () {
        var grid = $('#datagridview-options-resources-go-page');

        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ],
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.pageInput
                ]
            },
            resources: {
                getGoText: function (datagridview) {
                    return 'Navigeer!';
                }
            }
        }, function () {
            this.populate(new DataGridViewMetaData(null, false, 3, 2, 0), [
                { test1: 'test', test2: 'test' },
                { test1: 'test', test2: 'test' },
                { test1: 'test', test2: 'test' }
            ]);
        });

        expect(grid.find('.datagridview-footer-element button').text()).toEqual('Navigeer!');
    });

    it('can be provided for the button text of the size input footers', function () {
        var grid = $('#datagridview-options-resources-go-page-size');

        grid.datagridview({
            columns: [
                { data: 'test1' },
                { data: 'test2' }
            ],
            getFooterPlugins: function () {
                return [
                    $.fn.datagridview.footerPlugins.pageSizeInput
                ]
            },
            resources: {
                getGoText: function (datagridview) {
                    return 'Navigeer!';
                }
            }
        }, function () {
            this.populate(new DataGridViewMetaData(null, false, 3, 2, 0), [
                { test1: 'test', test2: 'test' },
                { test1: 'test', test2: 'test' },
                { test1: 'test', test2: 'test' }
            ]);
        });

        expect(grid.find('.datagridview-footer-element button').text()).toEqual('Navigeer!');
    });
});