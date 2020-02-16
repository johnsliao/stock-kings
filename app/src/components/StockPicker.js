import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  button: {}
}));

export default function StockPicker() {
  const classes = useStyles();

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
          <Autocomplete
            id="search"
            options={sampleStocks}
            getOptionLabel={option => option.stock + " $" + option.price}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField
                {...params}
                label="Search"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item>
          <Button className={classes.button}>Buy</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const sampleStocks = [
  { stock: "APPLE", price: 50 },
  { stock: "YAHOO", price: 75 },
  { stock: "NVIDIA", price: 100 }
];
