const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const encrypt = require("mongoose-encryption")

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Create our database
mongoose.connect("mongodb://localhost:27017/formDB", { useNewUrlParser: true, useUnifiedTopology: true })
//Create a schema
const personSchema = new mongoose.Schema({
    name: String,
    username: String,
    contact_number: Number,
    password: String
  })

  const secret = "Thisisourlittlesecret.";
  personSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password']})  

  //Create our model
const Person = new mongoose.model("Person",personSchema )

//Creating new documents
const person1 = new Person({
    name: "Welcome to your todolist!",
    username: "abs@xyz.com",
    contact_number: 56951154,
    password: "aklsjdf"
  })

person1.save();


app.get("/",function (req,res) {
    res.render("home");
  })

  app.post("/",function (req,res) {
      const name = req.body.fullName;
      const email = req.body.email;
      const password = req.body.password;
      const person = new Person({
          name: name,
          username: email,
          password: password
      })
      console.log("recher");
      person.save();
      res.redirect("/");
    })


 
  let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,function () {
    console.log("Server has started")
  });