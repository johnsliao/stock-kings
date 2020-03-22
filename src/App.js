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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {},
      stocks: [],
      transactions: []
    };

    fetch("http://localhost:4000/getAccountByUsername/zimei")
      .then(
        response =>
          response.json().then(result => {
            this.setState({ account: result[0] });
            console.log(result);
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
              console.log(result);
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
              console.log(result);
              this.setState({ transactions: result });
            }),
          error => {
            console.log(error);
          }
        );
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

  buyStock = stockObj => {
    let newTransactions = this.state.transactions;
    newTransactions.push(stockObj);
    this.setState({
      stocks: {
        transactions: newTransactions
      }
    });

    fetch("http://localhost:4000/buyStock/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: this.state.account.userId,
        marketPrice: stockObj.marketPrice,
        shortName: stockObj.shortName,
        symbol: stockObj.symbol
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
                buyStock={this.buyStock}
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
              />
            )}
          />
          <Route path="/search-friends" component={SearchFriends} />
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
