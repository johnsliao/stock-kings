const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const app = express();
const port = 4000;
var cors = require("cors");

// use it before all route definitions
app.use(cors({ origin: "http://localhost:3000" }));
// configure middleware
app.set("port", process.env.port || port); // set express to use this port
app.set("views", __dirname + "/views"); // set express to look in this folder to render our view
app.set("view engine", "ejs"); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, "public"))); // configure express to use public folder

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "stockkings"
});

// connect to database
db.connect(err => {
  if (err) {
    throw err;
  } else {
    console.log("Connected to database");
  }
});
global.db = db;

app.get("/getAccounts", function(req, res) {
  let query = "SELECT userId, username, buyingpower FROM `useraccount`"; // query database to get all the accounts

  // execute query
  db.query(query, (err, result) => {
    if (err) {
      res.send(":");
    }
    console.log(result);
    res.send(result);
  });
});

app.get("/getAccountByUsername/:username", function(req, res) {
  let query =
    "SELECT userId, username, buyingpower FROM `useraccount` where username='" +
    req.params.username +
    "'"; // query database to get all the accounts

  // execute query
  db.query(query, (err, result) => {
    if (err) {
      res.send(":");
    }
    console.log(result);
    res.send(result);
  });
});

// set the app to listen on the port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
