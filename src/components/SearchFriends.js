import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TransactionsPortfolio from "./TransactionsPortfolio";
import MaterialTable from "material-table";

class SearchFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUsername: "",
      usernames: this.props.friends.map(_ => _.Username),
      columns1: [
        { title: "Username", field: "username" },
        { title: "Buying Power", field: "buyingPower" },
      ],
      data1: [
        { username: "Tom", buyingPower: "$123.45" }]
    };
  }
  
  handleChange = event => {
    this.setState({ selectedUsername: event.target.value });
  };

  render() {
    return (
      <Grid container justify="center" spacing={4}>
        <Grid item xs={4}>
          <h2>View My Friends</h2>
        </Grid>
        <Grid item xs={12} justify="center">
          <Grid item>
            <Select
              labelId="view-friends"
              id="view-friends"
              value={this.state.selectedUsername}
              onChange={event => this.handleChange(event)}
              style={{ minWidth: "300px" }}
            >
              {this.state.usernames.map(username => (
                <MenuItem value={username} key={username}>
                  {username}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {this.state.selectedUsername !== "" && (
            <TransactionsPortfolio
              transactions={
                this.props.friends.find(
                  _ => _.Username === this.state.selectedUsername
                ).transactions
              }
            />
          )}
        </Grid>

        <Grid item xs={4}>
          <h2>Find a Friend</h2>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={6}>
            <MaterialTable
              title="Users"
              columns={this.state.columns1}
              data={this.state.data1}
              style={{ padding: "20px" }}
              options={{
                paging: 5,
                headerStyle: { position: "sticky", top: 0 }
              }}
            />
          </Grid>
        </Grid>

      </Grid>
    );
  }
}

export default SearchFriends;
