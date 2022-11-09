import React, { Component } from 'react'
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import "./Header.css"
export default class Header extends Component {
  render() {
    return (
      <>
        {[false].map((expand) => (
          <Navbar key={expand} expand={false} className="mb-3">
            <Container fluid>
              <Navbar.Brand>
                <img
                  src= '/vibe_light.png'
                  width="400"
                  // height="30"
                  // className="d-inline-block align-top"
                  alt="Vibesville logo"
                />
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Offcanvas placement="start">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Navigation</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <NavItem>
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/Dashboard" className="nav-link">
                      Dashboard
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/about" className="nav-link">
                      About
                    </Link>
                  </NavItem>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </>
    );
  }
}
