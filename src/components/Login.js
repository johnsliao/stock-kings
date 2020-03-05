import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {TextField} from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Login extends Component {

  constructor(props){
    super(props);
    this.state ={
      username:'',
      password:'',
      alert:''
      
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
        <TextField id="outlined-size-normal"
                   label="UserName"
                   variant="outlined"
                   style={{minWidth: "300px", maxWidth: "300px"}}
                   helperText=" "
        /><br/>
        <TextField id="filled-password-input"
                   label="Password"
                   type="password"
                   autoComplete="current-password"
                   variant="filled"
                   style={{minWidth: "300px", maxWidth: "300px"}}
                   helperText=" "

        /><br/>
        <input type="checkbox" name="remember" id="remember"/> Remember me<br/><br/>
        <Button onClick={this.handlecancel} variant="outlined">Cancel</Button>
        <Button onClick={this.handlelogin} variant="outlined">Login</Button>
        <Snackbar
          open={this.state.open}
          autoHideDuration={1000}
          onClose={this.handleClose}
        >
        <Alert onClose={this.handleClose} severity="success">
          Log in successfully!
        </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default Login;