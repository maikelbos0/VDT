using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NSubstitute;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Mvc;
using System.Xml.Linq;

namespace vdt.jquerydropdownlist.MVC.test {
    [TestClass]
    public class HtmlHelperExtensionTests {
        [TestMethod]
        public void JQueryDropdownlistFor_GeneratesHtmlElements() {
            var viewModel = CreateViewModel();
            var viewData = new ViewDataDictionary<TestViewModel>() { Model = viewModel };
            var htmlHelper = CreateHtmlHelper<TestViewModel>(viewData);

            var html = htmlHelper.JQueryDropdownlistFor(model => model.TestProperty);
            var xml = XElement.Parse($"<list>{html}</list>");

            xml.Element("div").Should().NotBeNull();
            xml.Element("div").Elements().Should().HaveSameCount(viewModel.TestProperty.Items);
            xml.Element("script").Should().NotBeNull();
        }

        [TestMethod]
        public void JQueryDropdownlistFor_GeneratesIdAttribute() {
            var viewModel = CreateViewModel();
            var viewData = new ViewDataDictionary<TestViewModel>() { Model = viewModel };
            var htmlHelper = CreateHtmlHelper<TestViewModel>(viewData);

            var html = htmlHelper.JQueryDropdownlistFor(model => model.TestProperty);
            var xml = XElement.Parse($"<list>{html}</list>");

            xml.Element("div").Attribute("id").Should().NotBeNull();
            xml.Element("div").Attribute("id").Value.Should().Be("TestProperty");
        }

        [TestMethod]
        public void JQueryDropdownlistFor_GeneratesIdAttributeWithTemplateInfo() {
            var viewModel = CreateViewModel();
            var viewData = new ViewDataDictionary<TestViewModel>() { Model = viewModel };
            var htmlHelper = CreateHtmlHelper<TestViewModel>(viewData);

            htmlHelper.ViewData.TemplateInfo.HtmlFieldPrefix = "TestViewModel";

            var html = htmlHelper.JQueryDropdownlistFor(model => model.TestProperty);
            var xml = XElement.Parse($"<list>{html}</list>");

            xml.Element("div").Attribute("id").Should().NotBeNull();
            xml.Element("div").Attribute("id").Value.Should().Be("TestViewModel_TestProperty");
        }

        [TestMethod]
        public void JQueryDropdownlistFor_GeneratesFieldNameAttribute() {
            var viewModel = CreateViewModel();
            var viewData = new ViewDataDictionary<TestViewModel>() { Model = viewModel };
            var htmlHelper = CreateHtmlHelper<TestViewModel>(viewData);

            var html = htmlHelper.JQueryDropdownlistFor(model => model.TestProperty);
            var xml = XElement.Parse($"<list>{html}</list>");

            xml.Element("div").Attribute("data-field-name").Should().NotBeNull();
            xml.Element("div").Attribute("data-field-name").Value.Should().Be("TestProperty.SelectedValues");
        }

        [TestMethod]
        public void JQueryDropdownlistFor_GeneratesFieldNameAttributeWithTemplateInfo() {
            var viewModel = CreateViewModel();
            var viewData = new ViewDataDictionary<TestViewModel>() { Model = viewModel };
            var htmlHelper = CreateHtmlHelper<TestViewModel>(viewData);

            htmlHelper.ViewData.TemplateInfo.HtmlFieldPrefix = "TestViewModel";

            var html = htmlHelper.JQueryDropdownlistFor(model => model.TestProperty);
            var xml = XElement.Parse($"<list>{html}</list>");

            xml.Element("div").Attribute("data-field-name").Should().NotBeNull();
            xml.Element("div").Attribute("data-field-name").Value.Should().Be("TestViewModel.TestProperty.SelectedValues");
        }

        [TestMethod]
        public void JQueryDropdownlistFor_GeneratesValueAttributes() {
            var viewModel = CreateViewModel();
            var viewData = new ViewDataDictionary<TestViewModel>() { Model = viewModel };
            var htmlHelper = CreateHtmlHelper<TestViewModel>(viewData);

            var html = htmlHelper.JQueryDropdownlistFor(model => model.TestProperty);
            var xml = XElement.Parse($"<list>{html}</list>");

            var xmlItems = xml.Element("div").Elements().ToList();
            var viewModelItems = viewModel.TestProperty.Items.ToList();

            for (var i = 0; i < xmlItems.Count; i++) {
                xmlItems[i].Attribute("data-value").Should().NotBeNull();
                xmlItems[i].Attribute("data-value").Value.Should().Be(viewModelItems[i].Value);
            }
        }

        [TestMethod]
        public void JQueryDropdownlistFor_GeneratesInnerText() {
            var viewModel = CreateViewModel();
            var viewData = new ViewDataDictionary<TestViewModel>() { Model = viewModel };
            var htmlHelper = CreateHtmlHelper<TestViewModel>(viewData);

            var html = htmlHelper.JQueryDropdownlistFor(model => model.TestProperty);
            var xml = XElement.Parse($"<list>{html}</list>");

            var xmlItems = xml.Element("div").Elements().ToList();
            var viewModelItems = viewModel.TestProperty.Items.ToList();

            for (var i = 0; i < xmlItems.Count; i++) {
                xmlItems[i].Value.Should().NotBeNull();
                xmlItems[i].Value.Should().Be(viewModelItems[i].Text);
            }
        }

