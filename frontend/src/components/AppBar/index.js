import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import {
  Box,
  Toolbar,
  Button,
  IconButton,
  Typography,
  MenuItem,
  Menu,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

// component dependencies
import Snackbar from "../Snackbar";
import Login from "../../containers/Login/Loadable";
import Register from "../../containers/Register";
import Auth from "../../utils/auth";
import Logo from "../../assets/logo.png";
export default function MenuAppBar() {
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dlgLoginOpen, setDlgLoginOpen] = useState(false);
  const [dlgRegisterOpen, setDlgRegisterOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const history = useHistory();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    setDlgLoginOpen(true);
  };

  const handleRegister = () => {
    setDlgRegisterOpen(true);
  };

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  }

  const handleContactUs = () => {
    history.push("/contact-us");
  };

  const handleSavedJobs = () => {
    history.push("/saved-jobs");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
        <IconButton component={Link} to="/">
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "50px", height: "50px" }}
            />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />

          {Auth.loggedIn() ? (
          <>
          
          <Button variant="h6" component="div" onClick={handleContactUs}>
            Contact Us
          </Button>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem onClick={handleSavedJobs}>My Jobs</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </>
      ) : (
        <>

          <Button variant="h6" component="div" mr={3} onClick={handleLogin}>
            Login
          </Button>
          <Button variant="h6" component="div" onClick={handleRegister}>
            Register
          </Button>
          <Button variant="h6" component="div" onClick={handleContactUs}>
            Contact Us
          </Button>

          {dlgLoginOpen && (
            <Login
              opendialog={dlgLoginOpen}
              closedialog={() => setDlgLoginOpen(false)}
            />
          )}
          {dlgRegisterOpen && (
            <Register
              opendialog={dlgRegisterOpen}
              closedialog={() => setDlgRegisterOpen(false)}
            />
          )}
          {snackOpen && (
            <Snackbar
              snackopen={snackOpen}
              snackclose={() => setSnackOpen(false)}
              message="User successfully created!"
            />
          )}
          </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}
