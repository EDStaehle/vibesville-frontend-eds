import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Rating } from 'react-simple-star-rating'
export default class DashCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newrating: 0,
      buttonisclicked: false,
      cardSaved: this.props.saved,
      rating: 0
    }
  }

  handleRating = (rate) => {
    this.setState({ rating: rate })
  }

  handleUpdate = (event) => {
    event.preventDefault();
    let itemToUpdate = this.props.d;
    itemToUpdate.user_score = this.state.rating;
    this.props.updateCard(itemToUpdate);
  }
  handleClick = () => {
    this.setState({ buttonisclicked: true })
  }
  render() {
    return (
      <Card className='dashboardCard'>
        <Card.Body className='dashCardBody'>
          <Card.Title>
            <div className='dashCardTitle'>
              <h2>{this.props.d.title}
                <div className='dashCardDelete'><Button onClick={() => { this.props.deleteSaved(this.props.d._id) }} id='deleteJob' variant="danger">X</Button></div>
                <div className='cardCity'>
                  <h6>{this.props.d.city}, {this.props.d.state}</h6>
                </div>
                <div>
                  
                </div>
              </h2>
              <h2>{this.props.d.company}</h2>
            </div>
          </Card.Title>
          <Card.Text>
            <div className='dashCardContainer'>
              <div>
                <p>{this.props.d.description}</p>
              </div>
              <div className='dashCardScore'>
                <p>VibesVille Score = this.state.score</p>
              </div>
              <div className='cardStars'>
                {
                  !this.state.buttonisclicked ?
                    <div >
                      <Rating
                        className='starRating'
                        size={70}
                        allowFraction={true}
                        initialValue={this.props.d.user_score}
                        readonly={true} />
                      <Button onClick={this.handleClick}>Update</Button>
                    </div>
                    :
                    <div>
                      <Rating
                        className='starRating'
                        onClick={this.handleRating}
                        size={70}
                        transition={true}
                        allowFraction={true} />
                      <Button variant="primary" type="submit" onClick={this.handleUpdate}>
                        {
                          this.props.updateCompleted ? 'update' : 'Add to favorites'
                        }
                      </Button>
                    </div>
                }
              </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}
