import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import './JobCard.css'

export default class JobCard extends Component {
  

  openModal = () => {
    this.props.modalOpen(this.props.job)
  }

  render() {
    let score = this.props.job.CityData ? [Math.round(this.props.job.CityData.categories[0].score_out_of_10),Math.round(this.props.job.CityData.categories[16].score_out_of_10),
    Math.round(this.props.job.CityData.categories[1].score_out_of_10), Math.round(this.props.job.CityData.categories[8].score_out_of_10), Math.round(this.props.job.CityData.categories[14].score_out_of_10)]
    : null
    let avgScore = score ? score.reduce((a,b) => a + b , 0) / score.length : 'No Data Found'
    return (
    <Card>
      <Card.Body>
        <Card.Title className='jobCardTitle'>
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
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
    )
  }
}
