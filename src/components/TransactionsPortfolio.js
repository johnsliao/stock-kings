import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";

class TransactionsPortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      columns: [
        { title: "Symbol", field: "symbol" },
        { title: "Stock", field: "stock" },
        { title: "Purchase Price", field: "price" },
        { title: "Purchase Date", field: "date" },
        { title: "Type", field: "type" }
      ],
      data: this.props.transactions.map(transaction => {
        return {
          stock: transaction.ShortName,
          symbol: transaction.Symbol,
          price: "$" + transaction.PurchasePrice,
          date: transaction.PURCHASE_DATE,
          type: transaction.Type
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
            title="Past Transactions"
            columns={this.state.columns}
            data={this.state.data}
            style={{ padding: "20px" }}
            options={{
              paging: false,
              headerStyle: { position: "sticky", top: 0 }
            }}
          />
        </Grid>
      </Grid>
    );
  }
}

export default TransactionsPortfolio;
