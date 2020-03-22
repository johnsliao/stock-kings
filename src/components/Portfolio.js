import React, { Component } from "react";
import StockPortfolio from "./StockPortfolio";
import { Grid } from "@material-ui/core";

class Portfolio extends Component {
  render() {
    return (
      <div>
        <h2>Portfolio page</h2>
        <h2>Bank ${this.props.account.buyingpower}</h2>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <StockPortfolio
              account={this.props.account}
              stocks={this.props.stocks}
              setBank={this.props.setBank}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Portfolio;
