using InAndOut.Data;
using InAndOut.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;

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

    // This was updated from:
    // https://stackoverflow.com/questions/51764211/jquery-datatable-loading-using-ajax-asp-net-mvc
    public IActionResult GetItems01()
    {
      var items = new List<Item>
         {
             new Item { Id = 1, ItemName = "Computer", Borrower = "Justin", Lender = "Don"},
             new Item { Id = 2, ItemName = "Mouse", Borrower = "Mark", Lender = "Susan"},
             new Item { Id = 3, ItemName = "Monitor", Borrower = "Mark", Lender = "Joe"},
             new Item { Id = 4, ItemName = "Keyboard", Borrower = "Candace", Lender = "Angela"},
         };

      var json = JsonConvert.SerializeObject(items);
      string yourJson = json;

      var response = new HttpResponseMessage(HttpStatusCode.OK);
      response.Content = new StringContent(yourJson, Encoding.UTF8, "application/json");
      return Ok(response);
      // This does not work: Getting an error of "Cannot read property 'length' of undefined"
    }

    // This was updated from:
    // https://stackoverflow.com/questions/51705732/jquery-datatable-ajax-no-data-available-mvc
    public IActionResult GetItems()
    {
      var items = new List<Item>
         {
             new Item { Id = 1, ItemName = "Computer", Borrower = "Justin", Lender = "Don"},
             new Item { Id = 2, ItemName = "Mouse", Borrower = "Mark", Lender = "Susan"},
             new Item { Id = 3, ItemName = "Monitor", Borrower = "Mark", Lender = "Joe"},
             new Item { Id = 4, ItemName = "Keyboard", Borrower = "Candace", Lender = "Angela"},
             new Item { Id = 5, ItemName = "Printer", Borrower = "Mike", Lender = "Watson"},
         };
      // JsonRequestBehavior requires Microsoft.AspNet.MVC
      // I do not want to reference it. I want to use Microsoft.AspNetCore.Mvc
      //return Json(items, JsonRequestBehavior.AllowGet);

      // I referenced this to mitigate the above issue
      // https://stackoverflow.com/questions/38578463/asp-net-core-the-name-jsonrequestbehavior-does-not-exist-in-the-current-cont
      //return Json(items);
      // Error: Cannot read property 'style' of undefined

      // This was another option
      //return Json(items, new Newtonsoft.Json.JsonSerializerSettings());
      // Error: Cannot read property 'style' of undefined

      // This seems to be returning the correct data format
      // Now the data just is not being displayed in the view
      // My error seems to be in the JavaScript
      // Need to look at C:\Users\jwright\source\repos\InAndOut\InAndOut\wwwroot\js\items03.js getAllMessages method
      return Json(new { data = items });
    }
  }
}
