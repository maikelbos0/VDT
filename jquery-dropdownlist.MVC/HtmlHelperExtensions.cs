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
            var outputBuilder = new StringBuilder();
            string id;
            object idObject;

            // We require an ID to be able to find the outer element in script
            if (htmlAttributes != null && htmlAttributes.TryGetValue("id", out idObject)) {
                id = idObject.ToString();
            }
            else {
                id = html.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(ExpressionHelper.GetExpressionText(expression));

                if (string.IsNullOrWhiteSpace(id)) {                    
                    id = $"jquery-dropdownlist-{Guid.NewGuid()}";
                }
            }

            id = TagBuilder.CreateSanitizedId(id);
            listBuilder.MergeAttribute("id", id);

            foreach (var value in expression.Compile().Invoke(html.ViewData.Model)) {
                var itemBuilder = new TagBuilder("div");
                itemBuilder.SetInnerText(value);
                listItemsBuilder.AppendLine(itemBuilder.ToString());
            }

            listBuilder.InnerHtml = listItemsBuilder.ToString();
            listBuilder.MergeAttributes(htmlAttributes);

            outputBuilder.AppendLine(listBuilder.ToString());
            outputBuilder.AppendLine("<script type=\"text/javascript\">");
            outputBuilder.AppendLine("$(function () {");
            outputBuilder.AppendLine($"  $('div#{id}').dropdownlist();");
            outputBuilder.AppendLine("});");
            outputBuilder.AppendLine("</script>");

            return new MvcHtmlString(outputBuilder.ToString());
        }
    }
}
