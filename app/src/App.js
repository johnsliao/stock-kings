import React, { Component } from "react";
import {
  Home,
  Register,
  Trade,
  Profile,
  Portfolio,
  Competition,
  Chat,
  Bug
} from "./components";
import MenuAppBar from "./components/MenuAppBar";
import { Switch, Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bank: 500,
      accounts: []
    };

    fetch('http://localhost:4000/getAccounts')
    .then(response => response.json()
    .then(
      (result) => {
         this.setState({accounts : result})

         console.log(this.accounts);

       }),
       (error) => {
         console.log(error);
       });

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
          <Route path="/competition" component={Competition} />
          <Route path="/chat" component={Chat} />
          <Route path="/bug" component={Bug} />
        </Switch>

        Hello World
        <ul>
          {this.state.accounts.map(account => <li>
            <h2>{account.userId}: {account.username}</h2>
            <p>{account.buyingpower}</p>
          </li>)}
        </ul>
      </div>

    );
  }
}



export default App;
