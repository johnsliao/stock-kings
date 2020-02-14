import React, { Component } from "react";
import StockPicker from "./StockPicker"

const bank = 500

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h2>Dashboard Page</h2>
        <h3>Bank ${bank}</h3>
        <StockPicker />
      </div>
    );
  }
}

export default Dashboard;
