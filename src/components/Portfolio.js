import React, { Component } from "react";
import StockPortfolio from "./StockPortfolio";
class Portfolio extends Component {
  render() {
    return (
      <div>
        <h2>Portfolio page</h2>
        <h2>Bank ${this.props.account.buyingpower}</h2>
        <StockPortfolio
          account={this.props.account}
          stocks={this.props.stocks}
          setBank={this.props.setBank}
        />
      </div>
    );
  }
}

export default Portfolio;
