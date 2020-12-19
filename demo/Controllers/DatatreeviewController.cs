using System.Web.Mvc;

namespace vdt.demo.Controllers {
    [RoutePrefix("Datatreeview")]
    public class DatatreeviewController : Controller {
        [Route]
        [Route("Index")]
        public ActionResult Index() {
            return View();
        }
    }
}