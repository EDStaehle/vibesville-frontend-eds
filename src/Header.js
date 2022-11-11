import React from 'react'
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';

import "./Header.css"
 class Header extends React.Component {
  
  
  render() {
    const menu = document.getElementById('menu')
    Array.from(document.getElementsByClassName('menuItem'))
    .forEach((item, index) => {
      item.onmouseover = () => {
        menu.dataset.activeIndex = index
      }
      console.log(menu)
    });
   
    return (
      <>
        {[false].map((expand) => (
          <Navbar key={expand} expand={false} >
            <Container fluid>
              <Navbar.Brand>
                <img
                  src='/vibe_light.png'
                  width="400"
                  // height="30"
                  // className="d-inline-block align-top"
                  alt="Vibesville logo"
                />
              </Navbar.Brand>
              <Navbar.Toggle />

              <Navbar.Offcanvas className='navOffCanvas' placement="start">
                  <div id='menu' ref={this.menu}>
                    <div id='menuItems' ref={this.menuItems}>
                <Offcanvas.Header className='navOffCanvasHeader' closeButton>

                    <Offcanvas.Title className='menuItem' ref={this.menuItem}>Navigation</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='navOffCanvasBody'>
                  
                      <NavItem>
                        <Link to="/" className='menuItem' ref={this.menuItem}>
                          Home
                        </Link>
                      </NavItem>
                      <NavItem>
                        <Link to="/Dashboard" className='menuItem' ref={this.menuItem}>
                          Dashboard
                        </Link>
                      </NavItem>
                      <NavItem>
                        <Link to="/about" className='menuItem' ref={this.menuItem}>
                          About
                        </Link>
                      </NavItem>
                  
                </Offcanvas.Body>
                    </div>
              </div>
              <div className='menu-background-pattern'></div>
              <div id='menu-background-image'></div>
            </Navbar.Offcanvas>
          </Container>
          </Navbar>
    ))
  }
      </>
    );
  }
}
export default Header;