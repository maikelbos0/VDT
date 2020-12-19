using System.Web.Mvc;

namespace vdt.demo.Controllers {
    [RoutePrefix("Rangeslider")]
    public class RangesliderController : Controller {
        [Route]
        [Route("Index")]
        public ActionResult Index() {
            return View();
        }
    }
}