import React, { Component } from "react";
import StockPicker from "./StockPicker";

class Trade extends Component {
  render() {
    return (
      <div>
        <h2>Trading page</h2>
        <h2>Bank ${this.props.bank}</h2>
        <StockPicker bank={this.props.bank} setBank={this.props.setBank} />
      </div>
    );
  }
}

export default Trade;
