namespace vdt.demo.Models {
    public class DataGridViewMetaData {
        public string sortColumn { get; set; }
        public bool sortDescending { get; set; }
        public int totalRows { get; set; }
        public int page { get; set; }
        public int rowsPerPage { get; set; }
    }
}