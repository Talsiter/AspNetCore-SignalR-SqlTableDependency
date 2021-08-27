using InAndOut.Data;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Threading.Tasks;

namespace InAndOut
{
  public class ItemsHub : Hub
  {
    public ItemsHub(ApplicationDbContext db)
    {
      // Maybe Start the SqlTableDependency here ?????

      // Get the connection string from dBContext
      // This is just used so when an updated is made to the "Items" table,
      // it will trigger the SendMessage method. This SHOULD notify the browser
      // to re-populate with the new information.
      SqlConnection con = new SqlConnection(db.Database.GetDbConnection().ConnectionString);

      using (var cmd = new SqlCommand(@"SELECT [ID]
                                             , [Borrower]
                                             , [Lender]
                                             , [ItemName]
                                        FROM [dbo].[Items]", con))
      {
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        var dependency = new SqlDependency(cmd);
        // Start the SQL dependency:
        dependency.OnChange += Dependency_OnChange;
        SqlDependency.Start(db.Database.GetDbConnection().ConnectionString);
        DataSet ds = new DataSet();
        da.Fill(ds);

      }

    }

    private void Dependency_OnChange(object sender, SqlNotificationEventArgs e)
    {
      if (e.Type == SqlNotificationType.Change)
      {
        SendMessage("", "");
      }
    }

    // I Cannot get the async to work with this function
    //public async Task SendMessage(string user, string message)
    //{
    //  await Clients.All.SendAsync("ReceiveMessage", user, message);
    //}

    public async Task SendMessage(string user, string message)
    {
      await Clients.All.SendAsync("ReceiveMessage", user, message);
    }




  }
}
