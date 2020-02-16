import React from "react";
import {
  Home,
  Register,
  Main,
  Profile,
  Portfolio,
  Competition,
  Chat,
  Bug,
  MenuAppBar
} from "./components";
import { Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <MenuAppBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/main" component={Main} />
        <Route path="/profile" component={Profile} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/competition" component={Competition} />
        <Route path="/chat" component={Chat} />
        <Route path="/bug" component={Bug} />
      </Switch>
    </div>
  );
}

export default App;