        [TestMethod]
        public void JQueryDropdownlistFor_GeneratesScriptFunctionCall() {
            var viewModel = CreateViewModel();
            var viewData = new ViewDataDictionary<TestViewModel>() { Model = viewModel };
            var htmlHelper = CreateHtmlHelper<TestViewModel>(viewData);

            var html = htmlHelper.JQueryDropdownlistFor(model => model.TestProperty);
            var xml = XElement.Parse($"<list>{html}</list>");

            xml.Element("script").Value.Should().NotBeNull();
            xml.Element("script").Value.Trim().Should().Be("$(function () { $('div#TestProperty').dropdownlist(); });");
        }

        [TestMethod]
        public void JQueryDropdownlistFor_GeneratesMultiselectAttribute() {
            var viewModel = CreateViewModel();
            var viewData = new ViewDataDictionary<TestViewModel>() { Model = viewModel };
            var htmlHelper = CreateHtmlHelper<TestViewModel>(viewData);

            viewModel.TestProperty.IsMultiselect = true;

            var html = htmlHelper.JQueryDropdownlistFor(model => model.TestProperty);
            var xml = XElement.Parse($"<list>{html}</list>");

            xml.Element("div").Attribute("data-multiselect").Should().NotBeNull();
            xml.Element("div").Attribute("data-multiselect").Value.Should().Be("true");
        }

        [TestMethod]
        public void JQueryDropdownlistFor_OmitsMultiselectAttributeByDefault() {
            var viewModel = CreateViewModel();
            var viewData = new ViewDataDictionary<TestViewModel>() { Model = viewModel };
            var htmlHelper = CreateHtmlHelper<TestViewModel>(viewData);

            var html = htmlHelper.JQueryDropdownlistFor(model => model.TestProperty);
            var xml = XElement.Parse($"<list>{html}</list>");

            xml.Element("div").Attribute("data-multiselect").Should().BeNull();
        }

        [TestMethod]
        public void JQueryDropdownlistFor_GeneratesSelectedAttributes() {
            var viewModel = CreateViewModel();
            var viewData = new ViewDataDictionary<TestViewModel>() { Model = viewModel };
            var htmlHelper = CreateHtmlHelper<TestViewModel>(viewData);

            var html = htmlHelper.JQueryDropdownlistFor(model => model.TestProperty);
            var xml = XElement.Parse($"<list>{html}</list>");

            var xmlItems = xml.Element("div").Elements().ToList();
            var viewModelItems = viewModel.TestProperty.Items.ToList();

            for (var i = 0; i < xmlItems.Count; i++) {
                var shouldBeSelected = viewModel.TestProperty.SelectedValues.Contains(viewModelItems[i].Value);

                if (shouldBeSelected) {
                    xmlItems[i].Attribute("data-selected").Should().NotBeNull();
                    xmlItems[i].Attribute("data-selected").Value.Should().Be("true");
                }
                else {
                    xmlItems[i].Attribute("data-selected").Should().BeNull();
                }
            }
        }

        [TestMethod]
        public void JQueryDropdownlistFor_GeneratesTextSearchAttribute() {
            var viewModel = CreateViewModel();
            var viewData = new ViewDataDictionary<TestViewModel>() { Model = viewModel };
            var htmlHelper = CreateHtmlHelper<TestViewModel>(viewData);

            viewModel.TestProperty.HasTextSearch = true;

            var html = htmlHelper.JQueryDropdownlistFor(model => model.TestProperty);
            var xml = XElement.Parse($"<list>{html}</list>");

            xml.Element("div").Attribute("data-text-search").Should().NotBeNull();
            xml.Element("div").Attribute("data-text-search").Value.Should().Be("true");
        }

        [TestMethod]
        public void JQueryDropdownlistFor_OmitsTextSearchAttributeByDefault() {
            var viewModel = CreateViewModel();
            var viewData = new ViewDataDictionary<TestViewModel>() { Model = viewModel };
            var htmlHelper = CreateHtmlHelper<TestViewModel>(viewData);

            var html = htmlHelper.JQueryDropdownlistFor(model => model.TestProperty);
            var xml = XElement.Parse($"<list>{html}</list>");

            xml.Element("div").Attribute("data-text-search").Should().BeNull();
        }

        [TestMethod]
        public void JQueryDropdownlistFor_OmitsSelectAllItemForSingleSelect() {
            var viewModel = CreateViewModel();
            var viewData = new ViewDataDictionary<TestViewModel>() { Model = viewModel };
            var htmlHelper = CreateHtmlHelper<TestViewModel>(viewData);

            viewModel.TestProperty.HasSelectAll = true;

            var html = htmlHelper.JQueryDropdownlistFor(model => model.TestProperty);
            var xml = XElement.Parse($"<list>{html}</list>");

            xml.Element("div").Elements().Should().HaveCount(viewModel.TestProperty.Items.Count());
        }

