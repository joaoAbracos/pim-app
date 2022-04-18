import React from 'react';
import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from 'react-bootstrap'
function NavBar() {
    return (
        <Navbar bg="white" expand="lg">
            <Container >
                <Navbar.Brand >PIM App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto justify-content-center">
                        <Link to="/products" className="nav-link">Recipes</Link>
                        <Link to="/createproduct" className="nav-link">Create Recipe</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};
export default NavBar;
