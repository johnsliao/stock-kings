import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Login extends Component {

  constructor(props){
    super(props);
    this.state ={
      username:'',
      password:''
      
    };
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handlelogin = this.handlelogin.bind(this);
  }

  onChange(e) {
    this.setState({
        [e.target.name] : e.target.value
    })
  }

  submitForm(e){
    e.preventDefault();
    // login magic
  }

  handlelogin() {
    this.setState({ open: true, description: "" });
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <h2>Login Page</h2>
        <form onSumbmit={this.submitForm}>
          <input type="text" placeholder="username" name="username" value={this.state.username} onChange={this.onChange} />
          <br/>
          <input type="password" placeholder="password" name="password" value={this.state.password} onChange={this.onChange} />
          <br/>
          <div class="col-xs-8">
            <input type="checkbox" name="remember" id="remember"/> Remember me
          </div>

          <div class="clearfix">
            <Button onClick={this.handlecancel} variant="outlined">Cancel</Button>

            <Button onClick={this.handlelogin} variant="outlined">Login</Button>
            <Snackbar
              open={this.state.open}
              autoHideDuration={6000}
              onClose={this.handleClose}
            >
              <Alert onClose={this.handleClose} severity="success">
                Log in successfully!
              </Alert>
            </Snackbar>
          </div>
        </form>
      </div>
        
    );
  }
}

export default Login;