        [TestMethod]
        public void JQueryDropdownlistFor_GeneratesSelectAllItem() {
            var viewModel = CreateViewModel();
            var viewData = new ViewDataDictionary<TestViewModel>() { Model = viewModel };
            var htmlHelper = CreateHtmlHelper<TestViewModel>(viewData);

            viewModel.TestProperty.IsMultiselect = true;
            viewModel.TestProperty.HasSelectAll = true;

            var html = htmlHelper.JQueryDropdownlistFor(model => model.TestProperty);
            var xml = XElement.Parse($"<list>{html}</list>");

            xml.Element("div").Elements().Should().HaveCount(viewModel.TestProperty.Items.Count() + 1);
            xml.Element("div").Elements().First().Attribute("data-select-all").Should().NotBeNull();
            xml.Element("div").Elements().First().Attribute("data-select-all").Value.Should().Be("true");
        }

        [TestMethod]
        public void JQueryDropdownlistFor_GeneratesSelectAllItemWithCorrectText() {
            var viewModel = CreateViewModel();
            var viewData = new ViewDataDictionary<TestViewModel>() { Model = viewModel };
            var htmlHelper = CreateHtmlHelper<TestViewModel>(viewData);

            viewModel.TestProperty.IsMultiselect = true;
            viewModel.TestProperty.HasSelectAll = true;
            viewModel.TestProperty.GetSelectAllText = () => "Select all items";

            var html = htmlHelper.JQueryDropdownlistFor(model => model.TestProperty);
            var xml = XElement.Parse($"<list>{html}</list>");

            xml.Element("div").Elements().Should().HaveCount(viewModel.TestProperty.Items.Count() + 1);
            xml.Element("div").Elements().First().Value.Should().Be("Select all items");
        }

        [TestMethod]
        public void JQueryDropdownlistFor_GeneratesHtmlAttributesFromObject() {
            var viewModel = CreateViewModel();
            var viewData = new ViewDataDictionary<TestViewModel>() { Model = viewModel };
            var htmlHelper = CreateHtmlHelper<TestViewModel>(viewData);

            var html = htmlHelper.JQueryDropdownlistFor(model => model.TestProperty, new { @class = "form-control" });
            var xml = XElement.Parse($"<list>{html}</list>");

            xml.Element("div").Attribute("class").Should().NotBeNull();
            xml.Element("div").Attribute("class").Value.Should().Be("form-control");
        }

        [TestMethod]
        public void JQueryDropdownlistFor_GeneratesHtmlAttributesFromDictionary() {
            var viewModel = CreateViewModel();
            var viewData = new ViewDataDictionary<TestViewModel>() { Model = viewModel };
            var htmlHelper = CreateHtmlHelper<TestViewModel>(viewData);

            var html = htmlHelper.JQueryDropdownlistFor(model => model.TestProperty, new Dictionary<string, object>() { { "class", "form-control" } });
            var xml = XElement.Parse($"<list>{html}</list>");

            xml.Element("div").Attribute("class").Should().NotBeNull();
            xml.Element("div").Attribute("class").Value.Should().Be("form-control");
        }

        [TestMethod]
        public void JQueryDropdownlistFor_WorksForEmptyModel() {
            var viewModel = new TestViewModel() {
                TestProperty = new JQueryDropdownlist() {
                    // Explicitly also test select all text
                    HasSelectAll = true,
                    GetSelectAllText = null
                }
            };
            var viewData = new ViewDataDictionary<TestViewModel>() { Model = viewModel };
            var htmlHelper = CreateHtmlHelper<TestViewModel>(viewData);

            htmlHelper.Invoking(html => html.JQueryDropdownlistFor(model => model.TestProperty)).Should().NotThrow();
        }

        public TestViewModel CreateViewModel() {
            return new TestViewModel() {
                TestProperty = new JQueryDropdownlist() {
                    Items = new[] {
                        new JQueryDropdownlistItem() { Value = "1a", Text = "Option 1a" },
                        new JQueryDropdownlistItem() { Value = "1b", Text = "Option 1b" },
                        new JQueryDropdownlistItem() { Value = "2", Text = "Choice 2" },
                        new JQueryDropdownlistItem() { Value = "3", Text = "Third choice" }
                    },
                    SelectedValues = new[] { "1b", "2" }
                }
            };
        }

        public HtmlHelper<T> CreateHtmlHelper<T>(ViewDataDictionary viewData) {
            var controllerContext = Substitute.For<ControllerContext>();
            var viewContext = Substitute.For<ViewContext>(controllerContext, Substitute.For<IView>(), viewData, new TempDataDictionary(), TextWriter.Null);
            var viewDataContainer = Substitute.For<IViewDataContainer>();

            viewDataContainer.ViewData.Returns(viewData);

            return new HtmlHelper<T>(viewContext, viewDataContainer);
        }
    }
}
