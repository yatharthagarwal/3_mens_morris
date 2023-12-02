import React from 'react';
// import {Container, Row} from 'react-bootstrap';
// import Navbar from 'react-bootstrap/Navbar';

// const Home = () => {
//     return (
//       <Navbar className="nav bg-body-tertiary">
//         <Container fluid>
//           <Row className='justify-content-center'>
//             <Navbar.Brand className='nav-brand' href="manual">
//               <span>
//                 <img
//                   alt=""
//                   src='../../assets/manual-icon.png'
//                   width="100"
//                   height="100"
//                   className="d-inline-block align-top"
//                 />
//               </span>{' '}
//               Manual
//             </Navbar.Brand>
//             <Navbar.Brand className='nav-brand' href="arena">
//               <img
//                 alt=""
//                 src='../../assets/play-icon.png'
//                 width="100"
//                 height="100"
//                 className="d-inline-block align-top"
//               />{' '}
//               Play
//             </Navbar.Brand>
//           </Row>
//         </Container>
//         <Outlet />
//       </Navbar>
//     )
// }

// export default Home

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

const Home = () => {
  // const [manualModalShow, setManualModalShow] = React.useState(false);
  
  // let navigate = useNavigate(); 

  // function directToArena() {
  //   console.log('called');
  //   navigate('arena');
  // }
  
  // return (
    // <>
    //   {[false].map((expand) => (
    //     <Navbar key={expand} expand={expand} className="bg-dark mb-3" sticky="top" variant='dark'>
    //       <Container fluid>
    //         <Navbar.Brand href="#">9 Men's Morris</Navbar.Brand>
    //         <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
    //         <Navbar.Offcanvas
    //           id={`offcanvasNavbar-expand-${expand}`}
    //           aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
    //           placement="end"
    //         >
    //           <Offcanvas.Header closeButton>
    //             <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
    //               Guest
    //             </Offcanvas.Title>
    //           </Offcanvas.Header>
    //           <Offcanvas.Body>
    //             <Nav className="justify-content-end flex-grow-1 pe-3">
    //                 <Button variant="primary" onClick={() => setManualModalShow(true)}>
    //                     Manual
    //                 </Button>
    //                 <br />
    //                 {/* <Nav.Link href="manual" onClick={() => setModalShow(true)}>Manual</Nav.Link> */}
    //                 <Manual
    //                     show={manualModalShow}
    //                     onHide={() => setManualModalShow(false)}
    //                 />

                    
    //                 <Button variant="primary" onClick={directToArena}>
    //                     Play
    //                 </Button>
    //               {/* <Nav.Link onClick={directToArena}>Play</Nav.Link> */}
    //             </Nav>
    //           </Offcanvas.Body>
    //         </Navbar.Offcanvas>
    //       </Container>
    //       {/* <Outlet /> */}
    //     </Navbar>
    //   ))}
    // </>
  // );
}

export default Home;