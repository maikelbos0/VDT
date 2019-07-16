using System;
using System.Linq.Expressions;
using System.Web;
using System.Web.Mvc;

namespace vdt.jquerydropdownlist.MVC {
    public static class HtmlHelperExtensions {
        public static IHtmlString JQueryDropdownlistFor<TModel>(this HtmlHelper<TModel> html, Expression<Func<TModel, string>> expression) {
            return new MvcHtmlString(expression.Compile().Invoke(html.ViewData.Model));
        }
    }
}
