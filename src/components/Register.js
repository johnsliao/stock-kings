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
        />
        <div>
        </div>
        <TextField id="RegisterTextField"
                   label="Email"
                   variant="outlined"
                   style={{minWidth: "300px", maxWidth: "300px"}}
                   //defaultValue="Tom2020@bu.edu"
                   helperText="Email is used to recover your account"
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
        >
        Next
        </RegisterButton>
      </div>
    );
  }
}


export default Register;
