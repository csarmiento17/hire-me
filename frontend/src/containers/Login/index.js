import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

export default function Login({
  opendialog,
  closedialog
}) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    closedialog(event);
  };

  return (
    <Grid container>
      <Dialog
        open={opendialog}
        onClose={closedialog}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            minWidth: "300px",
            backgroundColor: "primary.main",
            color: "#fff",
          }}
        >
          Login
        </DialogTitle>
        <DialogContent 
          sx={{ '& .MuiTextField-root': { marginTop: 2 }, marginTop: 2 }}
        >
          <TextField
            autoFocus
            margin="dense"
            id="loginEmail"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="loginPassword"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions sx={{ marginBottom: 3, px: 3 }}>
          <Button onClick={handleClose} variant="contained" fullWidth size='large' >Login</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

Login.propTypes = {
  openDialog: PropTypes.bool,
  closeDialog: PropTypes.any
};

