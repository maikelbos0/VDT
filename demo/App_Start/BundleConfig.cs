﻿using System.Web.Optimization;

namespace vdt.demo.App_Start {
    public class BundleConfig {
        public static void RegisterBundles(BundleCollection bundles) {
            bundles.Add(new ScriptBundle("~/Scripts/jquery").Include(
                "~/Scripts/jquery-3.5.0.min.js",
                "~/../jquery-dropdownlist/Scripts/jquery-dropdownlist.js",
                "~/../jquery-datagridview/Scripts/jquery-datagridview.js",
                "~/../jquery-rangeslider/Scripts/jquery-rangeslider.js",
                "~/../jquery-numericinput/Scripts/jquery-numericinput.js",
                "~/../jquery-datatreeview/Scripts/jquery-datatreeview.js"));

            bundles.Add(new ScriptBundle("~/Scripts/bootstrap").Include(
                "~/Scripts/bootstrap.min.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/bootstrap.min.css",
                "~/Content/Site.css",
                "~/../jquery-dropdownlist/Content/jquery-dropdownlist.css",
                "~/../jquery-dropdownlist/Content/jquery-dropdownlist.style.css",
                "~/../jquery-datagridview/Content/jquery-datagridview.css",
                "~/../jquery-datagridview/Content/jquery-datagridview.style.css",
                "~/../jquery-rangeslider/Content/jquery-rangeslider.css",
                "~/../jquery-rangeslider/Content/jquery-rangeslider.style.css",
                "~/../jquery-numericinput/Content/jquery-numericinput.style.css",
                "~/../jquery-datatreeview/Content/jquery-datatreeview.css"));
        }
    }
}
