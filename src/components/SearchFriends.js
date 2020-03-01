import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FriendPortfolioTable from "./FriendPortfolioTable";

class SearchFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUsername: "",
      usernames: [
        { username: "Bob123" },
        { username: "John123" },
        { username: "Tom123" },
        { username: "Alfred" },
        { username: "Kabob" },
        { username: "Michael" },
        { username: "Jebbediah8008" }
      ]
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
        <Grid container item xs={12} justify="center">
          <Grid item>
            <Select
              labelId="search-friends"
              id="search-friends"
              value={this.state.selectedUsername}
              onChange={event => this.handleChange(event)}
              style={{ minWidth: "300px" }}
            >
              {this.state.usernames.map(obj => (
                <MenuItem value={obj.username} key={obj.username}>
                  {obj.username}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid>
          {this.state.selectedUsername !== "" && (
            <FriendPortfolioTable
              selectedUsername={this.state.selectedUsername}
            />
          )}
        </Grid>
      </Grid>
    );
  }
}

export default SearchFriends;
