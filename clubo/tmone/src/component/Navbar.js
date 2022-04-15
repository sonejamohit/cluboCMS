import React from "react";
// import style from './nav.css';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
 logo: {
    flexGrow: "1",
    cursor: "pointer",
    color:"#e6cccc",
  },
  toolbar: {
    margin: "10px",
    padding: "8px",
  },
  link: {
    textDecoration: "none",
    display: "flex",
    color: "White",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    paddingLeft: "8px",
    paddingRight: "8px",
    marginLeft: theme.spacing(8),
    "&:hover": {
      color: "#7b92cd",
      background: "#fff",
      // margin: "13px",
      // border: "1px solid white",
      // paddingright: "3px",
      transition: "300ms",
      // Radius:"5px",
    },
  },
  login: {
    textDecoration: "none",
    display: "flex",
    color: "White",
    background: "#7b92cd",
    borderRadius: "14px", 
    fontSize: "14px",
    padding: "8px",
    marginLeft: theme.spacing(8),
    "&:hover": {
      color: "#000"
    }
  }
}));

function Navbar() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggling = () => setIsOpen(!isOpen);
  return (
    <AppBar position="static" style={{"background-color":"#3a3f6d"}}>
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Clubo
        </Typography>
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/event" className={classes.link}>
            Events
            </Link>
            <Link to="/contact" className={classes.link}>
              Members
            </Link>
            <Link to="/login" className={classes.login} >
              Login/SignUp
            </Link>
          </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;