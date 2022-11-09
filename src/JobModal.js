import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Rating } from 'react-simple-star-rating'
import Login from './components/Login'

class JobModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0
    }
  }

  handleRating = (rate) => {
    this.setState({rating: rate})}


  handleJobSumbit = () => {
    let favoriteJob = {
      title: this.props.job.title,
      description: this.props.job.description,
      company: this.props.job.company,
      redirect_url: this.props.job.redirect_url,
      city: this.props.job.city,
      city_score: this.props.job.CityData ? [Math.round(this.props.job.CityData.categories[0].score_out_of_10),Math.round(this.props.job.CityData.categories[16].score_out_of_10),
      Math.round(this.props.job.CityData.categories[1].score_out_of_10), Math.round(this.props.job.CityData.categories[8].score_out_of_10), Math.round(this.props.job.CityData.categories[14].score_out_of_10)]
      : null,
      state: this.props.job.state,
      latitude: this.props.job.latitude,
      longitude: this.props.job.longitude,
      user_id: this.props.auth0.user.email,
      user_score: this.state.rating,
      housing_score: this.props.job.CityData ? Math.round(this.props.job.CityData.categories[0].score_out_of_10) : null,
      COL_score: this.props.job.CityData ? Math.round(this.props.job.CityData.categories[1].score_out_of_10) : null,
      health_score: this.props.job.CityData ? Math.round(this.props.job.CityData.categories[8].score_out_of_10) : null,
      nature_score: this.props.job.CityData ? Math.round(this.props.job.CityData.categories[16].score_out_of_10) : null,
      culture_score: this.props.job.CityData ? Math.round(this.props.job.CityData.categories[14].score_out_of_10) : null
        }
    this.postFavJob(favoriteJob)
    this.props.onHide();
    this.props.setSaved(favoriteJob);
  }

  postFavJob = async (favoriteJobObj) => {
    try {
      await axios.post(`https://vibesville.herokuapp.com/saved` , favoriteJobObj)
    } catch (error) {
      console.log(error.message)
    }
  }


  render() {
    let score = this.props.job.CityData ? [Math.round(this.props.job.CityData.categories[0].score_out_of_10),Math.round(this.props.job.CityData.categories[16].score_out_of_10),
    Math.round(this.props.job.CityData.categories[1].score_out_of_10), Math.round(this.props.job.CityData.categories[8].score_out_of_10), Math.round(this.props.job.CityData.categories[14].score_out_of_10)]
    : null
    let avgScore = score ? score.reduce((a,b) => a + b , 0) / score.length : 'No Data Found'
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} >
        <Modal.Header closeButton>
          <Modal.Title>
            <div>
              <h2>{this.props.job.company}</h2>
              <h5>{this.props.job.title}</h5>
            </div>
            <div>
              <h2>{this.props.job.city},{this.props.job.state}</h2>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id='cardContContainer'>
            <div id='jobDescription'>
              <h4>Description</h4>
              <p>{this.props.job.description}</p>

            </div>
            <div id='cityVibeContainer'>
            <h4>City Vibe Score = {avgScore}</h4>
                {this.props.job.CityData ?
                <ul>
                  <li>Housing Rating = {Math.round(this.props.job.CityData.categories[0].score_out_of_10)}</li>
                  <li>Cost of Living Rating = {Math.round(this.props.job.CityData.categories[1].score_out_of_10)}</li>
                  <li>Health Care Rating = { Math.round(this.props.job.CityData.categories[8].score_out_of_10)}</li>
                  <li>Nature Vibes = {Math.round(this.props.job.CityData.categories[16].score_out_of_10)}</li>
                  <li>Leisure and Culture = {Math.round(this.props.job.CityData.categories[14].score_out_of_10)}</li>
                </ul>
                  :<p>No Data Found</p>}
                {/* <div className='summary'>
                  {this.props.job.CityData ? this.props.job.CityData.summary : <p>No Data Found</p>}
                </div> */}
              {
                this.props.auth0.isAuthenticated ? 
              <div>
                <Rating
                className='starRating'
                onClick={this.handleRating}
                size={70}
                transition={true}
                allowFraction={true}/>
                  <Button variant="primary" type="submit" onClick={this.handleJobSumbit}>
                  Add To Favorites!
                </Button>
              </div>:
              <div>
                <p>Login to Save to Favorites!</p>
                <Login/>
              </div>
              }
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

export default withAuth0(JobModal);