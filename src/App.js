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
  SearchFriends,
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
      stocksDb: [],
      friends: [],
      transactions: [],
      competitions: [],
      userCompeititons: [],
      loggedIn: false,
    };
  }

  fetchData = () => {
    fetch("http://localhost:4000/getAccountByUsername/zimei")
      .then(
        (response) =>
          response.json().then((result) => {
            this.setState({ account: result[0] });
          }),
        (error) => {
          console.log(error);
        }
      )
      .then(() => {
        fetch(
          `http://localhost:4000/getStocksByUsernameId/${this.state.account.userId}`
        ).then(
          (response) =>
            response.json().then((result) => {
              this.setState({ stocks: result });
            }),
          (error) => {
            console.log(error);
          }
        );
      })
      .then(() => {
        fetch(
          `http://localhost:4000/getTransactionsByUsernameId/${this.state.account.userId}`
        ).then(
          (response) =>
            response.json().then((result) => {
              this.setState({ transactions: result.reverse() });
            }),
          (error) => {
            console.log(error);
          }
        );
      })
      .then(() => {
        if (!this.state.account.userId) return;
        fetch(
          `http://localhost:4000/getFriendsByUserId/${this.state.account.userId}`
        ).then((response) =>
          response.json().then((results) => {
            results.forEach((friend) => {
              fetch(
                `http://localhost:4000/getTransactionsByUsernameId/${friend.UserID}`
              ).then(
                (transactionResponse) =>
                  transactionResponse.json().then((t) => {
                    let newFriends = [
                      ...this.state.friends,
                      { ...friend, transactions: t },
                    ];
                    this.setState({
                      friends: newFriends,
                    });
                    return true;
                  }),
                (error) => {
                  console.log(error);
                }
              );
              return true;
            });
          })
        );
      })
      .then(() => {
        fetch(`http://localhost:4000/getStocksDb`).then(
          (response) =>
            response.json().then((result) => {
              this.setState({ stocksDb: result });
            }),
          (error) => {
            console.log(error);
          }
        );
      })
      .then(() => {
        fetch(`http://localhost:4000/getCompetitions`).then(
          (response) =>
            response.json().then((result) => {
              console.log("All comps" + JSON.stringify(result, null, 2));
              this.setState({ competitions: result });
            }),
          (error) => {
            console.log(error);
          }
        );
      });
  };

  setBank = (value) => {
    this.setState({
      account: {
        ...this.state.account,
        buyingpower: value.toFixed(2),
      },
    });

    fetch("http://localhost:4000/updateBuyingPower/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.account.username,
        value: value,
      }),
    });
  };

  setLogin = (value) => {
    this.setState({ loggedIn: value });
  };

  setName = (name) => {
    this.setState({
      account: {
        ...this.state.account,
        username: name,
      },
    });

    fetch("http://localhost:4000/updateUsername/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: this.state.account.userId,
        name: name,
      }),
    });
  };

  setEmail = (email) => {
    this.setState({
      account: {
        ...this.state.account,
        emailaddress: email,
      },
    });

    fetch("http://localhost:4000/updateEmail/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: this.state.account.userId,
        email: email,
      }),
    });
  };

  setPassword = (password) => {
    this.setState({
      account: {
        ...this.state.account,
        password: password,
      },
    });

    fetch("http://localhost:4000/updatePassword/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: this.state.account.userId,
        password: password,
      }),
    });
  };

  transactStock = (stockObj) => {
    fetch("http://localhost:4000/transactStock/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: this.state.account.userId,
        marketPrice: stockObj.marketPrice,
        shortName: stockObj.shortName,
        symbol: stockObj.symbol,
        type: stockObj.type,
      }),
    }).then(() => {
      fetch(
        `http://localhost:4000/getTransactionsByUsernameId/${this.state.account.userId}`
      ).then(
        (response) =>
          response.json().then((result) => {
            this.setState({ transactions: result.reverse() });
          }),
        (error) => {
          console.log(error);
        }
      );
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.loggedIn ? (
          <MenuAppBar
            account={this.state.account}
            loggedIn={this.state.loggedIn}
          />
        ) : (
          ""
        )}

        <Switch>
          <Route
            exact
            path="/"
            component={() => {
              if (this.state.loggedIn) return <Announcement />;
              return <Login setLogin={this.setLogin} />;
            }}
          />
          <Route path="/register" component={Register} />
          <Route
            path="/trade"
            component={() => (
              <Trade
                account={this.state.account}
                setBank={this.setBank}
                transactStock={this.transactStock}
                stocksDb={this.state.stocksDb}
              />
            )}
          />

          <Route
            path="/profile"
            component={() => (
              <Profile
                account={this.state.account}
                setName={this.setName}
                setEmail={this.setEmail}
                setPassword={this.setPassword}
              />
            )}
          />

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
          <Route
            path="/competition"
            component={() => (
              <Competition
                competitions={this.state.competitions}
                account={this.state.account}
              />
            )}
          />
          <Route path="/chat" component={Chat} />
          <Route path="/bug" component={Bug} />
        </Switch>
      </div>
    );
  }
}

export default App;
