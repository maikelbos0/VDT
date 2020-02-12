# jQuery-rangeslider

A jQuery plugin that transforms any text input into a numeric input with full localization support.

## Features

- Full localization support
- Support for integers and decimals range
- Optional minimum and maximum values
- Programmatic access to the input for manipulating value
- Easy to set up with data-attributes inside your html elements
- Easy to adapt either by changing the defaults or providing options in-line

## Basic usage

Includes:

```
<script type="text/javascript" src="Scripts/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="Scripts/jquery-numericinput.min.js"></script>
```

Html:

```
<input type="text" id="example-numericinput" value="1 234,56" data-decimal-separator="," data-group-separator=" " data-minimum-value="0" data-maximum-value="1000" />
```

Javascript:

```
$('#example-numericinput').numericinput();
```

This will generate a numeric input with a range of 0 to 1000 with Swedish localization.
The input field will have the value as displayed, but calling the `getValue` function the float `1234.56` will be returned.

## Documentation

Full documentation can be found at [the wiki](https://github.com/maikelbos0/VDT/wiki)