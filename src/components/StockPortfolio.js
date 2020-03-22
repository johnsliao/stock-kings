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
        { title: "Current Price", field: "currentPrice" },

        { title: "Average Cost Per Share", field: "costPerShare" },
        { title: "Avg Cost", field: "avgCost" },
        { title: "Total Cost", field: "totalCost" },
        { title: "Shares Owned", field: "shares" },
        { title: "Unrealized Gain/Loss", field: "gain" }
      ],
      data: this.calculateStocks().map(stock => {
        return {
          stock: stock.stock,
          currentPrice: 200,
          symbol: stock.symbol,
          costPerShare: stock.costPerShare,
          avgCost: stock.avgCost,
          totalCost: stock.totalCost,
          shares: stock.shares,
          gain: stock.gain
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

  calculateStocks = () => {
    let stocks = [];

    this.props.transactions.forEach(transaction => {
      let stockNames = stocks.map(_ => _.stock);
      let currentStockPrice = 200;

      if (transaction.Type === "BUY") {
        if (stockNames.includes(transaction.ShortName)) {
          const i = stocks.findIndex(_ => _.stock === transaction.ShortName);

          stocks[i].costPerShare =
            (stocks[i].costPerShare * stocks[i].shares +
              transaction.PurchasePrice) /
            (stocks[i].shares + 1);
          stocks[i].totalCost =
            stocks[i].totalCost * stocks[i].shares + transaction.PurchasePrice;

          stocks[i].shares += 1;

          stocks[i].avgCost = stocks[i].totalCost / stocks[i].shares;
          stocks[i].gain = currentStockPrice - stocks[i].totalCost;
        } else {
          stocks.push({
            stock: transaction.ShortName,
            symbol: transaction.Symbol,
            costPerShare: transaction.PurchasePrice,
            avgCost: transaction.PurchasePrice,
            totalCost: transaction.PurchasePrice,
            shares: 1,
            gain: 0
          });
        }
      } else {
        if (stockNames.includes(transaction.ShortName)) {
          const i = stocks.findIndex(_ => _.stock === transaction.ShortName);

          stocks[i].costPerShare =
            (stocks[i].costPerShare * stocks[i].shares -
              transaction.PurchasePrice) /
            (stocks[i].shares + 1);
          stocks[i].totalCost =
            stocks[i].totalCost * stocks[i].shares - transaction.PurchasePrice;

          stocks[i].shares -= 1;

          stocks[i].avgCost = stocks[i].totalCost / stocks[i].shares;
          stocks[i].gain = currentStockPrice - stocks[i].totalCost;

          if (stocks[i].shares === 0) {
            stocks.splice(i, 1);
          }
        }
      }
    });

    return stocks;
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
