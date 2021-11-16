import React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { PropTypes } from "prop-types";

export default function Snackbars({ snackopen, snackclose, message }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    snackclose(event);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <Snackbar
        open={snackopen}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        action={action}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </div>
  );
}

Snackbars.propTypes = {
  snackopen: PropTypes.bool,
  snackclose: PropTypes.any,
  message: PropTypes.string,
};
