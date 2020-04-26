import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { TextField } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      alert: "",
    };
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handlelogin = this.handlelogin.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  tryLogin = () => {
    fetch(
      `http://localhost:4000/login/${this.state.username}/${this.state.password}`
    ).then(
      (response) =>
        response.json().then((result) => {
          if (result.length !== 0) {
            window.location.href = "http://localhost:3000/announcement";
          } else {
            this.setState({ open: true });
          }
        }),
      (error) => {
        console.log(error);
      }
    );
  };

  submitForm(e) {
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
        <h2>Welcome to Stock Kings, please log in. {this.props.bar}</h2>
        <TextField
          id="outlined-size-normal"
          label="UserName"
          variant="outlined"
          style={{ minWidth: "300px", maxWidth: "300px" }}
          helperText=" "
          onChange={(event) => {
            this.setState({ username: event.target.value });
          }}
        />
        <br />
        <TextField
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          style={{ minWidth: "300px", maxWidth: "300px" }}
          helperText=" "
          onChange={(event) => {
            this.setState({ password: event.target.value });
          }}
        />
        <br />
        <Button onClick={this.handlecancel} variant="outlined">
          Cancel
        </Button>
        <Button onClick={this.tryLogin} variant="outlined">
          Login
        </Button>
        <Snackbar
          open={this.state.open}
          autoHideDuration={1000}
          onClose={this.handleClose}
        >
          <Alert onClose={this.handleClose} severity="error">
            Invalid username/password!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default Login;
