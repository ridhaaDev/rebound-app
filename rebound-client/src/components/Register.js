import React, { useState } from 'react'

// For Snackbar
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LinearProgress from '@mui/material/LinearProgress';
import { registerUser } from '../services/LoginService';
import  { Navigate, useNavigate } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [message, setMessage] = useState("")
  const [openSnack, setOpenSnack] = useState(false);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    

    e.preventDefault();

    registerUser(username, email, name, password).then(res => {
      setOpenSnack(true);
      setMessage("Successfully registered!")
      navigate("/login")
    }).catch(error => {
      if (error.response.status === 401) {
        setOpenSnack(true);
        setMessage(error.response.data.message)
      } else {
        setOpenSnack(true);
        setMessage("Something went wrong")
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
    <LinearProgress color='secondary' />

      <form className="register-container" onSubmit={submitHandler}>
        <h1>Join us today!</h1>

        <div className="form-container">
          <input type="text" placeholder="Enter name..." value={name} onChange={event => setName(event.target.value)} required />
          <input value={username} placeholder="Enter username..." onChange={event => setUsername(event.target.value)} required />
          <input value={email} placeholder="Enter email..." onChange={event => setEmail(event.target.value)} required />
          <input type="password" placeholder="Enter password..." value={password} onChange={event => setPassword(event.target.value)} required />
          <button type='submit'>Register</button>
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

export default Register