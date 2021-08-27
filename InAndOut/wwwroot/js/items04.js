"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/itemsHub").build();


//connection.on("ReceiveMessage", function () {
//  getAllMessages();
//});

this.connection.on("ReceiveMessage", function () {
  alert('Message Received');
});

connection.start().then(function () {
  getAllMessages();
}).catch(function (err) {
  return console.error(err.toString());
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


