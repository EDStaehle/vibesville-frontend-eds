import React, { Component, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Sidebar.css'

export default class Sidebar extends Component {
  render() {
    let data = this.props.data.map((d) => (
      <Card key={d.title}>
      <Card.Body className='cardBody'>
        <Card.Title>
          <div className='cardTitle'>
            <h2>{d.title}
            <div className='cardCity'>
              <h6>{d.city}</h6>
            </div>
            </h2>
            <h2>{d.company}</h2>
          </div>
          
          </Card.Title>
     <Card.Text>
      <div className='cardContainer'>
        <div className='cardScore'>
          <p>VibesVille Score = this.state.score</p>
        </div>
        <div className='cardStars'>
          <p>THIS MANY STARS</p>
        </div>
      </div>
     </Card.Text>
      </Card.Body>
     </Card>
    ))
    return (
      <>
      <Button variant="primary" onClick={this.props.showCanvas}>
        Launch
      </Button>

      <Offcanvas className='canvas' show={this.props.show} onHide={this.props.hideCanvas} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Saved Jobs</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {data}
        </Offcanvas.Body>
      </Offcanvas>
    </>
    )
  }
}
