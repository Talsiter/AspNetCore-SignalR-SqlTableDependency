using InAndOut.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;

namespace InAndOut.Models.ViewModels
{
  public class ExpenseVM
  {
    // Here we are actually combining the Expense ViewBag.TypeDropDown Model
    // and the Expense Model into a single Model

    public Expense Expense { get; set; }
    public IEnumerable<SelectListItem> TypeDropDown { get; set; }

  }
}
