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
  password: "root",
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

//get method to retrive account info based on username and encrypted password 
app.get("/getAccountWithProc", function(req, res) {

  console.log(req.query);
  let username = req.query.username;
  let password  = req.query.password;

  let query = "CALL `GetUser`('" + username + "','" + password + "');"; // query database to get all the accounts

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

app.post("/updateBuyingPower/", function(req, res) {
  console.log(req.body.username);
  let query =
    "UPDATE `useraccount` SET `buyingpower`=" +
    req.body.value +
    " where username='" +
    req.body.username +
    "'";

  // execute query
  db.query(query, (err, result) => {
    if (err) {
      res.send(":");
    }
    console.log(result);
    res.send(result);
  });
});

//post method to retrive account info based on username and encrypted password 
app.post("/updateBuyingPowerWithProc/", function(req, res) {

  console.log(req.body);
  let userId = req.body.userId;
  let buyingPower = req.body.value;

  let query = "CALL `UpdateBuyingPower`(" + userId + ", " + buyingPower  +");";

  // execute query
  db.query(query, (err, result) => {
    if (err) {
      res.send(":");
    }
    console.log(result);
    res.send(result);
  });
});


//post method to retrive account info based on username and encrypted password 
app.post("/createUser/", function(req, res) {
  
  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;

  let query = "CALL `CreateUser`('"+ username +"', '" + password + "', '" + email + "');";

  // execute query
  db.query(query, (err, result) => {
    if (err) {
      res.send(":");
    }
    console.log(result);
    res.send(result);
  });
});

//post method to retrive account info based on username and encrypted password 
app.post("/becomeFriends/", function(req, res) {
  console.log(req.body);

  let userIdOne = req.body.userIdOne;
  let userIdTwo = req.body.userIdTwo;

  console.log(req.body.userIdTwo);

  let query = "CALL `CreateFriendshipRecord`("+ userIdOne + "," + userIdTwo + ");";

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
