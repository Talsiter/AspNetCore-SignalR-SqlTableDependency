using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InAndOut.Models
{
  public class Expense
  {
    [Key]
    public int Id { get; set; }
    [DisplayName("Expense")]
    [Required]
    public string ExpenseName { get; set; }
    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Amount must be greater than 0!")]
    public int Amount { get; set; }





    // This is Optional because Entity Framework will automatically generate this
    [DisplayName("Expense Type")]
    public int ExpenseTypeId { get; set; }
    [ForeignKey("ExpenseTypeId")]


    // Here we are making a connection between the Expense Table and the ExpenseType Table
    public virtual ExpenseType ExpenseType { get; set; }
  }
}
