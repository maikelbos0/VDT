# jQuery-rangeslider

A jQuery plugin that makes it easy to transform any html-element into a range slider with definable range that is consistent across browsers.

## Features

- Support for any integer range
- Automatically generates form field with the desired names
- Programmatic access to the slider for manipulating value
- Easy to set up with data-attributes inside your html elements
- Easy to adapt either by changing the defaults or providing options in-line
- Easy to customize styling

## Basic usage

Includes:

```
<link rel="stylesheet" href="Content/jquery-rangeslider.min.css" />
<link rel="stylesheet" href="Content/jquery-rangeslider.style.min.css" />
<script type="text/javascript" src="Scripts/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="Scripts/jquery-rangeslider.min.js"></script>
```

Html:

```
<div id="example-slider" data-range-start="0" data-step-size="5" data-step-count="40" data-value="25" data-field-name="example-value">
</div>
```

Javascript:

```
$('#example-slider').rangeslider();
```

This will generate a rangeslider with a range of 0 to 200 with steps of 5 and a starting value of 25.
The input field will have the value mentioned in the data-value attribute and the name "example-value".

## Styling

The rangeslider only provides very basic styling in the provided style sheet `jquery-rangeslider.style.css`; you can use this as a template to create your own style.
The various css classes the slider uses are:

* `.rangeslider` is the original element and the main container of the slider
* `.rangeslider-input` is the hidden input field that contains the current value
* `.rangeslider-thumb` is the element that can be dragged along the track
* `.rangeslider-track` is the track along which the thumb is dragged

## Documentation

Full documentation can be found at [the wiki](https://github.com/maikelbos0/VDT/wiki)