using System.Web;
using System.Web.Optimization;

namespace vdt.demo.App_Start {
    public class BundleConfig {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles) {
            bundles.Add(new ScriptBundle("~/Scripts/jquery").Include(
                "~/Scripts/jquery-3.3.1.min.js",
                "~/../jquery-dropdownlist/Scripts/jquery-dropdownlist.js",
                "~/../jquery-datagridview/Scripts/jquery-datagridview.js"));

            bundles.Add(new ScriptBundle("~/Scripts/bootstrap").Include(
                "~/Scripts/bootstrap.min.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/bootstrap.min.css",
                "~/Content/Site.css",
                "~/../jquery-dropdownlist/Content/jquery-dropdownlist.css",
                "~/../jquery-datagridview/Content/jquery-datagridview.css"));
        }
    }
}
