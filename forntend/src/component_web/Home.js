
import React from "react";
import About from "./About";
import Clint from "./Clint";
import Contact from "./Contact";
import Contant from "./Contant";
import Footer from "./Footer";
import Information from "./Information";
import Price from "./Price";
import Serves from "./Serves";

function Home() {
  return (
    <div>
       <Contant />
      <Serves />
       <About />
      <Price />

       <Clint />

       <Contact />
       
      <Information />
      <Footer />
    </div>
  );
}

export default Home;