import React from "react";
import { Card } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from "react-router-dom";
import Manual from './Manual';
import Arena from './Arena';
import { ButtonGroup } from 'react-bootstrap';

const Footer = () => {
    const [manualModalShow, setManualModalShow] = React.useState(false);

    return (
        <React.Fragment>
            <Navbar expand="lg" className="bg-dark" fixed='bottom' variant="dark">
            <Container fluid>
                <Navbar.Brand href="#home">Developed by Team 22</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Help</Nav.Link>
                    <Nav.Link href="#link">Language</Nav.Link>
                    {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        Separated link
                    </NavDropdown.Item>
                    </NavDropdown> */}
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </React.Fragment>
    )
}

export default Footer;