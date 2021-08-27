using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
// This is from:
// https://tocalai.medium.com/create-signalr-on-asp-net-core-df7ac8a9e4ee

namespace InAndOut.Hubs
{

  public interface IEventHub
  {
    // here place some method(s) for message from server to client
    Task SendNoticeEventToClient(string message);
  }

  public class EventHub : Hub<IEventHub>
  {
    // here place some method(s) for message from client to server
  }
}
