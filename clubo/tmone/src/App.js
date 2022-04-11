import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from './pages/home';
import About from './pages/about';
import Login from './pages/login';
import Contact from './pages/contact';
const App = () => {
  
  return (
    <div>
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/"  element={<Home/>} />
        <Route  path="/about"  element={<About/>} />
        <Route  path="/login"  element={<Login/>} />
        <Route exact path="/contact"  element={<Contact/>} />
      </Routes>
    </Router>
     </div>
     
  );
};

export default App;