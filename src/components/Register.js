import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core'


class Register extends Component {
  render() {
    return (
      <div>
        <h2>Register Page</h2>
        <TextField id="outlined-size-normal" label="UserName" variant="outlined"/>
        <div>
        </div>
        <TextField id="outlined-secondary" label="Email" variant="outlined"/>
        <div>
        </div>
        <TextField id="outlined-secondary" label="Password" variant="outlined"/>
        <div>
        </div>
        <TextField id="outlined-secondary" label="Confirm" variant="outlined"/>
        <div>
        </div>
        <Button variant="contained" color="primary" > Finish </Button>
      </div>
    );
  }
}


export default Register;
