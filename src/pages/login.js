import React  from "react";
import ModalDialog from './ModalDialog';
import loginImage from './loginImage.jpg'
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
    <div >
   
    <img src={loginImage} />
<ModalDialog open={open} handleClose={handleClose} acessId>
</ModalDialog>
</div>
)
}
export default Login;