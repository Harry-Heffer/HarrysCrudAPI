using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace HarrysCrudAPI.Models
{
    public class Invoice
    {
        [Key]
        public int InvoiceId { get; set; }
        [DisplayName("Invoice Number")]
        [Required]
        public string InvoiceNumber { get; set; }
        [DisplayName("Invoice Date")]
        [DataType(DataType.Date)]
        [Required]
        public DateTime InvoiceDate { get; set; }
        [DisplayName("Invoice Due Date")]
        [DataType(DataType.Date)]
        [Required]
        public DateTime InvoiceDueDate { get; set; }
        [DisplayName("NET Value")]
        [Required]
        public double Net { get; set; }
        [DisplayName("VAT Value")]
        [Required]
        public double Vat { get; set; }
        [DisplayName("GROSS Value")]
        [Required]
        public double Gross { get; set; }
        public string? Description { get; set; }
        [Required]
        public string AccountCode { get; set; }
        public string? AccountName { get; set; }
        [Required]
        public string Status { get; set; }
    }
}
