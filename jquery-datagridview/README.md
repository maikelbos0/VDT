# jQuery-datagridview

A jQuery plugin that makes it easy to create a grid view for your tabular data. It allows you to create a table layout
on the fly for an array of data-objects while leaving you in full control of where the data comes from.

## Features

- Supports sorting and paging
- Single- and multiselect support
- Resizable headers and movable headers
- Programmatic access to the datagridview for manipulating selection
- Easy to set up with data-attributes inside your html elements
- Easy to adapt either by changing the defaults or providing options in-line

## Basic usage

Includes:

```
<link rel="stylesheet" href="Content/jquery-datagridview.min.css" />
<link rel="stylesheet" href="Content/jquery-datagridview.style.min.css" />
<script type="text/javascript" src="Scripts/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="Scripts/jquery-datagridview.min.js"></script>
```

Html and javascript:

```
<div id="example-table" data-select="true" data-multiselect="true"></div>

<script type="text/javascript">
    $('#example-table').datagridview({
        columns: [
            { data: 'firstName' },
            { data: 'lastName' }
        ]
    });
</script>

<script type="text/javascript">
    $('#example-table').datagridview(function () {
        this.populate(new DataGridViewMetaData(null, false, 2, 25, 0), [
            { firstName: 'Keanu', lastName: 'Reeves' },
            { firstName: 'Laurence', lastName: 'Fishburne' }
        ]);
    });
</script>
```

This will generate a datagridview with multiselect, sorting and paging enabled.

## Styling

The datagridview only provides very basic styling in the provided style sheet `jquery-datagridview.style.css`; you can use this as a template
to create your own style. The various css classes the data grid uses are:

* `.datagridview` is the original element and the main container of the datagridview
* `.datagridview-content-container` is the scroll container for the header and body
* `.datagridview-header` is the container for the header cells
* `.datagridview-header-cell` are the individual column headers within the header
* `.datagridview-header-cell-sortable` are only the sortable column headers
* `.datagridview-header-drag` are the elements to hold to drag to change column size
* `.datagridview-header-move-title` element contains the header title of the header that's being dragged to move a column and is attached to the mouse position
* `.datagridview-header-move-indicator` is the arrow pointing at the new column position while dragging a header to move a column
* `.datagridview-sort-toggle` is the element displaying the current sort order if applicable
* `.datagridview-sort-toggle-ascending` gets added to the sort toggle when sorting ascending
* `.datagridview-sort-toggle-descending` gets added to the sort toggle when sorting descending
* `.datagridview-body` is the container for the grid rows
* `.datagridview-row` are the data rows inside the body that contain the data
* `.datagridview-row-selecting` gets added to rows when a user is selecting (with mouse down)
* `.datagridview-row-selected` gets added to rows that are currently selected
* `.datagridview-row > div` can be used to access cells in the data rows
* `.datagridview-footer` is the container for the footer (paging) elements
* `.datagridview-footer-element` are the containers for each separate footer (paging) plugin

## Documentation

Full documentation can be found at [the wiki](https://github.com/maikelbos0/VDT/wiki)