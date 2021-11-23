import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import {
  Box,
  Toolbar,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  Menu,
  Divider,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  Logout,
  Favorite,
  Verified,
  AccountBox,
  AddAlert,
} from "@mui/icons-material";

import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";

// component dependencies
import Snackbar from "../Snackbar";
import Login from "../../containers/Login/Loadable";
import Register from "../../containers/Register";
import Subscribe from "../../containers/Subscribe";
import Auth from "../../utils/auth";
import Logo from "../../assets/logo.png";

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dlgLoginOpen, setDlgLoginOpen] = useState(false);
  const [dlgRegisterOpen, setDlgRegisterOpen] = useState(false);
  const [dlgSubscribeOpen, setDlgSubscribeOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const history = useHistory();
  const { data } = useQuery(QUERY_ME);

  const premium = data?.me?.premium || null;

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

  const handleSubscribe = () => {
    setDlgSubscribeOpen(true);
  };
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const handleContactUs = () => {
    history.push("/contact-us");
  };

  const handleProfile = () => {
    history.push("/profile");
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hire Me
          </Typography>

          {Auth.loggedIn() ? (
            <>
              <Button variant="h6" component="div" onClick={handleContactUs}>
                Contact Us
              </Button>

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
                  <MenuItem onClick={handleProfile}>
                    <ListItemIcon>
                      <AccountBox fontSize="small" />
                    </ListItemIcon>
                    Profile
                    {premium && (
                      <ListItemIcon>
                        <Verified fontSize="small" />
                      </ListItemIcon>
                    )}
                  </MenuItem>
                  <MenuItem onClick={handleSavedJobs}>
                    <ListItemIcon>
                      <Favorite fontSize="small" />
                    </ListItemIcon>
                    My Jobs
                  </MenuItem>
                  {!premium && (
                    <MenuItem onClick={handleSubscribe}>
                      <ListItemIcon>
                        <AddAlert fontSize="small" />
                      </ListItemIcon>
                      Subscribe
                    </MenuItem>
                  )}
                  <Divider />
                  <MenuItem onClick={logout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>

              {dlgSubscribeOpen && (
                <Subscribe
                  opendialog={dlgSubscribeOpen}
                  closedialog={() => setDlgSubscribeOpen(false)}
                />
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
