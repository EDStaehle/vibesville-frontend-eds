import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { withAuth0 } from '@auth0/auth0-react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';


class JobModal extends React.Component {

  handleJobSumbit = (event) => {
    event.preventDefault();
    let favoriteJob = {
      title: this.props.job.title,
      description: this.props.job.description,
      company: this.props.job.company,
      redirect_url: this.props.job.redirect_url,
      city: this.props.job.city,
      city_score: 5,
      state: this.props.job.state,
      latitude: this.props.job.latitude,
      longitude: this.props.job.longitude,
      user_id: this.props.auth0.user.email,
      user_score: event.target.value
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
              <h4>City Vibe Score = this.city.vibescore</h4>
              <ul>
                <li>Metric 1</li>
                <li>Metric 2</li>
                <li>Metric 3</li>
                <li>Metric 4</li>
              </ul>
              
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

export default withAuth0(JobModal);