import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TransactionsPortfolio from "./TransactionsPortfolio";

class SearchFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUsername: "",
      usernames: this.props.friends.map(_ => _.Username)
    };
  }

  handleChange = event => {
    this.setState({ selectedUsername: event.target.value });
  };

  render() {
    return (
      <Grid container justify="center" spacing={4}>
        <Grid item xs={4}>
          <h2>Search Friends</h2>
        </Grid>
        <Grid item xs={12} justify="center">
          <Grid item>
            <Select
              labelId="search-friends"
              id="search-friends"
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
      </Grid>
    );
  }
}

export default SearchFriends;
