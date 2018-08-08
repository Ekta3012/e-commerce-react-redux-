import React, { Component } from "react";
import * as ReactBootstrap from 'react-bootstrap';
import { Navbar,Nav,NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";


class Header extends Component {
    render() {
        return (
            <ReactBootstrap.Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                    <Link to={'/'}>                        
                        <img src=".././public/img/logo.jpg" width="50" height="50"/>
                    </Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <ReactBootstrap.Nav pullRight>
                    <NavItem>
                        <Link to={'/bracelets'}>
                                Bracelets
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to={'/earrings'}>Earrings</Link>
                    </NavItem>
                </ReactBootstrap.Nav>
            </ReactBootstrap.Navbar>
        );
    }
}

export default Header;




