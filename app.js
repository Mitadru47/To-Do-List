const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.set("view engine", "ejs");

var list = [];
var workList = [];

app.listen(3000, function (){

    console.log("\nServer Info:\n\nStatus: Active\nPort: 3000\n");
});

app.get("/", function (req, res){

    var currentDay = date.getDate();
    // var currentDay = date.getDay();

    res.render("list", {
     
        listTitle: currentDay,
        listItem: list
    });
    
    res.send();
});

app.post("/", function (req, res){

    if(req.body.submitType === "Work"){

        workList.push(req.body.listItem);

        console.log("\nWork List:\n" + workList + "\n");
        res.redirect("/work");
    }
    
    else {
    
        var newListItem = req.body.listItem;
        list.push(newListItem);

        console.log("\nList:\n" + list + "\n");
        res.redirect("/");
    }
});

app.get("/work", function (req, res){

    res.render("list", {

        listTitle: "Work List",
        listItem: workList
    });

    res.send();
});

app.get("/about", function (req, res){

    res.render("about");
});