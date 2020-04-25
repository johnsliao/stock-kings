import React, { Component } from "react";
import CompetitionTable from "./CompetitionTable.js";
class Competition extends Component {
  render() {
    return (
      <div>
        <h2>Competition Page</h2>
        <CompetitionTable
          competitions={this.props.competitions}
          account={this.props.account}
        />
      </div>
    );
  }
}

export default Competition;
