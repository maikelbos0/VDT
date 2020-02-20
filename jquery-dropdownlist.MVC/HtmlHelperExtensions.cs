using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Web.Mvc;

namespace vdt.jquerydropdownlist.MVC {
    public static class HtmlHelperExtensions {
        /// <summary>
        /// Returns a jQuery-dropdownlist element for the property in the object that is represented by the specified expression.
        /// </summary>
        /// <typeparam name="TModel">The type of the model.</typeparam>
        /// <param name="html">The HTML helper instance that this method extends.</param>
        /// <param name="expression">An expression that identifies the object that contains the properties to render.</param>
        /// <returns>An HTML div element with script to transform it into a jQuery-dropdownlist for the property in the object that is represented by the specified expression.</returns>
        public static MvcHtmlString JQueryDropdownlistFor<TModel>(this HtmlHelper<TModel> html,
                                                                  Expression<Func<TModel, JQueryDropdownlist>> expression) {
            return JQueryDropdownlistFor(html, expression, null);
        }

        /// <summary>
        /// Returns a jQuery-dropdownlist element for the property in the object that is represented by the specified expression.
        /// </summary>
        /// <typeparam name="TModel">The type of the model.</typeparam>
        /// <param name="html">The HTML helper instance that this method extends.</param>
        /// <param name="expression">An expression that identifies the object that contains the properties to render.</param>
        /// <param name="htmlAttributes">An object that contains the HTML attributes to set for the element.</param>
        /// <returns>An HTML div element with script to transform it into a jQuery-dropdownlist for the property in the object that is represented by the specified expression.</returns>
        public static MvcHtmlString JQueryDropdownlistFor<TModel>(this HtmlHelper<TModel> html,
                                                                  Expression<Func<TModel, JQueryDropdownlist>> expression,
                                                                  object htmlAttributes) {
            return JQueryDropdownlistFor(html, expression, HtmlHelper.AnonymousObjectToHtmlAttributes(htmlAttributes));
        }

        /// <summary>
        /// Returns a jQuery-dropdownlist element for the property in the object that is represented by the specified expression.
        /// </summary>
        /// <typeparam name="TModel">The type of the model.</typeparam>
        /// <param name="html">The HTML helper instance that this method extends.</param>
        /// <param name="expression">An expression that identifies the object that contains the properties to render.</param>
        /// <param name="htmlAttributes">An object that contains the HTML attributes to set for the element.</param>
        /// <returns>An HTML div element with script to transform it into a jQuery-dropdownlist for the property in the object that is represented by the specified expression.</returns>
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

            if (list.IsDisabled) {
                listBuilder.MergeAttribute("data-disabled", "true");
            }

            if (list.IsMultiselect) {
                listBuilder.MergeAttribute("data-multiselect", "true");

                if (list.HasSelectAll) {
                    var itemBuilder = new TagBuilder("div");
                    itemBuilder.MergeAttribute("data-select-all", "true");

                    if (list.GetSelectAllText != null) {
                        itemBuilder.SetInnerText(list.GetSelectAllText());
                    }

                    listItemsBuilder.AppendLine(itemBuilder.ToString());
                }
            }

            if (list.HasTextSearch) {
                listBuilder.MergeAttribute("data-text-search", "true");

                if (list.IsTextSearchInsideSelector) {
                    listBuilder.MergeAttribute("data-selector-text-search", "true");
                }
            }

            if (list.GetEmptyText != null) {
                listBuilder.MergeAttribute("data-empty-text", list.GetEmptyText());
            }

            if (list.HasDynamicPositioning) {
                listBuilder.MergeAttribute("data-dynamic-positioning", "true");
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
            listBuilder.MergeAttributes(htmlAttributes, true);

            outputBuilder.AppendLine(listBuilder.ToString());
            outputBuilder.AppendLine("<script type=\"text/javascript\">");
            outputBuilder.AppendLine($"$(function () {{ $('div#{id}').dropdownlist(); }});");
            outputBuilder.AppendLine("</script>");

            return new MvcHtmlString(outputBuilder.ToString());
        }

        private static string GetAttributeValues(IDictionary<string, object> htmlAttributes, string key, params string[] fallbackValues) {
            object attributeValue;

            if (htmlAttributes != null && htmlAttributes.TryGetValue(key, out attributeValue) && attributeValue != null) {
                return attributeValue.ToString();
            }

            return fallbackValues.FirstOrDefault(v => !string.IsNullOrEmpty(v));
        }
    }
}
