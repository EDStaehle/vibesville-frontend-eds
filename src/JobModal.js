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
    let score = this.props.job.CityData ? [Math.round(this.props.job.CityData.categories[0].score_out_of_10),Math.round(this.props.job.CityData.categories[16].score_out_of_10),
    Math.round(this.props.job.CityData.categories[1].score_out_of_10), Math.round(this.props.job.CityData.categories[8].score_out_of_10), Math.round(this.props.job.CityData.categories[14].score_out_of_10)]
    : 0
    let avgScore = score !== 0 ? score.reduce((a,b) => a + b , 0) / score.length : 0
    let favoriteJob = {
      title: this.props.job.title ? this.props.job.title : 'none',
      description: this.props.job.description ? this.props.job.description : 'none',
      company: this.props.job.company ? this.props.job.company : 'none',
      redirect_url: this.props.job.redirect_url ? this.props.job.redirect_url : 'none',
      city: this.props.job.city ? this.props.job.city : 'none',
      city_score: avgScore,
      state: this.props.job.state ? this.props.job.state : 'none',
      latitude: this.props.job.latitude ? this.props.job.latitude : 0,
      longitude: this.props.job.longitude ? this.props.job.longitude : 0,
      user_id: this.props.auth0.user.email,
      user_score: this.state.rating,
      housing_score: this.props.job.CityData ? Math.round(this.props.job.CityData.categories[0].score_out_of_10) : 0,
      COL_score: this.props.job.CityData ? Math.round(this.props.job.CityData.categories[1].score_out_of_10) : 0,
      health_score: this.props.job.CityData ? Math.round(this.props.job.CityData.categories[8].score_out_of_10) : 0,
      nature_score: this.props.job.CityData ? Math.round(this.props.job.CityData.categories[16].score_out_of_10) : 0,
      culture_score: this.props.job.CityData ? Math.round(this.props.job.CityData.categories[14].score_out_of_10) : 0
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
            <div id='cityVibeContainer'>
              {avgScore === 'No Data Found' ? <h4>No Data Found</h4> : <h4>City Vibe Score = {avgScore} / 10</h4> }
                {this.props.job.CityData ?
                <ul>
                  <li>Housing Rating = {Math.round(this.props.job.CityData.categories[0].score_out_of_10)}</li>
                  <li>Cost of Living Rating = {Math.round(this.props.job.CityData.categories[1].score_out_of_10)}</li>
                  <li>Health Care Rating = { Math.round(this.props.job.CityData.categories[8].score_out_of_10)}</li>
                  <li>Nature Vibes = {Math.round(this.props.job.CityData.categories[16].score_out_of_10)}</li>
                  <li>Leisure and Culture = {Math.round(this.props.job.CityData.categories[14].score_out_of_10)}</li>
                </ul>
                  :null
              }
            </div>
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