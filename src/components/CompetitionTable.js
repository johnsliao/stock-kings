import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";

class CompetitionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      columns: [
        { title: "Competition #", field: "competition" },
        { title: "Start Date", field: "start" },
        { title: "End Date", field: "end" },
      ],
      data: this.props.competitions.map((_) => {
        return {
          competition: _.CompetitionID,
          start: _.COMPETITION_START_DATE,
          end: _.COMPETITION_END_DATE,
        };
      }),
    };
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={8}>
          <MaterialTable
            title="Competitions"
            columns={this.state.columns}
            data={this.state.data}
            style={{ padding: "20px" }}
            options={{
              paging: false,
              headerStyle: { position: "sticky", top: 0 },
            }}
            actions={[
              {
                icon: "add",
                tooltip: "Join Competition",
                onClick: (event, rowData) => {
                  console.log("Joined");
                },
              },
            ]}
          />
        </Grid>
        <Grid item xs={8}>
          <MaterialTable
            title="Joined Competitions"
            columns={this.state.columns}
            data={this.state.data.filter(
              (_) => _.competition === this.props.account.competition_id
            )}
            style={{ padding: "20px" }}
            options={{
              paging: false,
              headerStyle: { position: "sticky", top: 0 },
            }}
            actions={[
              {
                icon: "add",
                tooltip: "Join Competition",
                onClick: (event, rowData) => {
                  console.log("Joined");
                },
              },
            ]}
          />
        </Grid>
      </Grid>
    );
  }
}

export default CompetitionTable;
