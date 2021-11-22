import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
import { Box, Grid, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Snackbars from "../../components/Snackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    margin: "2em",
    maxWidth: "100vw",
  },
}));

const ContactUs = () => {
  const classes = useStyles();

  const form = useRef();
  const [result, setResult] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAIL_SERVICE_ID,
        process.env.REACT_APP_EMAIL_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAIL_USER_ID
      )
      .then(
        (result) => {
          console.log(result);
          setResult(result);
        },
        (error) => {
          console.log(error);
          setResult(error);
        }
      );
    form.current.reset();
  };

  return (
    <Box className="container">
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12} sm={6}>
          <form ref={form} onSubmit={sendEmail}>
            <TextField
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              id="email"
              name="email"
              label="Email address"
              type="text"
              fullWidth
              variant="outlined"
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              id="phone"
              name="phone"
              label="Phone number"
              type="text"
              fullWidth
              variant="outlined"
              onChange={handleChange}
              required
            />

            <TextField
              id="message"
              name="message"
              margin="dense"
              label="Write your message"
              multiline
              fullWidth
              variant="outlined"
              rows={4}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" fullWidth size="large">
              SEND MESSAGE
            </Button>
          </form>
        </Grid>

        {/** <Grid item xs={12}>
          <img
            src={SendEmailImg}
            alt="Email"
            style={{ height: "100%", width: "100%", marginTop: "-80px" }}
          />
        </Grid>
        */}
        {result.status !== 200 ? (
          <Snackbars
            snackopen={result}
            snackclose={() => setResult(false)}
            message={result.toString()}
          />
        ) : (
          <Snackbars
            snackopen={result}
            snackclose={() => setResult(false)}
            message="Message successfully sent. Thank you for your message."
          />
        )}
      </Grid>
    </Box>
  );
};

export default ContactUs;
