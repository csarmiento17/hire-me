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
  Divider,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Verified from "@mui/icons-material/Verified";

// component dependencies
import Snackbar from "../Snackbar";
import Login from "../../containers/Login/Loadable";
import Register from "../../containers/Register";
import Logo from "../../assets/logo.png";
export default function MenuAppBar() {
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dlgLoginOpen, setDlgLoginOpen] = useState(false);
  const [dlgRegisterOpen, setDlgRegisterOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const history = useHistory();

  // temp premium variable. Get value from user
  const premium = false;

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

  const handleContactUs = () => {
    history.push("/contact-us");
  };

  const handleSavedJobs = () => {
    history.push("/saved-jobs");
  };

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton component={Link} to="/">
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "50px", height: "50px" }}
            />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />

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
                <MenuItem>
                  {premium && <Verified fontSize="small" />}
                  Profile
                </MenuItem>
                <MenuItem onClick={handleSavedJobs}>My Jobs</MenuItem>
                {!premium && 
                  <>
                    <Divider />
                    <MenuItem>Subscribe</MenuItem>
                  </>
                }

              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}
