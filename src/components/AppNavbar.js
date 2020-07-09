import React, { Component } from 'react';
import '../App.css'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    
    Nav,
    NavItem,
    NavLink,
    Button,
    NavbarText,
    NavbarBrand
} from 'reactstrap';

class AppNavBar extends Component {
    state = {
        isOpen: false
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    loginStyle = {
        margin: "10px",
        backgroundColor: "transparent",
        border: "none",
        color: "#000",
        fontWeight: "bold"
    }
    signupStyle = {
        margin: "10px",
        backgroundColor: "transparent",
        border: "1px solid #F65858",
        color: "#F65858"

    }
    render() {
        const { token } = this.props;
        return (
            <Navbar dark expand="md">
                <NavbarBrand href="/" className="nav-link logo">EVENTO</NavbarBrand>
                <NavbarToggler onClick={this.toggle.bind(this)} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/">All Events</NavLink>
                        </NavItem>
                    </Nav>
                    {token === null ?
                        (
                            <>
                                <NavbarText>
                                    <Button href="/login" style={this.loginStyle}>Login</Button>
                                </NavbarText>
                                <NavbarText>
                                    <Button href="/signup" style={this.signupStyle}>Register</Button>
                                </NavbarText>
                            </>
                        ) :
                        (
                            <NavbarText>
                                <Button style={this.signupStyle} onClick={this.props.handleLogout.bind(this)} href="/">Logout</Button>
                            </NavbarText>
                        )
                    }


                </Collapse>
            </Navbar>
        )
    }
}
export default AppNavBar;