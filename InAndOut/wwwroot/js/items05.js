"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/itemsHub").build();


//connection.on("ReceiveMessage", function () {
//  getAllMessages();
//});

this.connection.on("receiveMessage", function () {
  alert('Message Received');
});



// Connects the WebSocket to the DatabaseDisplayHub. 
connection.start().then(function () {
  getAllMessages();
  console.log("Retrieved as List of all Items ");
}).catch(function (err) {
  alert("Error while connecting to the Items Hub.");
  return console.error(err.toString());
});

// Called when the connection with the Hub is closed.
connection.onclose(function () {
  alert("Disconnected from the Items Hub.");
  console.log("Database Page Disconnected.");
});







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
      { data: "id" },
      { data: "itemName" },
      { data: "borrower" },
      { data: "lender" },
      {
        data: null,
        defaultContent: "<button class='tblview'>View Id</button><button class='tblDelete'>Delete</button>"
      }
    ],
    ajax: {
      "url": "/Item/GetItems",
      "type": "GET",
      //"dataSrc": ''
    },
    "columnDefs": [
      {
        "targets": 0,
        "visible": false
      }
    ]
  });
}


