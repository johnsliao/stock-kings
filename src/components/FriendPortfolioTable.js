import React, { Component } from "react";
import MaterialTable from "material-table";

class FriendPortfolioTable extends Component {
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

  render() {
    return (
      <MaterialTable
        title={`${this.props.selectedUsername}'s Stock Portfolio`}
        columns={this.state.columns}
        data={this.state.data}
        style={{ padding: "20px" }}
        options={{
          paging: false,
          headerStyle: { position: "sticky", top: 0 }
        }}
      />
    );
  }
}

export default FriendPortfolioTable;
