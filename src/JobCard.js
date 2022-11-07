import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import './JobCard.css'

export default class JobCard extends Component {
  

  openModal = () => {
    this.props.modalOpen(this.props.job)
  }

  render() {
    return (
    <Card>
      <Card.Body>
        <Card.Title>
          <div>
            <h2>{this.props.job.company}</h2>
            <h5>{this.props.job.title}</h5>
          </div>
          <div>
            <h2>{this.props.job.city},{this.props.job.state}</h2>
          </div>
        </Card.Title>
        <Card.Text>
          <div id='cardContContainer'>
            <div id='jobDescription'>
              <h4>Description</h4>
              <p>{this.props.job.description}</p>
              <button onClick={this.openModal}>View More</button>
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
        </Card.Text>
      </Card.Body>
    </Card>
    )
  }
}
