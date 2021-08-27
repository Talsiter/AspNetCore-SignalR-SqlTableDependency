 // This is all Modified from the "Chat.js" file

"use strict";

//var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
var connection = new signalR.HubConnectionBuilder().withUrl("/itemsHub").build();

// This is not relevant to the Items
//Disable send button until connection is established
//document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
  var li = document.createElement("li");
  document.getElementById("messagesList").appendChild(li);
  // We can assign user-supplied strings to an element's textContent because it
  // is not interpreted as markup. If you're assigning in any other way, you 
  // should be aware of possible script injection concerns.
  li.textContent = `${user} says ${message}`;
});

connection.start().then(function () {
  getAllMessages();
}).catch(function (err) {
  return console.error(err.toString());
});

// This is not relevant to the Items
//document.getElementById("sendButton").addEventListener("click", function (event) {
//  var user = document.getElementById("userInput").value;
//  var message = document.getElementById("messageInput").value;
//  connection.invoke("SendMessage", user, message).catch(function (err) {
//    return console.error(err.toString());
//  });
//  event.preventDefault();
//});





// This is from:
//https://stackoverflow.com/questions/51764211/jquery-datatable-loading-using-ajax-asp-net-mvc
// Does Not Display any data
function getAllMessages() {
  $('#myTable').DataTable({
    processing: true,
    serverSide: false,
    ordering: true,
    paging: true,
    searching: true,
    columns: [
      { title: "Id" },
      { title: "ItemName" },
      { title: "Borrower" },
      { title: "Lender" },
      { title: "View Data" }
    ],
    columns: [
      { data: "Id" },
      { data: "ItemName" },
      { data: "Borrower" },
      { data: "Lender" },
      {
        data: null,
        defaultContent: "<button class='tblview'>View Id</button><button class='tblDelete'>Delete</button>"
      }
    ],
    ajax: {
      "url": "/Item/GetItems",
      "type": "GET",
      "dataSrc": ''
    },
    "columnDefs": [
      {
        "targets": 0,
        "visible": false
      }
    ]
  });
}

// This is just after many modifications however, this does not display any data
function getAllMessages02() {
  $('#myTable').DataTable({
    processing: true,
    serverSide: false,
    ordering: true,
    paging: true,
    searching: true,
    columns: [
      {
        "data": null,
        "defaultContent": "<a href='#' class='btn btn-block bg-gradient-primary btn-xs' onclick='DetailsAction(this)'>Details</a>"
      },
      { "data": "ItemName", "autoWidth": true },
      { "data": "Borrower", "autoWidth": true },
      { "data": "Lender", "autoWidth": true },
    ],
    ajax: {
      "url": "/Item/GetItems",
      "type": "GET",
      "dataSrc": ''
    },
    "columnDefs": [
      {
        "targets": 0,
        "visible": false
      }
    ]
  });
}


