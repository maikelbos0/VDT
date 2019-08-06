using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using vdt.demo.Models;

namespace vdt.demo.Controllers {
    [RoutePrefix("Datagridview")]
    public class DatagridviewController : Controller {
        [Route]
        [Route("Index")]
        public ActionResult Index() {
            return View();
        }

        [HttpPost]
        [Route("GetInvoiceGridItems")]
        public JsonResult GetInvoiceGridItems(DataGridViewMetaData metaData) {
            var items = GenerateInvoiceGridItems().Take(50);
            
            if (metaData != null && metaData.sortColumn != null) {
                var property = typeof(InvoiceGridItemViewModel).GetProperty(metaData.sortColumn);

                if (property != null) {
                    if (metaData.sortDescending) {
                        items = items.OrderByDescending(i => property.GetValue(i));
                    }
                    else {
                        items = items.OrderBy(i => property.GetValue(i));
                    }
                }
            }

            return Json(items);
        }

        public IEnumerable<InvoiceGridItemViewModel> GenerateInvoiceGridItems() {
            var currencies = new[] { "EUR", "GBP", "SEK", "USD" };
            var i = 0;

            while (true) {
                yield return new InvoiceGridItemViewModel() {
                    DebtorNumber = $"A{(i / 5) + 123:000000}",
                    DebtorName = GenerateName(i),
                    InvoiceNumber = $"{i + 455:00000000}",
                    InvoiceDate = new System.DateTime(2019, 1, 1).AddDays(i),
                    DueDate = new System.DateTime(2019, 1, 31).AddDays(i),
                    Currency = currencies[i % currencies.Length],
                    InvoiceAmount = 123.45m + (3 - i % 5) * 181 + (i % 223 * 1.03m),
                    InvoiceOpenAmount = 123.45m + (5 - i % 7) * 181 + (i % 223 * 1.13m)
                };

                i++;
            }
        }

        public string GenerateName(int i) {
            var wordLengthMods = new[] { 7, 3, 5, 3 };
            var wordCount = (i + 3) % 4 + 1;
            var nameBuilder = new System.Text.StringBuilder();

            for (var w = 0; w < wordCount; w++) {
                nameBuilder.Append((char)('A' + (i * 3 + w * 7) % 26));

                for (var c = 0; c < i % wordLengthMods[w] + 1; c++) {
                    nameBuilder.Append((char)('a' + (i * 11 + w * 5 + c * 17) % 26));
                }

                nameBuilder.Append(" ");
            }

            return nameBuilder.ToString().Trim(' ');
        }
    }
}