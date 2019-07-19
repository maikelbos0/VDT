using Microsoft.VisualStudio.TestTools.UnitTesting;
using NSubstitute;
using FluentAssertions;
using System.Web.Mvc;
using System.Web;
using System.Web.Routing;
using System.IO;
using System.Xml.Linq;

namespace vdt.jquerydropdownlist.MVC.test {
    [TestClass]
    public class HtmlHelperExtensionTests {
        [TestMethod]
        public void JQueryDropdownlistFor_GeneratesHtmlElements() {
            var viewModel = new TestViewModel() {
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
            var viewData = new ViewDataDictionary<TestViewModel>() { Model = viewModel };
            var htmlHelper = CreateHtmlHelper<TestViewModel>(viewData);

            var html = htmlHelper.JQueryDropdownlistFor(model => model.TestProperty);
            var xml = XElement.Parse($"<list>{html}</list>");

            xml.Element("div").Should().NotBeNull();
            xml.Element("div").Elements().Should().HaveCount(4);
            xml.Element("script").Should().NotBeNull();
        }

        public HtmlHelper<T> CreateHtmlHelper<T>(ViewDataDictionary viewData) {
            var controllerContext = Substitute.For<ControllerContext>(Substitute.For<HttpContextBase>(), new RouteData(), Substitute.For<ControllerBase>());
            var viewContext = Substitute.For<ViewContext>(controllerContext, Substitute.For<IView>(), viewData, new TempDataDictionary(), TextWriter.Null);
            var viewDataContainer = Substitute.For<IViewDataContainer>();

            viewDataContainer.ViewData.Returns(viewData);

            return new HtmlHelper<T>(viewContext, viewDataContainer);
        }
    }
}
