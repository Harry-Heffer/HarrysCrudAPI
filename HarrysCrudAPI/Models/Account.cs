using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace HarrysCrudAPI.Models
{
    public class Account
    {
        [Key]
        public int AccountId { get; set; }
        [DisplayName("AcountCode")]
        public string AccountCode { get; set; }
        [Required]
        [DisplayName("Account Name")]
        public string AccountName { get; set; }
        public string? Address { get; set; }
        [DisplayName("Phone Number")]
        public string? PhoneNumber { get; set; }
        [DisplayName("Email Address")]
        public string? EmailAddress { get; set; }
        public int PaymentTerms { get; set; }
        public string TermsType { get; set; }
    }
}
