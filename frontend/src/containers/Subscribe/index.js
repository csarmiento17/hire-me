import React, { useState, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery, useMutation } from '@apollo/client';
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

import { QUERY_SUBSCRIBE } from '../../utils/queries';
import { ADD_LENGTH_OF_SUBSCRIPTION } from "../../utils/mutations";

// Stripe object using test API key
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

export default function Subscribe({ opendialog, closedialog }) {
  
  const [formState, setFormState] = useState(0);
  const [addSubscriptionLength] = useMutation(ADD_LENGTH_OF_SUBSCRIPTION);
  const [getSubscription, { data }] = useLazyQuery(QUERY_SUBSCRIBE);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.subscribe.session });
      });
    }
  }, [data]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    addSubscriptionLength({
      variables: { productNum: formState }
    });
    getSubscription({
      variables: { productNum: formState }
    });
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setFormState(parseInt(value));
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
            Subscription
          </DialogTitle>
          <DialogContent
            sx={{ "& .MuiTextField-root": { marginTop: 2 }, marginTop: 2 }}
          >
            <FormControl component="fieldset">
              <FormLabel component="legend">Subscribe</FormLabel>
              <RadioGroup 
                row 
                aria-label="gender" 
                name="row-radio-buttons-group" 
                onChange={handleChange}
              >
                <FormControlLabel value="1" control={<Radio />} label="1 Month" />
                <FormControlLabel value="2" control={<Radio />} label="6 Months" />
                <FormControlLabel value="3" control={<Radio />} label="1 Year" />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ marginBottom: 3, px: 3 }}>
            <Button
              type="submit"
              onClick={handleFormSubmit}
              variant="contained"
              fullWidth
              size="large"
            >
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </form>
  );
}

Subscribe.propTypes = {
  openDialog: PropTypes.bool,
  closeDialog: PropTypes.any,
};