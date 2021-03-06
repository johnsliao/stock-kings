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
  database: "stockkings",
});

// connect to database
db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Connected to database");
  }
});
global.db = db;

//get method to retrive account info based on username and encrypted password
app.get("/getAccountWithProc", function (req, res) {
  let username = req.query.username;
  let password = req.query.password;

  let query = "CALL `GetUser`('" + username + "','" + password + "');"; // query database to get all the accounts

  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal server error :(");
    }
    res.send(result);
  });
});

app.get("/getAccountByUsername/:username", function (req, res) {
  let query = `SELECT userId, username, password, emailaddress, buyingpower, competition_id FROM \`useraccount\` where username='${req.params.username}'`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal server error :(");
    }
    res.send(result);
  });
});

app.get("/getCompetitions", function (req, res) {
  let query = `SELECT * from \`competitions\`;`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal server error :(");
    }
    res.send(result);
  });
});

app.get("/getStocksByUsernameId/:userId", function (req, res) {
  let query = `SELECT * FROM \`portfolio\` where UserAccountID='${req.params.userId}'`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal server error :(");
    }
    res.send(result);
  });
});

app.get("/getStocksDb", function (req, res) {
  let query = `SELECT * FROM \`stocks\``;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal server error :(");
    }
    console.log(result);
    res.send(result);
  });
});

app.get("/getTransactionsByUsernameId/:userId", function (req, res) {
  let query = `SELECT * FROM \`transactions\` where UserAccountID='${req.params.userId}' ORDER BY PURCHASE_DATE DESC`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal server error :(");
    }
    res.send(result);
  });
});

app.get("/getFriendsByUserId/:userId", function (req, res) {
  let query = `SELECT Username, UserID FROM \`friendship\` f INNER JOIN \`useraccount\` u ON f.FriendTwoUserAccountID=u.UserID WHERE FriendOneUserAccountID=${req.params.userId}`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal server error :(");
    }
    res.send(result);
  });
});

app.get("/login/:username/:password", function (req, res) {
  let query = `SELECT * from \`useraccount\` where username='${req.params.username}' AND password='${req.params.password}'`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal server error :(");
    }
    res.send(result);
  });
});

app.post("/updateBuyingPower/", function (req, res) {
  console.log(req.body.username);
  const query = `UPDATE \`useraccount\` SET \`BuyingPower\`=${req.body.value} where Username='${req.body.username}'`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal server error :(");
    }
    res.send(result);
  });
});

app.post("/updateUsername/", function (req, res) {
  console.log(req.body.userId);
  const query = `UPDATE \`useraccount\` SET \`Username\`='${req.body.name}' where UserID='${req.body.userId}'`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal server error :(");
    }
    res.send(result);
  });
});

app.post("/updateEmail/", function (req, res) {
  console.log(req.body.userId);
  const query = `UPDATE \`useraccount\` SET \`EmailAddress\`='${req.body.email}' where UserID='${req.body.userId}'`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal server error :(");
    }
    res.send(result);
  });
});

app.post("/updatePassword/", function (req, res) {
  console.log(req.body.userId);
  const query = `UPDATE \`useraccount\` SET \`Password\`='${req.body.password}' where UserID='${req.body.userId}'`;
  console.log(query);
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal server error :(");
    }
    res.send(result);
  });
});

app.post("/updateStock/", function (req, res) {
  const exists = `SELECT * FROM stocks WHERE SYMBOL='${req.body.symbol}'`;
  db.query(exists, (err, r) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal server error :(");
    }
    console.log("Processing " + req.body.symbol);
    if (r.length === 0) {
      console.log("  -> Insert");
      const insert = `INSERT INTO \`stocks\` (\`SYMBOL\`, \`SHORT_NAME\`, \`LONG_NAME\`, \`PRICE\`) VALUES ("${req.body.symbol}", "${req.body.shortName}", "${req.body.longName}", ${req.body.price})`;
      db.query(insert, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal server error :(");
        }
        res.send(result);
      });
    } else {
      const update = `UPDATE \`stocks\` SET \`PRICE\`=${req.body.price} where SYMBOL='${req.body.symbol}'`;
      db.query(update, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal server error :(");
        }
        res.send(result);
      });
    }
  });
});

app.post("/transactStock/", function (req, res) {
  const query = `INSERT INTO \`transactions\` (\`UserAccountID\`, \`PurchasePrice\`, \`ShortName\`, \`Symbol\`, \`Type\`) VALUES (${req.body.userId}, ${req.body.marketPrice}, "${req.body.shortName}", "${req.body.symbol}", "${req.body.type}")`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal server error :(");
    }
    res.send(result);
  });
});

//post method to retrive account info based on username and encrypted password
app.post("/updateBuyingPowerWithProc/", function (req, res) {
  console.log(req.body);
  let userId = req.body.userId;
  let buyingPower = req.body.value;

  let query = "CALL `UpdateBuyingPower`(" + userId + ", " + buyingPower + ");";

  // execute query
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send("Internal server error :(");
    }
    res.send(result);
  });
});


app.post("/insertForumMessage", function (req, res) {

  console.log(req.body);
  let userId = req.body.userId;
  let message = req.body.message;

  let query = " CALL `InsertForumMessage`("+ userId + ","+ message+");";

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal server error :(");
    }
    console.log(result);
    res.send(result);
  });
});



app.get("/getLatestForumMessage", function (req, res) {

  let query = "CALL `GetLatestForumMessages`();";

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal server error :(");
    }
    console.log(result);
    res.send(result);
  });
});


//post method to retrive account info based on username and encrypted password
app.post("/createUser/", function (req, res) {
  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;

  let query =
    "CALL `CreateUser`('" +
    username +
    "', '" +
    password +
    "', '" +
    email +
    "');";

  // execute query
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send("Internal server error :(");
    }
    res.send(result);
  });
});

//post method to retrive account info based on username and encrypted password
app.post("/becomeFriends/", function (req, res) {
  console.log(req.body);

  let userIdOne = req.body.userIdOne;
  let userIdTwo = req.body.userIdTwo;

  console.log(req.body.userIdTwo);

  let query =
    "CALL `CreateFriendshipRecord`(" + userIdOne + "," + userIdTwo + ");";

  // execute query
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send("Internal server error :(");
    }
    res.send(result);
  });
});

// set the app to listen on the port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
