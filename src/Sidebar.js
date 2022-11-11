import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Sidebar.css'
import { withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { Rating } from 'react-simple-star-rating'

class Sidebar extends React.Component {
  async componentDidMount(){
    if(this.props.auth0.isAuthenticated){

        let savedData = await axios.get(
          `${process.env.REACT_APP_SERVER}/saved/${this.props.auth0.user.email}`
        );
        console.log(this.props.savedData)
        this.props.setSaved(savedData.data)

    }
  }





  render() {
    let sorted = this.props.saved.sort((a,b) => b.user_score - a.user_score)
    let data = sorted.map((d,idx) => (
      <Card key={idx} className='sidebarCard'>
        <Card.Body className='cardBody'>
          <Card.Title className='sidebarTitle'>
            <div className='sidebarCardTitle'>
              <div className='sidebarTopLeft'>
                <h2>{d.title}</h2>
                <h4>{d.company}</h4>
              </div>
                <div className='cardCity'>
                  <h6>{d.city},{d.state}</h6>
                </div>
            </div>
          </Card.Title>
          <Card.Text>
            <div className='sidecardContainer'>
              <div className='cardScore'>
                <p>VibesVille Score = {d.city_score}</p>
              </div>
              <div className='cardStars'>
                <p>Your Score</p>
                <Rating
                  className='starRating sideStar'
                  allowFraction={true}
                  initialValue={d.user_score}
                  readonly={true}
                  size={30}
                />
                <div id='buttonSideDiv'><Button onClick={() => { this.props.deleteJob(d._id) }} id='deleteJob' variant="danger">🗑️</Button></div>
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
      <Button id = 'sidebar-btn' variant="primary" onClick={this.props.showCanvas}>
        Saved Jobs
      </Button> 
      }
      <Offcanvas className='sideBarCanvas' show={this.props.show} onHide={this.props.hideCanvas} placement='end'>
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