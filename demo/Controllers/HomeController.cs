using System.Web.Mvc;
using vdt.demo.Models;
using vdt.jquerydropdownlist.MVC;

namespace vdt.demo.Controllers {
    [RoutePrefix("Home")]
    public class HomeController : Controller {
        [Route("~/")]
        [Route]
        [Route("Index")]
        public ActionResult Index() {
            return View(new ExampleViewModel() {
                DemoProperty = new JQueryDropdownlist() {
                    Items = new [] {
                        new JQueryDropdownlistItem() { Value = "1a", Text = "Option 1a" },
                        new JQueryDropdownlistItem() { Value = "1b", Text = "Option 1b" },
                        new JQueryDropdownlistItem() { Value = "2", Text = "Choice 2" },
                        new JQueryDropdownlistItem() { Value = "3", Text = "Third choice" },
                    },
                    SelectedValues = new[] { "1b", "2" },
                    IsMultiselect = true,
                    HasTextSearch = true,
                    HasSelectAll = true,
                    GetSelectAllText = () => "Select all items"
                }
            });
        }
    }
}