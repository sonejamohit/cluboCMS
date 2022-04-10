
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

const ModalDialog = ({ open, handleClose}) => {
  // const [accessId,setAcessId]=React.useState(true);
    const [title,setTitle]=React.useState("Login Here")
    const [viewMode,setViewMode]=React.useState("member");
 const clickHandle=(ev)=>{

     if(ev.currentTarget.value==="member") setViewMode("member")
     if(ev.currentTarget.value==="admin") setViewMode("admin")
     setTitle("Login Here")
 }
  const createForm=(ev)=>{
      setViewMode("signUp");
      setTitle("Sign Up Here")
  }
  return (
    // props received from App.js
    <div>
    <Dialog open={open} onClose={handleClose}>
    <h3 >{title}</h3>
     <Button   onClick={clickHandle} value="member">Member</Button>
    <Button   onClick={clickHandle} value="admin">As Admin</Button> 
    {viewMode==="signUp"&& <FormSignIn handleClose={handleClose}/>}
  {viewMode==="member" && <LoginAsMember handleClose={handleClose} createForm={createForm}/>}
 { viewMode==="admin" && <LoginAsAdmin handleClose={handleClose} />}
    </Dialog>
    </div>
  );
};

const LoginAsMember=({handleClose,createForm})=>{
    const classes = useStyles();
    const [email,setEmail]=React.useState('');
    const [password,setPassword]=React.useState('');
    const linkForm=(ev)=>{
        createForm(ev)
    }
    const navigate = useNavigate();
    const handleSubmit = e => {
        e.preventDefault();
        
        handleClose();
        navigate("/") 
      };
return(
    
    <div>
            <div><p>don't  have account a create here <a href="#" onClick={linkForm}>SignUp</a></p></div> 
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
          Login In
        </Button>
      </div>
      </form>
    </div>
)
}

const LoginAsAdmin=({handleClose})=>{
    const classes = useStyles();
    const navigate = useNavigate();
    const [email,setEmail]=React.useState('');
    const [password,setPassword]=React.useState('');
    const handleSubmit = e => {
        e.preventDefault();
   
        handleClose();
        navigate("/")
      };
    return(
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
          login In
        </Button>
      </div>
      </form>
    </div>

        
    )
}
export default ModalDialog;