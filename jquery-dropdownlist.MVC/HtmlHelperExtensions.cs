using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace vdt.jquerydropdownlist.MVC {
    public static class HtmlHelperExtensions {
        public static MvcHtmlString JQueryDropdownlistFor<TModel>(this HtmlHelper<TModel> html,
                                                                  Expression<Func<TModel, JQueryDropdownlist>> expression) {
            return JQueryDropdownlistFor(html, expression, null);
        }

        public static MvcHtmlString JQueryDropdownlistFor<TModel>(this HtmlHelper<TModel> html,
                                                                  Expression<Func<TModel, JQueryDropdownlist>> expression,
                                                                  object htmlAttributes) {
            return JQueryDropdownlistFor(html, expression, HtmlHelper.AnonymousObjectToHtmlAttributes(htmlAttributes));
        }

        public static MvcHtmlString JQueryDropdownlistFor<TModel>(this HtmlHelper<TModel> html,
                                                                  Expression<Func<TModel, JQueryDropdownlist>> expression,
                                                                  IDictionary<string, object> htmlAttributes) {
            var list = expression.Compile().Invoke(html.ViewData.Model);
            var selectedValues = list.SelectedValues.ToHashSet();
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

            if (list.IsMultiselect) {
                listBuilder.MergeAttribute("data-multiselect", "true");
            }

            if (list.HasTextSearch) {
                listBuilder.MergeAttribute("data-text-search", "true");
            }

            if (list.HasSelectAll) {
                var itemBuilder = new TagBuilder("div");
                itemBuilder.MergeAttribute("data-select-all", "true");
                itemBuilder.SetInnerText(list.GetSelectAllText());
                listItemsBuilder.AppendLine(itemBuilder.ToString());
            }

            foreach (var item in list.Items) {
                var itemBuilder = new TagBuilder("div");
                itemBuilder.SetInnerText(item.Text);
                itemBuilder.MergeAttribute("data-value", item.Value);

                if (selectedValues.Contains(item.Value)) {
                    itemBuilder.MergeAttribute("data-selected", "true");
                }

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
