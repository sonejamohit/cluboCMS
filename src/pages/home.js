import React from 'react';
import styles from './my-style.module.css';
const Styles = {
  // opacity: "0.3",
  color: "green",
  backgroundImage: `url('https://i.postimg.cc/kMxrJHq4/banner.png')`,
  height: "600px",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}

function Home() {
  return (
    <div style={Styles} >
    </div>
  );
};

export default Home;