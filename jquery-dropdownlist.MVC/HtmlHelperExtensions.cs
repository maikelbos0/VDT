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

        private static string GetAttributeValues(IDictionary<string, object> htmlAttributes, string key, params string[] fallbackValues) {
            object attributeValue;

            if (htmlAttributes != null && htmlAttributes.TryGetValue(key, out attributeValue) && attributeValue != null) {
                return attributeValue.ToString();
            }

            return fallbackValues.FirstOrDefault(v => !string.IsNullOrEmpty(v));
        }

        public static MvcHtmlString JQueryDropdownlistFor<TModel>(this HtmlHelper<TModel> html,
                                                                  Expression<Func<TModel, JQueryDropdownlist>> expression,
                                                                  IDictionary<string, object> htmlAttributes) {
            var list = expression.Compile().Invoke(html.ViewData.Model);
            var selectedValues = list.SelectedValues?.ToHashSet();
            var listBuilder = new TagBuilder("div");
            var listItemsBuilder = new StringBuilder();
            var outputBuilder = new StringBuilder();
            var htmlFieldName = html.ViewData.TemplateInfo.GetFullHtmlFieldName(ExpressionHelper.GetExpressionText(expression));
            var id = TagBuilder.CreateSanitizedId(GetAttributeValues(htmlAttributes, "id", htmlFieldName, $"jquery-dropdownlist-{Guid.NewGuid()}"));
            var name = GetAttributeValues(htmlAttributes, "name", htmlFieldName + ".SelectedValues");

            listBuilder.MergeAttribute("id", id);

            if (!string.IsNullOrEmpty(name)) {
                listBuilder.MergeAttribute("data-field-name", name);
            }

            if (list.IsMultiselect) {
                listBuilder.MergeAttribute("data-multiselect", "true");
            }

            if (list.HasTextSearch) {
                listBuilder.MergeAttribute("data-text-search", "true");
            }

            if (list.HasSelectAll) {
                var itemBuilder = new TagBuilder("div");
                itemBuilder.MergeAttribute("data-select-all", "true");

                if (list.GetSelectAllText != null) {
                    itemBuilder.SetInnerText(list.GetSelectAllText());
                }

                listItemsBuilder.AppendLine(itemBuilder.ToString());
            }

            if (list.Items != null) {
                foreach (var item in list.Items) {
                    var itemBuilder = new TagBuilder("div");
                    itemBuilder.SetInnerText(item.Text);
                    itemBuilder.MergeAttribute("data-value", item.Value);

                    if (selectedValues != null && selectedValues.Contains(item.Value)) {
                        itemBuilder.MergeAttribute("data-selected", "true");
                    }

                    listItemsBuilder.AppendLine(itemBuilder.ToString());
                }
            }

            listBuilder.InnerHtml = listItemsBuilder.ToString();
            listBuilder.MergeAttributes(htmlAttributes);

            outputBuilder.AppendLine(listBuilder.ToString());
            outputBuilder.AppendLine("<script type=\"text/javascript\">");
            outputBuilder.AppendLine($"$(function () {{ $('div#{id}').dropdownlist(); }});");
            outputBuilder.AppendLine("</script>");

            return new MvcHtmlString(outputBuilder.ToString());
        }
    }
}
