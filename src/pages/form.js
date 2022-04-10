
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const addMember=(member)=>{
  const promise=new Promise((resolve,reject)=>{
    var datastring=`firstName=${encodeURIComponent(member.firstName)}&lastName=${encodeURIComponent(member.lastName)} &Email=${encodeURIComponent(member.Email)} &password=${encodeURIComponent(member.password)}`;
   alert(datastring)
    fetch('/createMember',{
      "method":"POST",
"headers":{
"Content-Type":"application/x-www-form-urlencoded"
},
"body":datastring
    }).then((response)=>{
      alert(response.ok)
      if(!response.ok) throw Error ("unable to connect database")
      return(response.json())
    }).then((member)=>{resolve(member)}).catch((error)=>{
      reject(error.message)
    })
  });
  return promise;
  }
const Form = ({ handleClose }) => {
const navigate=useNavigate();
  const classes = useStyles();
  const [viewMode,setViewMode]=React.useState("member");
  // create state variables for each input
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = e => {
    e.preventDefault();
    console.log(firstName, lastName, email, password);
    var member={
      "firstName":firstName,
      "lastName":lastName,
      "Email":email,
      "password":password
    }
    alert(member)
    addMember(member).then((resolve)=>{console.log("ok")},(reject)=>{console.log("error")})
    handleClose();
   navigate('/')
  };
  
const selectForm=(ev)=>{
var currentValue=ev.currentTarget.value;
if(currentValue==="admin") setViewMode("admin");
if(currentValue==="members") setViewMode("member");
}
  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        variant="filled"
        required
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        variant="filled"
        required
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
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
          Signup
        </Button>
      </div>
    </form>
    
  );
   

};

export default Form;