import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Dashboard.css'
import { useAuth0, withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';

class Dashboard extends React.Component {

  async componentDidMount() {
    this.props.button();
    if (this.props.auth0.isAuthenticated) {

      let savedData = await axios.get(`https://vibesville.herokuapp.com/saved/${this.props.auth0.user.email}`);
      console.log(this.props.savedData)
      this.props.setSaved(savedData.data)

    } 
  }

  render() {
    let data = this.props.saved.map((d) => (
      <Card key={d._id} className='dashboardCard'>
        <Card.Body className='dashCardBody'>
          <Card.Title>
            <div className='dashCardTitle'>
              <h2>{d.title}
                <div className='cardCity'>
                  <h6>{d.city}, {d.state}</h6>
                </div>
                <div>

                </div>
              </h2>
              <h2>{d.company}</h2>
            </div>

          </Card.Title>
          <Card.Text>
            <div className='dashCardContainer'>
              <div>
                <p>{d.description}</p>
              </div>
              <div className='dashCardScore'>
                <p>VibesVille Score = this.state.score</p>
              </div>
              <div className='dashCardStars'>
                <p>THIS MANY STARS</p>
              </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    ))


    return (
      <>
        {
            this.props.auth0.isAuthenticated? <div> {data} </div>: <p>please login</p>
        }

      </>
    )
  }
}
export default withAuth0(Dashboard);