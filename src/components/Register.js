import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core'
//import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const useStyles = makeStyles({
  root: {
    background: props =>
      props.color === 'red'
        ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
        : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: props =>
      props.color === 'red'
        ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
        : '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: 8,
  },
});

function RegisterButton(props) {
  const { color, ...other } = props;
  const classes = useStyles(props);
  return <Button className={classes.root} {...other} />;
}

function CancelButton(props) {
  const { color, ...other } = props;
  const classes = useStyles(props);
  return <Button className={classes.root} {...other} />;
}

RegisterButton.propTypes = {
  color: PropTypes.oneOf(['blue', 'red']).isRequired,
};

class Register extends Component {
  constructor(props) {
  super(props);
  this.state = {
      UserName:'',
      Email:'',
      Password:'',
      Confirm:'',
  }
  this.UserNameChange = this.UserNameChange.bind(this);
  this.EmailChange = this.EmailChange.bind(this);
  this.PasswordChange = this.PasswordChange.bind(this);
  this.ConfirmChange = this.ConfirmChange.bind(this);
  this.submit = this.submit.bind(this);
}
UserNameChange(e){
  this.setState({UserNameChange:e.target.value})
}
EmailChange(e){
  this.setState({EmailChange:e.target.value})
}
PasswordChange(e){
  this.setState({PasswordChange:e.target.value})
}
ConfirmChange(e){
  this.setState({ConfirmChange:e.target.value})
}
submit(){
  window.alert('Success!')
}
HandleRegister() {

  window.alert('Success!')
  fetch("http://localhost:4000/createUser/", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: this.state.UserName,
    password: this.state.Password,
    email: this.state.Email
  }),
  })}
  render() {
    return (
      <div>
        <h2>Register Page</h2>
        <TextField id="RegisterTextField"
                   label="UserName"
                   variant="outlined"
                   style={{minWidth: "300px", maxWidth: "300px"}}
                   //defaultValue="Tom"
                   helperText="Letters & Numbers recommended"
                   onChange={this.UserNameChange}
        />
        <div>
        </div>
        <TextField id="RegisterTextField"
                   label="Email"
                   variant="outlined"
                   style={{minWidth: "300px", maxWidth: "300px"}}
                   //defaultValue="Tom2020@bu.edu"
                   helperText="Email is used to recover your account"
                   onChange={this.EmailChange}
        />
        <div>
        </div>
        <TextField id="RegisterTextField"
                   label="Password"
                   type="password"
                   autoComplete="current-password"
                   variant="filled"
                   style={{minWidth: "300px", maxWidth: "300px"}}
                   //defaultValue="12345678"
                   helperText="Use 8 or more characters with a mix of letters, numbers & symbols"
                   onChange={this.PasswordChange}
        />
        <div>
        </div>
        <TextField id="RegisterTextField"
                   label="Confirm"
                   type="password"
                   autoComplete="current-password"
                   variant="filled"
                   style={{minWidth: "300px", maxWidth: "300px"}}
                   //defaultValue="12345678"
                   helperText="Re-enter your Password"
                   onChange={this.ConfirmChange}
        />
        <div>
        </div>
        <CancelButton   color="red"
                        style={{minWidth: "140px", maxWidth: "140px"}}
        >
        Cancel
        </CancelButton>
        <RegisterButton color="blue"
                        style={{minWidth: "140px", maxWidth: "140px"}}
                        onClick={this.HandleRegister}
        >
        Next
        </RegisterButton>
      </div>
    );
  }
}


export default Register;
