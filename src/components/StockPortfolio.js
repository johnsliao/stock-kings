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
      data: this.props.stocks.map(stock => {
        return {
          stock: stock.ShortName,
          symbol: stock.Symbol,
          price: stock.MarketPrice,
          shares: stock.NumberOwned,
          total: "$" + stock.NumberOwned * stock.MarketPrice
        };
      })
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
