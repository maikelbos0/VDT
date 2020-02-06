using System.Globalization;
using System.Web.Mvc;

namespace vdt.demo.Controllers {
    [RoutePrefix("NumericInput")]
        public class NumericInputController : Controller {
        [Route]
        [Route("Index")]
        public ActionResult Index() {
            CultureInfo.CurrentCulture = CultureInfo.GetCultureInfo("as-IN");

            return View();
        }
    }
}