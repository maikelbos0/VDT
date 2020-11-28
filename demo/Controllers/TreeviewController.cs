using System.Web.Mvc;

namespace vdt.demo.Controllers {
    [RoutePrefix("Treeview")]
    public class TreeviewController : Controller {
        [Route]
        [Route("Index")]
        public ActionResult Index() {
            return View();
        }
    }
}