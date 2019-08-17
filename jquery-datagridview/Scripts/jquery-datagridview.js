(function ($) {

    // Extension for creating datagridviews; supports multiple creations in one call
    $.fn.datagridview = function (settings, callback) {
        // Allow callback to be the only argument
        if ($.isFunction(settings)) {
            callback = settings;
            settings = null;
        }

        return $(this).each(function () {
            let datagridview = $(this).data('datagridview');

            if (!$(this).data('datagridview')) {
                // Validate columns
                if (!settings || !settings.columns) {
                    throw 'datagridview error: expected required option "columns"';
                }
                else if (!$.isArray(settings.columns)) {
                    throw 'datagridview error: expected option "columns" to be an array';
                }
                else if (!settings.columns.every(function (column) {
                    return !!column.data;
                })) {
                    throw 'datagridview error: expected each item in option "columns" to have property "data"';
                }

                // Create object
                let options = $.extend({}, $.fn.datagridview.defaults, settings);
                datagridview = new DataGridView($(this), options);

                // Add object to data
                $(this).data('datagridview', datagridview);
            }

            // Call the callback, bound to the datagridview
            if ($.isFunction(callback)) {
                callback.bind(datagridview)(datagridview);
            }
        });
    }

    // Set defaults for extension
    $.fn.datagridview.defaults = {
        // Get initial meta data
        // Expects a DataGridViewMetaData object
        getMetaData: function (element) {
            return new DataGridViewMetaData(null, false, 0, 1, 0);
        },
        // Footer functions, in order, to use for the footer
        getFooterPlugins: function (element) {
            return [
                $.fn.datagridview.footerPlugins.prevNext,
                $.fn.datagridview.footerPlugins.pageInput,
                $.fn.datagridview.footerPlugins.pageSizeInput,
                $.fn.datagridview.footerPlugins.displayFull
            ];
        },
        // Allow headers to be resized
        areHeadersResizable: function (element) {
            return $(element).data('header-resize') !== undefined && $(element).data('header-resize') != false;
        },
        // Allow the user to select rows
        allowSelect: function (element) {
            return $(element).data('select') !== undefined && $(element).data('select') != false;
        },
        // If select is enabled, allow multiple row selection
        isMultiselect: function (element) {
            return $(element).data('multiselect') !== undefined && $(element).data('multiselect') != false;
        }
    }

    // Pagination footer plugins
    // This can easily be extended
    // Please note that the page index is 0-based and needs to be corrected for display purposes
    $.fn.datagridview.footerPlugins = {
        displayBasic: function (footerElement, metaData, datagridview) {
            $(footerElement).append($('<div>').text("Page " + (metaData.page + 1) + " of " + metaData.totalPages));
        },
        displayFull: function (footerElement, metaData, datagridview) {
            let rowStart = metaData.page * metaData.rowsPerPage + 1;
            let rowEnd = (metaData.page + 1) * metaData.rowsPerPage;

            $(footerElement).append($('<div>').text("Page " + (metaData.page + 1) + " of " + metaData.totalPages + ", rows " + rowStart + " to " + rowEnd + " of " + metaData.totalRows));
        },
        prevNext: function (footerElement, metaData, datagridview) {
            // To disable any of these options, simply hide them in css for the all, or just the appropriate grids
            let first = $('<button>')
                .addClass('datagridview-paging-first')
                .text('|<')
                .click(function () { datagridview.initiatePaging(0, metaData.rowsPerPage); })
                .prop('disabled', metaData.page <= 0);

            let prev = $('<button>')
                .addClass('datagridview-paging-prev')
                .text('<')
                .click(function () { datagridview.initiatePaging(metaData.page - 1, metaData.rowsPerPage); })
                .prop('disabled', metaData.page <= 0);

            $(footerElement).append(first, prev);

            for (let page = Math.max(0, metaData.page - 4); page < Math.min(metaData.totalPages, metaData.page + 5); page++) {
                // Using an iterator in an anonymous function does not work as expected cross-browser
                let currentPage = page;

                $(footerElement).append($('<button>')
                    .addClass('datagridview-paging-page')
                    .text(currentPage + 1)
                    .click(function () { datagridview.initiatePaging(currentPage, metaData.rowsPerPage); })
                    .prop('disabled', metaData.page === currentPage));
            }

            let next = $('<button>')
                .addClass('datagridview-paging-next')
                .text('>')
                .click(function () { datagridview.initiatePaging(metaData.page + 1, metaData.rowsPerPage); })
                .prop('disabled', metaData.page >= metaData.totalPages - 1);

            let last = $('<button>')
                .addClass('datagridview-paging-last')
                .text('>|')
                .click(function () { datagridview.initiatePaging(metaData.totalPages - 1, metaData.rowsPerPage); })
                .prop('disabled', metaData.page >= metaData.totalPages - 1);

            $(footerElement).append(next, last);
        },
        pageInput: function (footerElement, metaData, datagridview) {
            let page = $('<input>', { type: 'text' })
                .addClass('datagridview-paging-page')
                .val(metaData.page + 1);
            let label = $('<span>')
                .addClass('datagridview-paging-page-label')
                .text('Page: ')
            let go = $('<button>')
                .addClass('datagridview-paging-go')
                .text('Go')
                .click(function () {
                    datagridview.initiatePaging(page.val() - 1, metaData.rowsPerPage);
                });

            $(footerElement).append(label, page, go);
        },
        pageSizeInput: function (footerElement, metaData, datagridview) {
            let pageSize = $('<input>', { type: 'text' })
                .addClass('datagridview-paging-page-size')
                .val(metaData.rowsPerPage);
            let label = $('<span>')
                .addClass('datagridview-paging-page-size-label')
                .text('Page size: ')
            let go = $('<button>')
                .addClass('datagridview-paging-go')
                .text('Go')
                .click(function () {
                    datagridview.initiatePaging(metaData.page, pageSize.val());
                });

            $(footerElement).append(label, pageSize, go);
        }
    }

    // Datagridview implementation
    function DataGridView(element, options) {
        let base = this;
        let i = 0;

        this.element = element;
        this.options = options;
        this.data = [];
        this.areHeadersResizable = this.options.areHeadersResizable(this.element);
        this.dragState = {
            dragging: false
        };
        this.allowSelect = this.options.allowSelect(this.element);
        this.isMultiselect = this.allowSelect && this.options.isMultiselect(this.element);
        this.selectState = {
            selecting: false,
            dragging: false
        }
        this.metaData = this.options.getMetaData(this.element);
        this.elementClass = 'datagridview-' + Math.random().toString().replace('.', '');
        this.element.addClass('datagridview');
        this.element.addClass(this.elementClass);
        this.element.children().hide();
        this.header = this.createElement('<div>', 'datagridview-header');
        this.body = this.createElement('<div>', 'datagridview-body');
        this.contentContainer = this.createElement('<div>', 'datagridview-content-container').toggleClass('datagridview-container-multiselect', this.isMultiselect).append(this.header, this.body);
        this.footer = this.createElement('<div>'); // Placeholder only
        this.footerPlugins = this.options.getFooterPlugins(this.element);
        this.sortToggle = this.createElement('<div>', 'datagridview-sort-toggle');
        this.element.append(
            this.contentContainer,
            this.footer
        );

        this.style = $('<style>', { type: 'text/css' });
        $('body').append(this.style);

        // Create columns
        this.options.columns.forEach(function (column) {
            // Define class
            column.id = Math.random().toString().replace('.', '');
            column.class = 'datagridview-column-' + column.id;
            column.width = isNaN(column.width) || column.width <= 0 ? 10 : parseFloat(column.width);
            column.index = i++;

            let headerCell = $('<div>').text(column.header || column.data)
                .addClass(column.class)
                .addClass('datagridview-header-cell')
                .toggleClass('datagridview-header-cell-sortable', column.sortable !== false)
                .attr('title', column.header || column.data)
                .data('id', column.id)
                .data('column', column.data)
                .data('sort-column', column.sortData || column.data);

            if (base.areHeadersResizable) {
                // Drag item
                headerCell.prepend($('<div>').addClass('datagridview-header-drag'));
            }

            base.header.append(headerCell);
        });

        this.setColumnWidth();

        // Use the meta data if present to display appropriate sorting and paging
        this.displaySortOrder();
        this.displayFooters();

        // Event handlers
        this.header.on('mouseup', 'div.datagridview-header-cell-sortable', this, eventHandlers.headerMouseup);

        if (this.areHeadersResizable) {
            this.header.on('mousedown', 'div.datagridview-header-drag', this, eventHandlers.headerDragMousedown);
            $(document).on('mousemove', this, eventHandlers.documentMousemove);
            $(document).on('mouseup', this, eventHandlers.documentMouseup);
        }

        if (this.allowSelect) {
            this.element.on('mousedown', 'div.datagridview-row', this, eventHandlers.rowMousedown);
            this.element.on('mouseenter', 'div.datagridview-row', this, eventHandlers.rowMouseenter);
            this.element.on('mouseup', 'div.datagridview-row', this, eventHandlers.rowMouseup);
        }
    }

    // Set the width of the columns
    DataGridView.prototype.setColumnWidth = function () {
        let style = '';
        let tableWidth = this.options.columns.reduce(function (w, c) { return w + c.width; }, 0);

        if (tableWidth > 100) {
            style = '.' + this.elementClass + ' div.datagridview-header, .' + this.elementClass + ' div.datagridview-body { width: ' + tableWidth + '%}\n';
        }

        this.style.html(this.options.columns.reduce(function (style, column) {
            return style + '.' + column.class + '{ flex-grow: ' + column.width + ' }\n';
        }, style));
    }

    // Fill the grid with the data
    DataGridView.prototype.populate = function (metaData, data) {
        let newBody = this.createElement('<div>', 'datagridview-body');

        for (let r = 0; r < data.length; r++) {
            let dataRow = data[r];
            let row = this.createElement('<div>', 'datagridview-row');

            for (let c = 0; c < this.options.columns.length; c++) {
                let column = this.options.columns[c];

                row.append($('<div>').text(dataRow[column.data] || "").addClass(column.class).attr('title', dataRow[column.data] || ""));
            }

            newBody.append(row);
        };

        this.body.replaceWith(newBody);
        this.body = newBody;
        this.data = data;

        // Use the new meta data if present to display appropriate sorting and paging
        if (metaData instanceof DataGridViewMetaData) {
            this.metaData = metaData;
        }
        // Try to resolve the meta data as far as we can
        else if (metaData) {
            this.metaData = new DataGridViewMetaData(metaData.sortColumn, metaData.sortDescending, metaData.totalRows || this.data.length, metaData.rowsPerPage || this.data.length, metaData.page || 0);
        }
        // Default
        else {
            this.metaData = new DataGridViewMetaData(this.metaData.sortColumn, this.metaData.sortDescending, this.data.length, this.data.length, 0);
        }

        this.displaySortOrder();
        this.displayFooters();
    }

    // Create an element and merge attribute objects to attributes
    DataGridView.prototype.createElement = function (tagName, className) {
        let attributes = $.extend.apply({}, Array.prototype.slice.call(arguments, 2));
        let element = $(tagName, attributes).addClass(className);

        return element;
    }

    // Remove the entire datagridview; resets the base element to its former state
    DataGridView.prototype.remove = function () {
        this.element.removeClass('datagridview');
        this.element.removeClass(this.elementClass);
        this.element.children().show();
        this.contentContainer.remove();
        this.footer.remove();
        this.style.remove();
    }

    // Get meta currently in use; these can be edited and passed back via populate
    DataGridView.prototype.getMetaData = function () {
        return this.metaData.clone();
    }

    // Set sorting icon after sorting action
    DataGridView.prototype.displaySortOrder = function () {
        let base = this;
        let header = this.header.find('div.datagridview-header-cell').filter(function () { return $(this).data('sort-column') === base.metaData.sortColumn });

        if (header.length > 0) {
            if (this.metaData.sortDescending) {
                this.sortToggle.removeClass('datagridview-sort-toggle-ascending').addClass('datagridview-sort-toggle-descending');
            }
            else {
                this.sortToggle.removeClass('datagridview-sort-toggle-descending').addClass('datagridview-sort-toggle-ascending');
            }

            header.append(this.sortToggle);
            this.sortToggle.show();
        }
        else {
            this.sortToggle.hide();
        }
    }

    // Create the footers
    DataGridView.prototype.displayFooters = function () {
        let base = this;
        let newFooter = this.createElement('<div>', 'datagridview-footer');

        this.footer.children().remove();

        if (this.footerPlugins.length !== 0) {
            $.each(this.footerPlugins, function () {
                let footerElement = base.createElement('<div>', 'datagridview-footer-element');

                newFooter.append(footerElement);
                this(footerElement, base.getMetaData(), base);
            });
        }

        this.footer.replaceWith(newFooter);
        this.footer = newFooter;
    }

    // Get the column definitions currently in use; creates a copy
    DataGridView.prototype.getColumns = function () {
        return this.options.columns.map(function (column) {
            return {
                width: column.width,
                data: column.data,
                sortData: column.sortData,
                sortable: column.sortable,
                index: column.index
            };
        });
    }

    // Get selected rows
    DataGridView.prototype.getSelectedRows = function () {
        return this.body.find('.datagridview-row-selected');
    }

    // Get selected indexes
    DataGridView.prototype.getSelectedIndexes = function () {
        return this.getSelectedRows().map(function () {
            return $(this).index();
        }).get();
    }

    // Get selected data
    DataGridView.prototype.getSelectedData = function () {
        let base = this;

        return this.getSelectedIndexes().map(function (index) {
            return base.data[index];
        });
    }

    // Internal function for altering selection
    DataGridView.prototype.alterSelection = function (rows, selectedRows, toggle, resetSelection) {
        let selectionChanged = false;

        // Reset selection means we unselect the selected rows that aren't in the current selection
        if (resetSelection) {
            let unselectRows = rows.not(selectedRows).filter('.datagridview-row-selected');

            if (unselectRows.length > 0) {
                selectionChanged = true;
                unselectRows.removeClass('datagridview-row-selected');
            }
        }

        // If we toggle then all selected rows will be unselected or vice versa
        if (toggle) {
            if (selectedRows.length > 0) {
                selectionChanged = true;
                selectedRows.toggleClass('datagridview-row-selected');
            }
        }
        // Else we detect which rows to select that haven't been selected
        else {
            selectedRows = selectedRows.not('.datagridview-row-selected');

            if (selectedRows.length > 0) {
                selectionChanged = true;
                selectedRows.addClass('datagridview-row-selected');
            }
        }

        if (selectionChanged) {
            this.element.trigger('datagridview.selectionChanged');
        }
    }

    // Set selected rows by selector/selection/function/element
    DataGridView.prototype.setSelectedRows = function (selector) {
        let rows = this.body.find('.datagridview-row');
        let selectedRows = rows.filter(selector);

        if (!this.isMultiselect) {
            selectedRows = selectedRows.first();
        }

        this.alterSelection(rows, selectedRows, false, true);
    }

    // Set selected rows by index
    DataGridView.prototype.setSelectedIndexes = function (indexes) {
        let rows = this.body.find('.datagridview-row');
        let selectedRows = rows.get().filter(function (value, index) {
            return indexes.filter(function (v) { return v === index; }).length > 0;
        })

        this.alterSelection(rows, selectedRows, false, true);
    }

    // Set selected rows by filter function applied to data array
    // Filter function arguments are the standard array filter function arguments
    DataGridView.prototype.setSelectedData = function (filter) {
        let indexes = [];

        this.data.forEach(function (value, index, array) {
            if (filter(value, index, array)) {
                indexes.push(index);
            }
        });

        this.setSelectedIndexes(indexes);
    }

    // Initiate paging event
    DataGridView.prototype.initiatePaging = function (page, rowsPerPage) {
        // We work with a copy of the element; we only set paging when getting data in
        let metaData = new DataGridViewMetaData(this.metaData.sortColumn, this.metaData.sortDescending, this.metaData.totalRows, rowsPerPage || this.metaData.rowsPerPage, page);

        this.element.trigger('datagridview.paged', metaData);
    }

    // Event handlers should not be accessible from the object itself
    let eventHandlers = {
        headerMouseup: function (e) {
            if (e.which !== 1 || e.data.dragState.dragging) {
                return;
            }

            // In the event handler we work with a copy of the element; we only sort when getting data in
            let metaData = e.data.getMetaData();
            let sortColumn = $(this).data('sort-column');

            if (metaData.sortColumn === sortColumn) {
                metaData.sortDescending = !metaData.sortDescending;
            }
            else {
                metaData.sortColumn = sortColumn;
                metaData.sortDescending = false;
            }

            e.data.element.trigger('datagridview.sorted', metaData);
        },
        headerDragMousedown: function (e) {
            if (e.which !== 1) {
                return;
            }
            
            e.data.dragState.dragging = true;
            e.data.dragState.position = e.pageX;
            e.data.dragState.column = $(this).closest('.datagridview-header-cell').data('id');
        },
        documentMousemove: function (e) {
            if (!e.data.dragState.dragging) {
                return;
            }

            // the shift is expressed, same as column width, as a percentage of the original element
            let tableWidth = Math.min(100, e.data.options.columns.reduce(function (w, c) { return w + c.width; }, 0));
            let shift = (e.data.dragState.position - e.pageX) / $(e.data.element).width() * tableWidth;
            let column = e.data.options.columns.filter(function (c) { return c.id === e.data.dragState.column; })[0];

            // Adjust shift to only be enough to hide a column fully
            if (column.width - shift < 0) {
                shift = column.width;
            }

            column.width -= shift;

            // Set the new style
            e.data.setColumnWidth();
            e.data.dragState.position = e.pageX;
        },
        documentMouseup: function (e) {
            if (e.which !== 1) {
                return;
            }

            e.data.dragState.dragging = false;
        },
        rowMousedown: function (e) {
            e.data.selectState.selecting = true;
            e.data.selectState.dragElement = $(this);
            e.data.selectState.dragElement.addClass('datagridview-row-selecting');
        },
        rowMouseenter: function (e) {
            if (!e.data.selectState.selecting) {
                return;
            }

            // Only if we are selecting, and we've entered a new row, are we dragging
            e.data.selectState.dragging = true;

            // This is just to display that we're select-dragging the rows
            let rows = e.data.body.find('.datagridview-row');
            let firstIndex = rows.index(e.data.selectState.dragElement);
            let secondIndex = rows.index(this);
            let dragSelection = rows.slice(Math.min(firstIndex, secondIndex), Math.max(firstIndex, secondIndex) + 1);

            rows.not(dragSelection).removeClass('datagridview-row-selecting');
            dragSelection.addClass('datagridview-row-selecting');
        },
        rowMouseup: function (e) {
            let rows = e.data.body.find('.datagridview-row');

            if (e.data.isMultiselect && e.data.selectState.dragging && e.data.selectState.dragElement) {
                let firstIndex = rows.index(e.data.selectState.dragElement);
                let secondIndex = rows.index(this);

                e.data.alterSelection(rows, rows.slice(Math.min(firstIndex, secondIndex), Math.max(firstIndex, secondIndex) + 1), false, !e.ctrlKey);
            }
            else if (e.data.isMultiselect && e.shiftKey && e.data.selectState.extendElement) {
                let firstIndex = rows.index(e.data.selectState.extendElement);
                let secondIndex = rows.index(this);

                e.data.alterSelection(rows, rows.slice(Math.min(firstIndex, secondIndex), Math.max(firstIndex, secondIndex) + 1), false, !e.ctrlKey);
            }
            else if (e.data.isMultiselect && e.ctrlKey) {
                e.data.alterSelection(rows, $(this), true, false);
                e.data.selectState.extendElement = $(this);
            }
            else {
                e.data.alterSelection(rows, $(this), false, true);
                e.data.selectState.extendElement = $(this);
            }

            // Reset select state
            rows.removeClass('datagridview-row-selecting');
            e.data.selectState.dragElement = null;
            e.data.selectState.selecting = false;
            e.data.selectState.dragging = false;
        }
    }

}(jQuery));

// Datagridview meta data
function DataGridViewMetaData(sortColumn, sortDescending, totalRows, rowsPerPage, page) {
    this.sortColumn = sortColumn;
    this.sortDescending = !!sortDescending;
    this.totalRows = isNaN(totalRows) || totalRows < 0 ? 0 : parseInt(totalRows);
    this.rowsPerPage = isNaN(rowsPerPage) || rowsPerPage < 0 ? 0 : parseInt(rowsPerPage);
    this.page = isNaN(page) || page < 0 ? 0 : parseInt(page);
    this.totalPages = Math.ceil(totalRows / rowsPerPage);

    if (this.page >= this.totalPages) {
        this.page = Math.max(this.totalPages - 1, 0);
    }
}

// When accessing the meta data normally we get a clone
DataGridViewMetaData.prototype.clone = function () {
    return new DataGridViewMetaData(this.sortColumn, this.sortDescending, this.totalRows, this.rowsPerPage, this.page);
}