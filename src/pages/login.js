import React  from "react";
import ModalDialog from './ModalDialog';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
const Login=()=>{
const navigate=useNavigate();
    const [open, setOpen] = React.useState(true);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
   
    setOpen(false);
    navigate('/')
  };
    return(
    <div>
    <h1>LOgin </h1>
    
<ModalDialog open={open} handleClose={handleClose} acessId>
</ModalDialog>
</div>
)
}
export default Login;