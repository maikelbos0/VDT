using System;

namespace vdt.demo.Models {
    public class InvoiceGridItemViewModel {
        public string DebtorNumber { get; set; }
        public string DebtorName { get; set; }
        public string InvoiceNumber { get; set; }
        public DateTime InvoiceDate { get; set; }
        public string InvoiceDateString { get { return InvoiceDate.ToShortDateString(); } }
        public DateTime DueDate { get; set; }
        public string DueDateString { get { return DueDate.ToShortDateString(); } }
        public string Currency { get; set; }
        public decimal InvoiceAmount { get; set; }
        public string InvoiceAmountString { get { return InvoiceAmount.ToString("N2"); } }
        public decimal InvoiceOpenAmount { get; set; }
        public string InvoiceOpenAmountString { get { return InvoiceOpenAmount.ToString("N2"); } }
    }
}