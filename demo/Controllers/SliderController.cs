using System.Web.Mvc;

namespace vdt.demo.Controllers {
    [RoutePrefix("Slider")]
    public class SliderController : Controller {
        [Route]
        [Route("Index")]
        public ActionResult Index() {
            return View();
        }
    }
}