# jQuery-dropdownlist.MVC

An extension to the jQuery-dropdownlist plugin that makes it simple to use as part of your viewmodels.

## Features

- Automatically binds selected values to your viewmodel when posting your form
- Single- and multiselect support
- Search text for autocomplete or filtering

## Basic usage

Viewmodel:

```
public class ExampleViewModel {
    public JQueryDropdownlist DemoProperty { get; set; }
}
```

Controller:

```
public ActionResult Index() {
    return View(new ExampleViewModel() {
        DemoProperty = new JQueryDropdownlist() {
            Items = new[] {
                new JQueryDropdownlistItem() { Value = "1a", Text = "Option 1a" },
                new JQueryDropdownlistItem() { Value = "1b", Text = "Option 1b" },
                new JQueryDropdownlistItem() { Value = "2", Text = "Choice 2" },
                new JQueryDropdownlistItem() { Value = "3", Text = "Third choice" }
            },
            SelectedValues = new[] { "1b", "2" },
            IsMultiselect = true
        }
    });
}

[HttpPost]
public ActionResult Index(ExampleViewModel viewModel) {
    var selectedValues = viewModel.DemoProperty.SelectedValues;
}
```

View:

```
@Html.JQueryDropdownlistFor(model => model.DemoProperty)
```

## Documentation

Full documentation can be found at [the wiki](https://github.com/maikelbos0/VDT/wiki)