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
      account: {}
    };

    fetch("http://localhost:4000/getAccountByUsername/ralph").then(
      response =>
        response.json().then(result => {
          this.setState({ account: result[0] });
        }),
      error => {
        console.log(error);
      }
    );
  }

  setBank = value => {
    this.setState({
      account: {
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
        username: "ralph",
        value: value
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
              <Trade account={this.state.account} setBank={this.setBank} />
            )}
          />
          <Route path="/profile" component={Profile} />
          <Route
            path="/portfolio"
            component={() => (
              <Portfolio account={this.state.account} setBank={this.setBank} />
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
