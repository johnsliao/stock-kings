import React, { Component } from "react";


class Login extends Component {

  constructor(props){
    super(props);
    this.state ={
      username:'',
      password:''
    }
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  login() {
    console.log("Login function"); 
  }

  onChange() {
    console.log("Login function");

  }

  
  render() {
    return (
      <div className="row small-up-2 medium-up-3 large-up-4">
      <div className="column bodypart"></div>
        <h2>Login Page</h2>
        <div><label>Username</label>
        <input type="text" name="username" placeholder="username" onChange={this.onChange}></input></div>
        <div><label>Password</label>
        <input type="password" name="password" placeholder="password"></input>
        <iput type="sumbit" value="Login" className="button" onClick={this.login}></iput></div>
        <div style={{height:'10%'}}><label>Remember me</label>
        <input type="checkbox" checked="checked" name="remember"></input>
        </div>

        <div class="clearfix">
          <button type="submit" class="loginbtn">Login</button>
          <button type="button" class="cacelbtn">Cancel</button>
        </div>
      </div>
    );
  }
}

export default Login;