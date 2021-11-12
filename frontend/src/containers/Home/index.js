import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import React, { useEffect, useState } from "react";


const Home = () => {

  const [values, setValues] = React.useState({
    searchParameter: '',
    location: ''
  });

  return (
    <>
      <main>
        <Grid container spacing={2} sx={{justifyContent: 'center', marginTop: '1em'}}>
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                '& .MuiTextField-root': { m: 1, width: '50ch' },

              }}
              noValidate
              autoComplete="off"
              
            >  
              <TextField id="outlined-search" label="Job title, keywords, or company" type="search" />
              <TextField id="outlined-search" label="location" type="search" />
              <Button variant="contained">Find jobs</Button>     
            </Box>
        </Grid>   
      </main>
    </>
  );
};

export default Home;
