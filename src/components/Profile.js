import React, { Component} from 'react';
import { TextField, Button } from '@material-ui/core'
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Profile extends Component {


  constructor(props) {
    super(props);

    this.state = {
      username: this.props.account.username,
      email: this.props.account.emailaddress,
      password: this.props.account.password,
      isEdit: false,
    };

    this.changeUsername = this.changeUsername.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.submitName = this.submitName.bind(this);
    this.submitEmail = this.submitEmail.bind(this);
    this.submitPassword = this.submitPassword.bind(this);
  }

  changeUsername(e) {this.username = e.target.value}
  changeEmail(e) {this.email = e.target.value}
  changePassword(e) {this.password = e.target.value}

  submitName = () => {
    if (this.username) {this.props.setName(this.username);}
    this.setState({ open: true});
  }
  submitEmail = () => {
    if (this.email) {this.props.setEmail(this.email);}
    this.setState({ open: true});

  }
  submitPassword = () => {
    if (this.password) {this.props.setPassword(this.password);}
    this.setState({ open: true});
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {return;}
    this.setState({ open: false });
  };

  render() {

    return (
      <div>
        <h2>Profile</h2>
        <h3>
          Name: {this.props.account.username}<br/>
          <TextField
            type="text"
            name="username"
            label="Change Username"
            placeholder="New Username"
            onChange={this.changeUsername}
          />
          <Button onClick={this.submitName} variant="outlined">update</Button>
          <br/>
          Email: {this.props.account.emailaddress}<br/>
          <TextField
            type="text"
            name="email"
            label="Change Email"
            placeholder="New Email"
            onChange={this.changeEmail}
          />
          <Button onClick={this.submitEmail} variant="outlined">update</Button>
          <br/>
          Password: {this.props.account.password}<br/>
          <TextField
            type="text"
            name="phone"
            label="Change Password"
            placeholder="New Password"
            onChange={this.changePassword}
          />
          <Button onClick={this.submitPassword} variant="outlined">update</Button>
          <br/>
        </h3>
        <Snackbar
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <Alert onClose={this.handleClose} severity="success">
            No update information!
          </Alert>
        </Snackbar>
      </div>
    )
  }
}
export default Profile;
