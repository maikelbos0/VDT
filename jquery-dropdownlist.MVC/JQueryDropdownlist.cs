using System;
using System.Collections.Generic;

namespace vdt.jquerydropdownlist.MVC {
    /// <summary>
    /// Represents a client-side jQuery-dropdownlist element.
    /// </summary>
    public class JQueryDropdownlist {
        /// <summary>
        /// Gets or sets the items to render when rendering the dropdownlist.
        /// </summary>
        public IEnumerable<JQueryDropdownlistItem> Items { get; set; }
        /// <summary>
        /// Gets or sets the items to select when rendering the dropdownlist. When the dropdownlist is used in a viewmodel parameter of a controller action, 
        /// this will contain the items that were selected client-side.
        /// </summary>
        public IEnumerable<string> SelectedValues { get; set; }
        /// <summary>
        /// Initialize the dropdownlist disabled or not
        /// </summary>
        public bool IsDisabled { get; set; }
        /// <summary>
        /// Gets or sets whether or not to render the dropdownlist as a multiselect dropdownlist.
        /// </summary>
        public bool IsMultiselect { get; set; }
        /// <summary>
        /// Gets or sets whether or not to render a text search for the dropdownlist.
        /// </summary>
        public bool HasTextSearch { get; set; }
        /// <summary>
        /// If true, the text search will replace the selector text on open.
        /// If false, the text search will be inside the dropdownlist as the first element.
        /// </summary>
        public bool IsTextSearchInsideSelector { get; set; }
        /// <summary>
        /// Gets or sets whether or not the dropdownlist has a select all option. This only applies if <see cref="IsMultiselect">IsMultiselect</see> is set to true.
        /// </summary>
        public bool HasSelectAll { get; set; }
        /// <summary>
        /// Gets or sets the function that returns the text for the select all option. This only applies if <see cref="IsMultiselect">IsMultiselect</see> 
        /// and <see cref="HasSelectAll">HasSelectAll</see> are set to true.
        /// </summary>
        public Func<string> GetSelectAllText { get; set; } = () => "Select all";
    }
}
