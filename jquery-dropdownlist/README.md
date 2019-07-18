# jQuery-dropdownlist

A jQuery plugin that makes it easy to transform any html-element with children into a dropdownlist.

## Features

- Single- and multiselect support
- Automatically generates form fields with the desired names
- Search text for autocomplete or filtering
- Programmatic access to the dropdown for manipulating selection
- Easy to set up with data-attributes inside your html elements
- Easy to adapt either by changing the defaults or providing options in-line

## Basic usage

Includes:

```
<link rel="stylesheet" href="Content/jquery-dropdownlist.min.css" />
<script type="text/javascript" src="Scripts/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="Scripts/jquery-dropdownlist.min.js"></script>
```

Html:

```
<div id="example-dropdown" data-multiselect="true" data-field-name="example-value" data-text-search="true">
    <div data-select-all="true">Select all options</div>
    <div data-value="1">Choice number 1</div>
    <div data-value="1a">Option 1a</div>
    <div data-value="2" data-selected="true">Second choice</div>
    <div data-value="3">Final option</div>
</div>
```

Javascript:

```
$('#example-dropdown').dropdownlist();
```

This will generate a dropdownlist with multiselect enabled, an element for select/deselect all and a filter will be visible inside the dropdownlist.
The input fields will have the values mentioned in the data-value attribute and the name "example-value".

## Styling

This dropdownlist only provides very basic styling in the provided style sheet; the list elements can be accessed with the following css classes:

- `.dropdownlist` is the main container for the dropdown
- `.dropdownlist-selector` is the selector element that is clicked to expand the dropdown
- `.dropdownlist-selector-text` is where the selected item text is displayed
- `.dropdownlist-selector-toggle` is the toggle arrow in the default style
- `.dropdownlist-search` is the search/autocomplete input
- `.dropdownlist-list` is the list that gets displayed/hidden and includes the original element
- `.dropdownlist-field` are the input fields; checkboxes are displayed in multiselect

## Documentation

Full documentation can be found at [the wiki](https://github.com/maikelbos0/VDT/wiki)