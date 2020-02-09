using System.Globalization;
using System.Web.Mvc;

namespace vdt.demo.Controllers {
    [RoutePrefix("Numericinput")]
        public class NumericinputController : Controller {
        [Route]
        [Route("Index")]
        public ActionResult Index() {
            CultureInfo.CurrentCulture = CultureInfo.GetCultureInfo("nl-NL");

            return View();
        }
    }
}