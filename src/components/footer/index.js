import React, { Component } from "react";
import * as ReactBootstrap from 'react-bootstrap';
import { Navbar,Nav,NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";


class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <ul className="footer-list">
                    <li>
                        <Link to={'/bracelets'}>Bracelets</Link>
                    </li>
                    <li>
                        <Link to={'/earrings'}>Earrings</Link>
                    </li>
                    <li>
                        <Link to={'/rings'}>Rings</Link>
                    </li>
                    <li>
                        <Link to={'/necklaces'}>Necklaces</Link>
                    </li>
                    <li>
                        Login/Signup
                    </li>
                </ul>
            </div>
        );
    }
}

export default Footer;




