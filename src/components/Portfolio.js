import React, { Component } from "react";
import StockPortfolio from "./StockPortfolio";
class Portfolio extends Component {
  render() {
    return (
      <div>
        <h2>Portfolio page</h2>
        <h2>Bank ${this.props.bank}</h2>
        <StockPortfolio bank={this.props.bank} setBank={this.props.setBank} />
      </div>
    );
  }
}

export default Portfolio;
