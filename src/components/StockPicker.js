import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class StockPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      columns: [
        { title: "Symbol", field: "symbol" },
        { title: "Stock", field: "stock" },
        { title: "Price", field: "price" }
      ],
      data: [
        { stock: "Yahoo", symbol: "YAHOO", price: 25.12 },
        { stock: "Google", symbol: "GOOG", price: 35.42 },
        { stock: "Apple", symbol: "AAPL", price: 199.29 }
      ]
    };
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  checkBank = amount => {
    if (this.props.bank - amount < 0) {
      this.setState({ open: true });
      return false;
    }
    return true;
  };

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={8}>
          {this.state.bank}
          <MaterialTable
            title="Stocks"
            columns={this.state.columns}
            data={this.state.data}
            style={{ padding: "20px" }}
            options={{
              paging: false,
              headerStyle: { position: "sticky", top: 0 }
            }}
            actions={[
              {
                icon: "add",
                tooltip: "Buy Stock",
                onClick: (event, rowData) => {
                  if (this.checkBank(rowData.price)) {
                    this.props.setBank(this.props.bank - rowData.price);
                  }
                }
              }
            ]}
          />
        </Grid>
        <Snackbar
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <Alert onClose={this.handleClose} severity="error">
            Insufficient funds to purchase this stock
          </Alert>
        </Snackbar>
      </Grid>
    );
  }
}

export default StockPicker;
