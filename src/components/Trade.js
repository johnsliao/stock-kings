import React, { Component } from "react";
import StockPicker from "./StockPicker";

class Trade extends Component {
  render() {
    return (
      <div>
        <h2>Trading page</h2>
        <h2>Bank ${this.props.account.buyingpower}</h2>
        <StockPicker
          account={this.props.account}
          setBank={this.props.setBank}
          buyStock={this.props.buyStock}
        />
      </div>
    );
  }
}

export default Trade;
