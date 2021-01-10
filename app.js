//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true });

const itemsSchema = {
    name: String
};
const Item = mongoose.model("Item", itemsSchema);
const item_1 = new Item({
    name: "Welcome to your Todo-List"
});
const item_2 = new Item({
    name: "Hit the + button to add new item..."
});
const item_3 = new Item({
    name: "Hit the - button to delete a item..."
});
const defaultItems = [item_1, item_2, item_3];
// Item.insertMany(defaultItems, function (err) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(itemsFound);
//     }
// });

app.get("/", function (req, res) {
    Item.find({}, function (err,itemsFound) {
        if (err){
            console.log(err);
        }
        else{
            res.render("list", {
                ListTitle: "Today",
                newListItems: itemsFound
            });
        }
        });
  
});

app.post("/", function (req, res) {
    let item = req.body.newItem;
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    }
    else {

        items.push(item);
        res.redirect("/");
    }

});
app.get("/work", function (req, res) {
    res.render("list", { ListTitle: "Work List", newListItems: workItems });

});
app.post("/work", function (req, res) {

    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");

});
app.get("/about", function (req, res) {
    res.render("about");

});
app.listen(3000, function () {
    console.log("Server is running now!");

});