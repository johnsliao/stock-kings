import React, {Component} from 'react';
import {Button} from "@material-ui/core";
import {
  Home,
  Register,
  Trade,
  Profile,
  Portfolio,
  Competition,
  Chat,
  Bug,
  SearchFriends
} from ".";
import {Route} from "react-router-dom";


class Login extends Component {


  TradeClick = () =>
    <Route
      path="/trade"
      component={() => (
        <Trade bank={this.state.bank} setBank={this.setBank} />
      )}
    />;

  render(){
    return(
      <div>
        <h1>Stock Kings</h1>

        <Button fullWidth={true} onClick={this.TradeClick}>Trade</Button><br/>
        <Button fullWidth={true} onClick={this.PortfolioClick}>Portfolio</Button><br/>
        <Button fullWidth={true} onClick={this.CompetitionClick}>Competition</Button><br/>
        <Button fullWidth={true} onClick={this.ChatClick}>Chat</Button><br/>
        <Button fullWidth={true} onClick={this.SearchClick}>Search Friends</Button><br/>
        <Button fullWidth={true} onClick={this.ProfileClick}>Profile</Button><br/>
        <Button fullWidth={true} onClick={this.BugClick}>Report Bug</Button><br/>

        <h3>You need to sign up or log in first</h3>
        <button onClick={this.RegisterClick}>Sign up</button>
        <button onClick={this.LoginClick}>Login</button><br/>

      </div>
    )
  }
}

export default Login;
