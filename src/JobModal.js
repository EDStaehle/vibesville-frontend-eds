import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { withAuth0 } from '@auth0/auth0-react';

class JobModal extends React.Component {
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