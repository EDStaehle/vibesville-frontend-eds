import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Sidebar.css'
import { useAuth0, withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { Rating } from 'react-simple-star-rating'

class Sidebar extends React.Component {
  async componentDidMount(){
    if(this.props.auth0.isAuthenticated){

        let savedData = await axios.get(`https://vibesville.herokuapp.com/saved/${this.props.auth0.user.email}`);
        console.log(this.props.savedData)
        this.props.setSaved(savedData.data)

    }
  }

  render() {
    let data = this.props.saved.map((d) => (
      <Card key={d.title} className='sidebarCard'>
      <Card.Body className='cardBody'>
        <Card.Title>
          <div className='sidebarCardTitle'>
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
          <Rating
          className='starRating'
          allowFraction={true}
          initialValue={d.user_score}
          readonly={true}
          />
        </div>
      </div>
      </Card.Text>
      </Card.Body>
      </Card>
    ))
    return (
      <>
      {
        this.props.button? null:
      <Button variant="primary" onClick={this.props.showCanvas}>
        Launch
      </Button> 
      }

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