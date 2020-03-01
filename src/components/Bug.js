import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  snackbar: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class Bug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      open: false
    };
  }
  handleChange = event => {
    this.setState({ description: event.target.value });
  };

  handleClick = () => {
    console.log("User submitted issue: " + this.state.description);
    this.setState({ open: true, description: "" });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid
          container
          item
          spacing={4}
          xs={12}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4">Need to report a bug?</Typography>
            <Typography paragraph>
              We are here for you. Please send us information on any issues or
              concerns you may have.
            </Typography>
            <div className={classes.root}>
              <div>
                <TextField
                  id="standard-full-width"
                  label="Describe your problem"
                  style={{ margin: 8 }}
                  placeholder="I had an issue ..."
                  multiline
                  fullWidth
                  rowsMax="4"
                  onChange={this.handleChange}
                  value={this.state.description}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <div className={classes.snackbar}>
                  <Button variant="outlined" onClick={this.handleClick}>
                    Submit
                  </Button>
                  <Snackbar
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                  >
                    <Alert onClose={this.handleClose} severity="success">
                      Your information has been submitted successfully!
                    </Alert>
                  </Snackbar>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Bug);
