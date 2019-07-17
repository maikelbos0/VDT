using System;
using System.Collections.Generic;
using System.Linq;

namespace vdt.jquerydropdownlist.MVC {
    public static class LinqExtensions {
        public static JQueryDropdownlist ToJQueryDropdownlist(this Dictionary<string, string> source) {
            return ToJQueryDropdownlist(source, item => item.Key, item => item.Value);
        }

        public static JQueryDropdownlist ToJQueryDropdownlist(this IEnumerable<string> source) {
            return ToJQueryDropdownlist(source, item => item);
        }

        public static JQueryDropdownlist ToJQueryDropdownlist<T>(this IEnumerable<T> source, Func<T, string> valueSelector) {
            return ToJQueryDropdownlist(source, valueSelector, valueSelector);
        }

        public static JQueryDropdownlist ToJQueryDropdownlist<T>(this IEnumerable<T> source, Func<T, string> valueSelector, Func<T, string> textSelector) {
            return ToJQueryDropdownlist(source, valueSelector, textSelector, item => false);
        }

        public static JQueryDropdownlist ToJQueryDropdownlist<T>(this IEnumerable<T> source, Func<T, string> valueSelector, Func<T, string> textSelector, Func<T, bool> isSelectedSelector) {
            return new JQueryDropdownlist() {
                Items = source.Select(item => new JQueryDropdownlistItem() {
                    Value = valueSelector(item),
                    Text = textSelector(item)
                }),
                SelectedValues = source.Where(isSelectedSelector).Select(textSelector)
            };
        }
    }
}
