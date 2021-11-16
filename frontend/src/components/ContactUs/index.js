import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
import { Grid, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import emailImg from "../../assets/email.jpg";
import DialogError from "../Dialog";
import Snackbars from "../Snackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    margin: "2em",
    maxWidth: "100vw",

    //className={classes.info}
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
    <Grid container className={classes.root} spacing={3}>
      <Grid item xs={6}>
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
          />
          <Button type="submit" variant="contained" fullWidth size="large">
            SEND MESSAGE
          </Button>
        </form>
      </Grid>
      <Grid item xs={6}>
        <img
          src={emailImg}
          alt="Email"
          style={{ height: "80%", width: "80%", marginTop: "10px" }}
        />
      </Grid>
      {result.status !== 200 ? (
        <DialogError
          opendialog={result}
          closeDialog={() => setResult(false)}
          message={result.toString()}
          title="Error"
        />
      ) : (
        <Snackbars
          snackopen={result}
          snackclose={() => setResult(false)}
          message="Message successfully sent. Thank you for your message."
        />
      )}
    </Grid>
  );
};

export default ContactUs;
