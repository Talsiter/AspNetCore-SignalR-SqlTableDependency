$(function () {


  var notifications = $.connection.ItemsHub;
  //debugger;
  // Create a function that the hub can call to broadcast messages.
  notifications.client.updateMessages = function () {
    getAllMessages()
  };
  // Start the connection.
  $.connection.hub.start().done(function () {
    console.log("connection started")
    //notifications.onconn();
    getAllMessages();
  }).fail(function (e) {
    alert(e);
  });
});

function getAllMessages() {

  $('#myTable').DataTable({
    stateSave: true,
    destroy: true,
    "processing": true,
    "language": {
      "processing": "DataTables is currently busy"
    },
    "ajax": {
      "url": "/Item/GetItems",
      "data": "JSON.stringify(PersonDetail)",
      "type": "GET",
      "datatype": "json"
    },
    "columns": [
      {
        "data": null,
        "defaultContent": "<a href='#' class='btn btn-block bg-gradient-primary btn-xs' onclick='DetailsAction(this)'>Details</a>"
      },
      { "data": "ItemName", "autoWidth": true },
      { "data": "Borrower", "autoWidth": true },
      { "data": "Lender", "autoWidth": true },
    ]
  });
}


//This method is called when the user clicks on the Details Button
// It does not seeme to be effecient, but we will see if it works
function DetailsAction(anchor) {
  var id = $(anchor).parent().parent().find('td')[1].innerText;
  window.location.replace('/Item/Index/' + id);
};
