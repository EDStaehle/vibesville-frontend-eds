import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Sidebar.css'
import { useAuth0, withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

class Sidebar extends React.Component {
  async componentDidMount(){
    if(this.props.auth0.isAuthenticated){
      const res = await this.props.auth0.getIdTokenClaims();

      const jwt = res.__raw;

      console.log('token:  ', jwt);

      const config = {
        headers: { "Authorization": `Bearer ${jwt}`},
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/books'
      }

      let savedData = await axios(config);

      this.props.setSaved(savedData.data)
    }
  }
  render() {
    let data = this.props.saved.map((d) => (
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
export default withAuth0(Sidebar);