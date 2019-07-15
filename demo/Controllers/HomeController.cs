using System.Web.Mvc;

namespace vdt.demo.Controllers {
    [RoutePrefix("Home")]
    public class HomeController : Controller {
        [Route("~/")]
        [Route]
        [Route("Index")]
        public ActionResult Index() {
            return View();
        }
    }
}