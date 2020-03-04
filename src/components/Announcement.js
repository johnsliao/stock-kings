import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";


class Announcement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      columns1: [
        { title: "Date", field: "date" },
        { title: "Update", field: "update" }
      ],
      data1: [
        { date: "Mar 5 2020", update: "Bug fixes" },
        { date: "Mar 3 2020", update: "Add an announcement page" },
        { date: "Mar 1 2020", update: "Finish the search friends function" },
      ],
      columns2: [
        { title: "Rank", field: "rank" },
        { title: "Username", field: "username" },
        { title: "Profit", field: "profit" },
      ],
      data2: [
        { rank: "1", username: "Tom", profit: "$123.45" },
        { rank: "2", username: "Jack", profit: "$99.99" },
        { rank: "3", username: "Ann", profit: "$95.45" },
        { rank: "4", username: "Liu", profit: "$90.45" },
        { rank: "5", username: "Jerry", profit: "$85.45" },
        { rank: "6", username: "Tom", profit: "$80.45" },
        { rank: "7", username: "Tom", profit: "$75.45" },
        { rank: "8", username: "Tom", profit: "$70.45" },
        { rank: "9", username: "Tom", profit: "$65.45" },
        { rank: "10", username: "Tom", profit: "$60.45" },
        { rank: "11", username: "Tom", profit: "$55.45" },
        { rank: "12", username: "Tom", profit: "$50.45" },
        { rank: "13", username: "Tom", profit: "$45.45" },
        { rank: "14", username: "Tom", profit: "$40.45" },
        { rank: "15", username: "Tom", profit: "$35.45" },

      ],
    };
  }

  render(){
    return(
      <div>
        <h2>Announcement</h2>

        <Grid container justify="center">
          <Grid item xs={6}>
            <MaterialTable
              title="Change log"
              columns={this.state.columns1}
              data={this.state.data1}
              style={{ padding: "20px" }}
              options={{
                paging: false,
                headerStyle: { position: "sticky", top: 0 }
              }}
            />
          </Grid>
        </Grid>
        <h2> </h2>
        <Grid container justify="center">
          <Grid item xs={6}>
            <MaterialTable
              title="Competition Winners"
              columns={this.state.columns2}
              data={this.state.data2}
              style={{ padding: "20px" }}
              options={{
                paging: 5,
                headerStyle: { position: "sticky", top: 0 }
              }}
            />
          </Grid>
        </Grid>

      </div>
    )
  }
}

export default Announcement;
