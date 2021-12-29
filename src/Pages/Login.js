import React , {useContext, useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {FirebaseContext} from '../Firebase/AuthProvider'
import { Alert, Snackbar } from "@mui/material";
import {useHistory} from 'react-router-dom'
const  Copyright=(props)=> {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
       Blog
      {" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();


const SignIn=()=> {
    const history=useHistory()
    const {login,error,setError,open,setOpen}=useContext(FirebaseContext)

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')


    const handleClose=(e,reason)=>{
        if(reason==='clickaway'){
            return
        }
        setOpen(false)
    }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setError('')
    try {
        await login(email,password)
        history.push('/')
    } catch (err) {
        setError(err)
        setOpen(true)
    }
        setEmail('')
        setPassword('')
  };

  const handleGuestCredential=()=>{
    setEmail('guesttest01@gmail.com')
    setPassword('guesttest01')
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 0 }}
            >
              Login
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              onClick={handleGuestCredential}
            >
              Guest credentials
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      {error ? (
        <Snackbar
          autoHideDuration={3000}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
        >
          <Alert severity="error">{error.message}</Alert>
        </Snackbar>
      ) : (
        <Snackbar
          autoHideDuration={3000}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
        >
          <Alert severity="success">Logged In</Alert>
        </Snackbar>
      )}
    </ThemeProvider>
  );
}

export default SignIn