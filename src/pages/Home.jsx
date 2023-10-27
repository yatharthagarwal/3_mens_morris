import React from 'react';
import {Container, Row} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

import { Link, Outlet } from 'react-router-dom';

const Home = () => {
    return (
      <Navbar className="nav bg-body-tertiary">
        <Container fluid>
          <Row className='justify-content-center'>
            <Navbar.Brand className='nav-brand' href="manual">
              <span>
                <img
                  alt=""
                  src='../../assets/manual-icon.png'
                  width="100"
                  height="100"
                  className="d-inline-block align-top"
                />
              </span>{' '}
              Manual
            </Navbar.Brand>
            <Navbar.Brand className='nav-brand' href="board">
              <img
                alt=""
                src='../../assets/play-icon.png'
                width="100"
                height="100"
                className="d-inline-block align-top"
              />{' '}
              Play
            </Navbar.Brand>
          </Row>
        </Container>
        <Outlet />
      </Navbar>
    )
}

export default Home