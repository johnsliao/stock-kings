import React, { Component} from 'react';
import { TextField, Button } from '@material-ui/core'
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const localValue = {
  username: "Zihao",
  email: "horus@bu.edu",
  phone: "8574138570",
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      email: this.props.email,
      phone: this.props.phone,
      isEdit: false,
    };
    this.changeInputValue = this.changeInputValue.bind(this);
    this.submitValue = this.submitValue.bind(this);
  }

  changeInputValue(e) {
    localValue[e.target.name] = e.target.value;
  }

  submitValue(k) {

    for (k in localValue) {
      if(localValue[k]){
        this.setState({
          [k]:localValue[k],
        });}
      else {localValue[k] = this.state[k];}
    }
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
        <h2>Profile</h2>
        <h3>
          Username: {localValue.username}<br/>
          <TextField
            type="text"
            name="username"
            label="Change Username"
            placeholder="New Username"
            onChange={this.changeInputValue}
          /><br/>
          Email: {localValue.email}<br/>
          <TextField
            type="text"
            name="email"
            label="Change Email"
            placeholder="New Email"
            onChange={this.changeInputValue}
          /><br/>
          Phone: {localValue.phone}<br/>
          <TextField
            type="text"
            name="phone"
            label="Change Phone"
            placeholder="New Phone"
            onChange={this.changeInputValue}
          /><br/>
        </h3>
        <Button onClick={this.submitValue}
                variant="outlined"
        >update
        </Button>
        <Snackbar
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <Alert onClose={this.handleClose} severity="success">
            Your information has been updated successfully!
          </Alert>
        </Snackbar>

      </div>
    )
  }
}
export default Profile;
