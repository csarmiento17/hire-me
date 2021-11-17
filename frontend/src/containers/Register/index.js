import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { REGISTER } from "../../utils/mutations";
import Auth from "../../utils/auth";
//component Dependencies
import Snackbar from "../../components/Snackbar";

export default function Register({ opendialog, closedialog }) {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: "",
    password: "",
  });
  const [register, { error }] = useMutation(REGISTER);
  const [err, setErr] = useState(false);
  const [result, setResult] = useState(false);
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await register({
        variables: { 
          firstName: formState.firstName,
          lastName: formState.lastName,
          email: formState.email,
          password: formState.password,
        },
      });

      // const token = mutationResponse.data.register.token;
      Auth.login(data.register.token);
      setResult(true);
    } catch (e) {
      console.error(e);
      setErr(true);
    }
    // handleClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    closedialog(event);
  };

  return (
    <form>
      <Grid container>
        <Dialog open={opendialog} onClose={handleClose}>
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              minWidth: "300px",
              backgroundColor: "primary.main",
              color: "#fff",
            }}
          >
            Register
          </DialogTitle>
          <DialogContent
            sx={{ "& .MuiTextField-root": { marginTop: 2 }, marginTop: 2 }}
          >
            <TextField
            autoFocus
            margin="dense"
            id="firstName"
            name="firstName"
            label="First Name"
            type="firstName"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="lastName"
            name="lastName"
            label="Last Name"
            type="lastName"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
            <TextField
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions sx={{ marginBottom: 3, px: 3 }}>
            <Button
              type="submit"
              onClick={handleFormSubmit}
              variant="contained"
              fullWidth
              size="large"
            >
              Register
            </Button>
          </DialogActions>
        </Dialog>

        {err && (
          <Snackbar
            snackopen={err}
            snackclose={() => setErr(false)}
            message="Login failed"
          />
        )}
        {result && (
          <Snackbar
            snackopen={result}
            snackclose={() => setResult(false)}
            message="User successfully logged in..."
          />
        )}
      </Grid>
    </form>
  );
}

Register.propTypes = {
  openDialog: PropTypes.bool,
  closeDialog: PropTypes.any,
};
