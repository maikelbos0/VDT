using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Web;
using System.Web.Mvc;

namespace vdt.jquerydropdownlist.MVC {
    public static class HtmlHelperExtensions {
        public static MvcHtmlString JQueryDropdownlistFor<TModel>(this HtmlHelper<TModel> html,
                                                                  Expression<Func<TModel, string>> expression) {
            return JQueryDropdownlistFor(html, expression, null);
        }

        public static MvcHtmlString JQueryDropdownlistFor<TModel>(this HtmlHelper<TModel> html,
                                                                  Expression<Func<TModel, string>> expression,
                                                                  object htmlAttributes) {
            return JQueryDropdownlistFor(html, expression, HtmlHelper.AnonymousObjectToHtmlAttributes(htmlAttributes));
        }

        public static MvcHtmlString JQueryDropdownlistFor<TModel>(this HtmlHelper<TModel> html,
                                                                  Expression<Func<TModel, string>> expression,
                                                                  IDictionary<string, object> htmlAttributes) {
            var builder = new TagBuilder("div");
            var id = ExpressionHelper.GetExpressionText(expression);

            if (!string.IsNullOrWhiteSpace(id)) {
                builder.MergeAttribute("id", TagBuilder.CreateSanitizedId(id));
            }
            
            builder.SetInnerText(expression.Compile().Invoke(html.ViewData.Model));
            builder.MergeAttributes(htmlAttributes, true);

            return new MvcHtmlString(builder.ToString());
        }
    }
}
