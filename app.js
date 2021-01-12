//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true, useUnifiedTopology: true });

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
const listSchema = {
    name: String,
    items: [itemsSchema]
}
const List = mongoose.model("List", listSchema);
app.get("/", function (req, res) {

    Item.find({}, function (err, itemsFound) {

        if (itemsFound.length === 0) {
            Item.insertMany(defaultItems, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(itemsFound);
                }
            });
            res.redirect("/");
        }
        else {
            res.render("list", {
                ListTitle: "Today",
                newListItems: itemsFound
            });
        }
    });

});
app.get("/:customListName", function (req, res) {
    const customListName = req.params.customListName;
    List.findOne({ name: customListName }, function (err, item) {
        if (!err) {
            if (!item) {
                //Create a new List
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
                res.redirect("/" + customListName);
            }
            else {
                res.render("list", {
                    ListTitle: item.name,
                    newListItems: item.items
                });

            }

        }

    });

});

app.post("/", function (req,res) {
    const itemName = req.body.newItem;
    const listName = req.body.list;
    const  product = new Item({
        name:itemName
    });
    if(listName==="Today"){
        product.save();
       res.redirect("/");
    }
    else
    {
        List.findOne({name:listName},function(err,getData){
            getData.items.push(product);
            getData.save();
                  res.redirect("/"+listName);
                  
               });
    }

});
app.post("/delete", function (req, res) {
    let deleteItem = req.body.checkbox;
    Item.findByIdAndRemove(deleteItem, function (err) {
        if (err)
            console.log(err);
        else
            console.log("Deleted");

    });
    console.log(deleteItem);
    res.redirect("/");
});
app.get("/work", function (req, res) {
    res.render("list", { ListTitle: "Work List", newListItems: workItems });

});
app.listen(3000, function () {
    console.log("Server is running now!");

});