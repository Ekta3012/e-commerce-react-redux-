import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route
  } from 'react-router-dom';
import { Provider } from "react-redux";

import '../styles/App.css';
import Routes from "../route";
import configureStore from "../store";

const store=configureStore(); 

class App extends Component {
    render() {
        return (
            <div className="App">
                <Provider store={store}>
                    <Router>
                        <Route path="/" component={Routes} /> 
                    </Router>
                </Provider>
            </div>
        );
    }
}

export default App;