import React from "react";
import MenuAppBar from "./components/MenuAppBar.js";
import Dashboard from "./components/Dashboard.js";
import Home from "./components/Home.js";
import Settings from "./components/Settings.js";
import { Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <MenuAppBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </div>
  );
}

export default App;
