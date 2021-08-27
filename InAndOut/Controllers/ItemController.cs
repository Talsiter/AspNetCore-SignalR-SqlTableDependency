using InAndOut.Data;
using InAndOut.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace InAndOut.Controllers
{
  public class ItemController : Controller
  {
    private readonly ApplicationDbContext _db;

    public ItemController(ApplicationDbContext db)
    {
      _db = db;
    }


    public IActionResult Index()
    {
      IEnumerable<Item> objList = _db.Items;
      return View(objList);
    }

    // GET-Create
    public IActionResult Create()
    {
      return View();
    }

    // POST-Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Create(Item obj)
    {
      _db.Items.Add(obj);
      _db.SaveChanges();
      return RedirectToAction("Index");
    }


    // I created this Method to populate the "Item View" when a
    // change is detected in the Database. This method should be called
    // from the JavaScript "getAllMessages" method (I am guessing)
    public IActionResult GetItems()
    {
      var items = new List<Item>
         {
             new Item { ItemName = "This Item Name 1", Borrower = "Jeff", Id = 1, Lender = "Mike" },
             new Item { Borrower = "Bob", Id = 2, ItemName = "This Item Name 2",Lender = "Williams" },
         };

      dynamic response = new
      {
        Data = items,
        RecordsFiltered = items.Count,
        RecordsTotal = items.Count
      };

      return Ok(response);

    }




  }
}
