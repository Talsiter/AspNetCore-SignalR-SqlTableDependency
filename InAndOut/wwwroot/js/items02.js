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


function getAllMessages01() {

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
      "type": "POST",
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
