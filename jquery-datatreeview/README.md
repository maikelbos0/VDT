# jQuery-datatreeview

A jQuery plugin that makes it easy to create a tree view for your tree-like data. It allows you to create a tree view
on the fly for a tree of data-objects while leaving you in full control of where the data comes from.

## Features

- Bind any javascript tree of objects
- Parent-child and freehand select support
- Automatically generates form fields with the desired name
- Programmatic access to the datatreeview for manipulating selection
- Easy to set up with data-attributes inside your html elements
- Easy to adapt either by changing the defaults or providing options in-line

## Basic usage

Includes:

```
<link rel="stylesheet" href="Content/jquery-datatreeview.min.css" />
<link rel="stylesheet" href="Content/jquery-datatreeview.style.min.css" />
<script type="text/javascript" src="Scripts/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="Scripts/jquery-datatreeview.min.js"></script>
```

Html and javascript:

```
<div id="example-tree" data-field-name="tree-nodes"></div>

<script type="text/javascript">
    $('#example-tree').datatreeview({
        data: [
            { value: 1, text: 'Foo' },
            {
                value: 2,
                text: 'Bar',
                children: [
                    { value: '2a', text: 'Bar child', selected: true },
                    { value: '2b', text: 'Another'}
                ]
            },
            { value: 3, text: 'Baz' }
        ]
    });
</script>
```

This will generate a datatreeview with one child node selected, with checkboxes named 'tree-nodes'.

## Styling

The datatreeview only provides basic styling in the provided style sheet `jquery-datatreeview.style.css`; you can use this as a template to create your own style. The various css classes the treeview uses are:

* `.datatreeview` is the original element and the main container of the datatreeview
* `.datatreeview-list` is any list of treeview nodes
* `.datatreeview-node` is a treeview node
* `.datatreeview-node-collapsed` is a treeview node in collapsed state
* `.datatreeview-node-content` is the content of a treeview node (the toggler, checkbox and label) excluding child nodes
* `.datatreeview-toggler` is the toggler to open/close child node lists
* `.datatreeview-text` is the node text label
* `.datatreeview-field` is the input checkbox used to select/deselect nodes

## Documentation

Full documentation can be found at [the wiki](https://github.com/maikelbos0/VDT/wiki)