import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";

class StockPortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      columns: [
        { title: "Symbol", field: "symbol" },
        { title: "Stock", field: "stock" },
        { title: "Price Per Share", field: "price" },
        { title: "Shares Owned", field: "shares" },
        { title: "Total", field: "total" }
      ],
      data: [
        {
          stock: "Yahoo",
          symbol: "YAHOO",
          price: 25.12,
          shares: 1,
          total: 100
        },
        {
          stock: "Google",
          symbol: "GOOG",
          price: 35.42,
          shares: 2,
          total: 100
        },
        { stock: "Apple", symbol: "AAPL", price: 199.29, shares: 3, total: 100 }
      ]
    };
  }
  checkBank = amount => {
    if (this.props.account.buyingpower - amount < 0) {
      this.setState({ open: true });
      return false;
    }
    return true;
  };
  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={8}>
          <MaterialTable
            title="Your Stock Portfolio"
            columns={this.state.columns}
            data={this.state.data}
            style={{ padding: "20px" }}
            options={{
              paging: false,
              headerStyle: { position: "sticky", top: 0 }
            }}
            actions={[
              {
                icon: "remove",
                tooltip: "Sell Stock",
                onClick: (event, rowData) => {
                  if (this.checkBank(rowData.price)) {
                    this.props.setBank(
                      parseInt(this.props.account.buyingpower) + rowData.price
                    );
                  }
                }
              }
            ]}
          />
        </Grid>
      </Grid>
    );
  }
}

export default StockPortfolio;
