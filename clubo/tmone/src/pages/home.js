import React from 'react';
import image from './del.jpg';
const Styles={
    opacity: "0.3",
}
const Home = () => {
  return (    
     <div>
        <h1>Welcome to our website!</h1>
      <img src={image} height="1500px" width="100%" style={Styles}></img> 
     </div>
  );
};

export default Home;