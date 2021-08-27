# AspNetCore-SignalR-SqlTableDependency
This project was developed as a Proof of Concept/Tutorial for implementing AspNetCore SignalR using SqlTableDependency into an ASP.NET Core Web App (Model-View-Controller) application.
I have been looking feverishly to find a modern example used in a .Net5 MVC Application, however, over the past several weeks I have been unsuccessful in locating anything. After struggling to find answers, I ALMOST have the application completed.
Current issues:
1.	When populating the data table in “Item View”, I am receiving an error in the jQuery Ajax Datatables with Dynamic Columns. Now the error that I am receiving is “Requested unknown parameter 'ItemName' for row 0, column 1 "asp.net core" datatable”
2.	When implementing the “Dependency_OnChange” event, I am having an async issue.
Because this application is using SqlTableDependency, after creating the database you must enable SQL Broker:
ALTER DATABASE InAndOut SET ENABLE_BROKER with rollback immediate.
