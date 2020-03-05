import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core'
import { styled } from '@material-ui/core/styles';

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

class Register extends Component {
  render() {
    return (
      <div>
        <h2>Register Page</h2>
        <TextField id="outlined-size-normal"
                   label="UserName"
                   variant="outlined"
        />
        <div>
        </div>
        <TextField id="outlined-secondary"
                   label="Email"
                   variant="outlined"
        />
        <div>
        </div>
        <TextField id="filled-password-input"
                   label="Password"
                   type="password"
                   autoComplete="current-password"
                   variant="filled"
        />
        <div>
        </div>
        <TextField id="filled-password-input"
                   label="Confirm"
                   type="password"
                   autoComplete="current-password"
                   variant="filled"
        />
        <div>
        </div>
        <MyButton>Next</MyButton>
      </div>
    );
  }
}


export default Register;
