import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Toolbar,
  AppBar
} from "@material-ui/core/";
import { Link } from "react-router-dom";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = event => {
    setAuth(event.target.checked);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/">Home</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/dashboard">Dashboard</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/settings">Settings</Link>
            </MenuItem>
          </Menu>
          <Typography variant="h6" className={classes.title}>
            Stock Kings
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MenuAppBar;
