import React, { Component } from "react";
import {
  Announcement,
  Login,
  Register,
  Trade,
  Profile,
  Portfolio,
  Competition,
  Chat,
  Bug,
  SearchFriends
} from "./components";
import MenuAppBar from "./components/MenuAppBar";
import { Switch, Route } from "react-router-dom";
import "./App.css";

require("dotenv").config();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {},
      stocks: [],
      friends: [],
      transactions: []
    };

    fetch("http://localhost:4000/getAccountByUsername/zimei")
      .then(
        response =>
          response.json().then(result => {
            this.setState({ account: result[0] });
          }),
        error => {
          console.log(error);
        }
      )
      .then(() => {
        fetch(
          `http://localhost:4000/getStocksByUsernameId/${this.state.account.userId}`
        ).then(
          response =>
            response.json().then(result => {
              this.setState({ stocks: result });
            }),
          error => {
            console.log(error);
          }
        );
      })
      .then(() => {
        fetch(
          `http://localhost:4000/getTransactionsByUsernameId/${this.state.account.userId}`
        ).then(
          response =>
            response.json().then(result => {
              this.setState({ transactions: result.reverse() });
            }),
          error => {
            console.log(error);
          }
        );
      })
      .then(() => {
        fetch(
          `http://localhost:4000/getFriendsByUserId/${this.state.account.userId}`
        ).then(response =>
          response.json().then(results => {
            results.forEach(friend => {
              fetch(
                `http://localhost:4000/getTransactionsByUsernameId/${friend.UserID}`
              ).then(
                transactionResponse =>
                  transactionResponse.json().then(t => {
                    let newFriends = [
                      ...this.state.friends,
                      { ...friend, transactions: t }
                    ];
                    this.setState({
                      friends: newFriends
                    });
                    return true;
                  }),
                error => {
                  console.log(error);
                }
              );
              return true;
            });
          })
        );
      })
      .then(() => {
        fetch(
          "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols=AAPL",
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
              "x-rapidapi-key":
                "26b99a5e0emsha42f874174253e1p1de9b0jsn3c8169bfd0b7"
            }
          }
        )
          .then(response => {
            return response.json();
          })
          .then(data => {
            console.log(data);
          })
          .catch(err => {
            console.log(err);
          });
      });
  }

  setBank = value => {
    this.setState({
      account: {
        ...this.state.account,
        buyingpower: value.toFixed(2)
      }
    });

    fetch("http://localhost:4000/updateBuyingPower/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.account.username,
        value: value
      })
    });
  };

  transactStock = stockObj => {
    let newTransactions = this.state.transactions;
    newTransactions.push(stockObj);
    this.setState({
      stocks: {
        transactions: newTransactions
      }
    });

    fetch("http://localhost:4000/transactStock/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: this.state.account.userId,
        marketPrice: stockObj.marketPrice,
        shortName: stockObj.shortName,
        symbol: stockObj.symbol,
        type: stockObj.type
      })
    });
  };

  render() {
    return (
      <div className="App">
        <MenuAppBar account={this.state.account} />
        <Switch>
          <Route exact path="/" component={Announcement} />
          <Route path="/register" component={Register} />
          <Route
            path="/trade"
            component={() => (
              <Trade
                account={this.state.account}
                setBank={this.setBank}
                transactStock={this.transactStock}
              />
            )}
          />
          <Route path="/profile" component={Profile} />
          <Route
            path="/portfolio"
            component={() => (
              <Portfolio
                account={this.state.account}
                stocks={this.state.stocks}
                transactions={this.state.transactions}
                setBank={this.setBank}
                transactStock={this.transactStock}
              />
            )}
          />
          <Route
            path="/search-friends"
            component={() => <SearchFriends friends={this.state.friends} />}
          />
          <Route path="/competition" component={Competition} />
          <Route path="/chat" component={Chat} />
          <Route path="/bug" component={Bug} />
          <Route path="/Login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
