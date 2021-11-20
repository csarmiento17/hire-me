import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { PREMIUM } from '../../utils/mutations';
import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Success() {
  


  return (
    <Box>
      <Dialog
        fullScreen
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Success!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Thank you for your purchase!
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            You will now be redirected to the home page
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Success;
