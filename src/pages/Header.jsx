import React from "react";
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

const Header = () => {
    const [manualModalShow, setManualModalShow] = React.useState(false);

    return (
        <React.Fragment>
            <>
                {[false].map((expand) => (
                    <Navbar key={expand} expand={expand} className="bg-dark mb-3" sticky="top" variant='dark'>

                    <Container fluid>
                        <Navbar.Brand href="#">9 Men's Morris</Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas style={{background: 'bisque'}}
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                        >
                        <Offcanvas.Header closeButton style={{background: 'rgb(162, 99, 23)'}}>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                            <b>Guest</b>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Button variant="primary" onClick={() => setManualModalShow(true)} style={{background: 'rgb(195, 151, 75)'}}>
                                    <b>Manual</b>
                                </Button>
                                <br />
                                {/* <Nav.Link href="manual" onClick={() => setModalShow(true)}>Manual</Nav.Link> */}
                                <Manual
                                    show={manualModalShow}
                                    onHide={() => setManualModalShow(false)}
                                />

                                
                                <Button variant="primary" href="arena" style={{background: 'rgb(195, 151, 75)'}}>
                                    <b>Play</b>
                                </Button>
                            {/* <Nav.Link href="arena">Play</Nav.Link> */}
                            </Nav>
                        </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                    {/* <Outlet /> */}

                    </Navbar>
                ))}
            </>
        </React.Fragment>
    )
}

export default Header;