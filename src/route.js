import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
  } from 'react-router-dom';

import Header from "./components/header";   
import Footer from "./components/footer";

import Bracelets from "./components/bracelets";
import Earrings from "./components/earrings";
import Necklace from "./components/necklaces";
import Rings from "./components/rings";

class Routes extends Component {
  render() {
    return (
        <div>
            <Header/>
              <Route path="/bracelets" component={Bracelets} /> 
              <Route path="/earrings" component={Earrings} /> 
              <Route path="/necklaces" component={Necklace}/>
              <Route path="/rings" component={Rings}/>
            <Footer/>
        </div>
    );
  }
}

export default Routes;