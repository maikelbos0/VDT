using System.Web.Mvc;

namespace vdt.demo.Controllers {
    [RoutePrefix("Datagridview")]
    public class DatagridviewController : Controller {
        [Route]
        [Route("Index")]
        public ActionResult Index() {
            return View();
        }
    }
}