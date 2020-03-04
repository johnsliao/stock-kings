import React, { Component } from "react";
import {
  Home,
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
      bank: 500
    };
  }

  setBank = value => {
    this.setState({ bank: value.toFixed(2) });
  };

  render() {
    return (
      <div className="App">
        <MenuAppBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route
            path="/trade"
            component={() => (
              <Trade bank={this.state.bank} setBank={this.setBank} />
            )}
          />
          <Route path="/profile" component={Profile} />
          <Route
            path="/portfolio"
            component={() => (
              <Portfolio bank={this.state.bank} setBank={this.setBank} />
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
