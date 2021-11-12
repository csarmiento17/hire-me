import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
// component dependencies
import Snackbar from "../Snackbar";
import Login from "../../containers/Login/Loadable";

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dlgLoginOpen, setDlgLoginOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
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
    setSnackOpen(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            HireMe
          </Typography>
          <Button variant="h6" component="div" mr={3} onClick={handleLogin}>
            Login
          </Button>
          <Button variant="h6" component="div" onClick={handleRegister}>
            Register
          </Button>
          {dlgLoginOpen && (
            <Login
              opendialog={dlgLoginOpen}
              closedialog={() => setDlgLoginOpen(false)}
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
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}
