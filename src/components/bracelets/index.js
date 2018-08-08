import React, { Component } from "react";
import * as ReactBootstrap from 'react-bootstrap';

import Card from "../card";
import { getCardData } from "../../api";

class Bracelets extends Component {
    render() {
        return (
            <div className="container">
                <h2 className="heading">Bracelets</h2>
                <div className="content">
                    <Card/>
                </div>                
            </div>
        );
    }
}

export default Bracelets;


