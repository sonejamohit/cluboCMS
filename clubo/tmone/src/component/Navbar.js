import React from "react";
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
    color:"#e62c2c",
  },
  link: {
    textDecoration: "none",
    color: "White",
    fontSize: "20px",
    marginLeft: theme.spacing(15),
    "&:hover": {
      color: "#d9a871",
      borderBottom: "1px solid black",
    },
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static" style={{"background-color":"#dbadad"}}>
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Clubo
        </Typography>
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/about" className={classes.link}>
              Events
            </Link>
            <Link to="/contact" className={classes.link}>
              Contact
            </Link>
            <Link to="/login" className={classes.link}>
              Login/SignUp
            </Link>
          </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;