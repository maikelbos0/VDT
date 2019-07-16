using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace vdt.jquerydropdownlist.MVC {
    public static class HtmlHelperExtensions {
        public static MvcHtmlString JQueryDropdownlistFor<TModel>(this HtmlHelper<TModel> html,
                                                                  Expression<Func<TModel, IEnumerable<string>>> expression) {
            return JQueryDropdownlistFor(html, expression, null);
        }

        public static MvcHtmlString JQueryDropdownlistFor<TModel>(this HtmlHelper<TModel> html,
                                                                  Expression<Func<TModel, IEnumerable<string>>> expression,
                                                                  object htmlAttributes) {
            return JQueryDropdownlistFor(html, expression, HtmlHelper.AnonymousObjectToHtmlAttributes(htmlAttributes));
        }

        public static MvcHtmlString JQueryDropdownlistFor<TModel>(this HtmlHelper<TModel> html,
                                                                  Expression<Func<TModel, IEnumerable<string>>> expression,
                                                                  IDictionary<string, object> htmlAttributes) {
            var listBuilder = new TagBuilder("div");
            var listItemsBuilder = new StringBuilder();
            var id = ExpressionHelper.GetExpressionText(expression);

            if (!string.IsNullOrWhiteSpace(id)) {
                listBuilder.MergeAttribute("id", TagBuilder.CreateSanitizedId(id));
            }
            
            foreach (var value in expression.Compile().Invoke(html.ViewData.Model)) {
                var itemBuilder = new TagBuilder("div");
                itemBuilder.SetInnerText(value);
                listItemsBuilder.Append(itemBuilder.ToString());
            }

            listBuilder.InnerHtml = listItemsBuilder.ToString();
            listBuilder.MergeAttributes(htmlAttributes, true);

            return new MvcHtmlString(listBuilder.ToString());
        }
    }
}
