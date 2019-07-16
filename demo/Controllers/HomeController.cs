using System.Web.Mvc;
using vdt.demo.Models;

namespace vdt.demo.Controllers {
    [RoutePrefix("Home")]
    public class HomeController : Controller {
        [Route("~/")]
        [Route]
        [Route("Index")]
        public ActionResult Index() {
            return View(new ExampleViewModel() {
                DemoProperty = "A value"
            });
        }
    }
}