using System;
using System.Collections.Generic;

namespace vdt.jquerydropdownlist.MVC {
    public class JQueryDropdownlist {
        public IEnumerable<JQueryDropdownlistItem> Items { get; set; }
        public IEnumerable<string> SelectedValues { get; set; }
        public bool IsMultiselect { get; set; }
        public bool HasTextSearch { get; set; }
        public bool HasSelectAll { get; set; }
        public Func<string> GetSelectAllText { get; set; } = () => "Select all";
    }
}
