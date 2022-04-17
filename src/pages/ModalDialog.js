import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import FormSignIn from './form';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexDirection: 'columns',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '500px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));
const ModalDialog = ({ open, handleClose }) => {

  const [title, setTitle] = React.useState("Login Here")
  const [viewMode, setViewMode] = React.useState("member");
  const clickHandle = (ev) => {

    if (ev.currentTarget.value === "member") setViewMode("member")
    if (ev.currentTarget.value === "admin") setViewMode("admin")
    setTitle("Login Here")
  }
  const createForm = (ev) => {
    setViewMode("signUp");
    setTitle("Sign Up Here")
  }
  const h3b = {
    display: "flex",
    backgroundColor: "#3a3f6d",
    color: "white",
  }
  const h3t = {
    padding: "10px",
    margin: "auto",
  }
  return (
    // props received from App.js
    <div>
      <Dialog open={open} onClose={handleClose}>
        <div style={h3b}>
          <h3 style={h3t}>{title}</h3>
        </div>
        <Button onClick={clickHandle} value="member">Member</Button>
        <Button onClick={clickHandle} value="admin">Admin</Button>
        {viewMode === "signUp" && <FormSignIn handleClose={handleClose} />}
        {viewMode === "member" && <LoginAsMember handleClose={handleClose} createForm={createForm} />}
        {viewMode === "admin" && <LoginAsAdmin handleClose={handleClose} />}
      </Dialog>
    </div >
  );
};

const LoginAsMember = ({ handleClose, createForm }) => {
  const classes = useStyles();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const linkForm = (ev) => {
    createForm(ev)
  }
  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();

    handleClose();
    navigate("/")
  };
  return (

    <div>

      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="filled"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="filled"
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Log In
          </Button>
        </div>
      </form>
      <div><p>Don't have an account? Create one here: <a href="#" onClick={linkForm}>SignUp</a></p></div>
    </div>
  )
}

const LoginAsAdmin = ({ handleClose }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleSubmit = e => {
    e.preventDefault();

    handleClose();
    navigate("/")
  };
  return (
    <div>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="filled"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="filled"
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            log in
          </Button>
        </div>
      </form>
    </div>


  )
}
export default ModalDialog;