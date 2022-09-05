import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import LinearProgress from '@mui/material/LinearProgress';

import { setUserSession } from '../services/AuthService'
import { usePromiseTracker } from "react-promise-tracker";
import { loginUser } from '../services/LoginService';

const Login = (props) => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setmessage] = useState(null)
  const [openSnack, setOpenSnack] = React.useState(false);

  const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();

    return (
      promiseInProgress && <LinearProgress color="secondary" />
    );
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      setOpenSnack(true);
      setmessage('Both username and password are required')
    }
    setmessage(null)

    loginUser(username, password).then(response => {
      setUserSession(response.data.user, response.data.token)
      navigate('/premium-content')
    }).catch(error => {
      console.log(error.response.status)
      if (error.response.status == 401 || error.response.status == 403) {
        setOpenSnack(true);
        setmessage(error.response.data.message)
      } else {
        setOpenSnack(true);
        setmessage("Server is down. Please try again later.")
      }
    })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className='outer-container'>
      <LoadingIndicator />
      <form className="register-container" onSubmit={submitHandler}>
        <h1>Login to your account</h1>

        <div className="form-container">
          <input placeholder="Enter username..." value={username} onChange={event => setUsername(event.target.value)} />
          <input type="password" placeholder="Enter password..." value={password} onChange={event => setPassword(event.target.value)} />
          <button type='submit'>Login</button>
        </div>
      </form>

      {message && <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
      }
    </div>
  )
}

export default Login