import React from "react";
import {
  Modal,
  Button,
  Row,
  Container,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Rating } from "react-simple-star-rating";
import Login from "./components/Login";
import './JobModal.css';

class JobModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
    };
  }

  handleRating = (rate) => {
    this.setState({ rating: rate });
  };

  handleJobSumbit = () => {
    let score = this.props.job.CityData
      ? [
          Math.round(this.props.job.CityData.categories[0].score_out_of_10),
          Math.round(this.props.job.CityData.categories[16].score_out_of_10),
          Math.round(this.props.job.CityData.categories[1].score_out_of_10),
          Math.round(this.props.job.CityData.categories[8].score_out_of_10),
          Math.round(this.props.job.CityData.categories[14].score_out_of_10),
        ]
      : 0;
    let avgScore =
      score !== 0 ? score.reduce((a, b) => a + b, 0) / score.length : 0;
    let favoriteJob = {
      title: this.props.job.title ? this.props.job.title : "none",
      description: this.props.job.description
        ? this.props.job.description
        : "none",
      company: this.props.job.company ? this.props.job.company : "none",
      redirect_url: this.props.job.redirect_url
        ? this.props.job.redirect_url
        : "none",
      city: this.props.job.city ? this.props.job.city : "none",
      city_score: avgScore,
      state: this.props.job.state ? this.props.job.state : "none",
      latitude: this.props.job.latitude ? this.props.job.latitude : 0,
      longitude: this.props.job.longitude ? this.props.job.longitude : 0,
      user_id: this.props.auth0.user.email,
      user_score: this.state.rating,
      housing_score: this.props.job.CityData
        ? Math.round(this.props.job.CityData.categories[0].score_out_of_10)
        : 0,
      COL_score: this.props.job.CityData
        ? Math.round(this.props.job.CityData.categories[1].score_out_of_10)
        : 0,
      health_score: this.props.job.CityData
        ? Math.round(this.props.job.CityData.categories[8].score_out_of_10)
        : 0,
      nature_score: this.props.job.CityData
        ? Math.round(this.props.job.CityData.categories[16].score_out_of_10)
        : 0,
      culture_score: this.props.job.CityData
        ? Math.round(this.props.job.CityData.categories[14].score_out_of_10)
        : 0,
    };
    this.postFavJob(favoriteJob);
    this.props.onHide();
    this.props.setSaved(favoriteJob);
  };

  postFavJob = async (favoriteJobObj) => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER}/saved`, favoriteJobObj);
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    let score = this.props.job.CityData
      ? [
          Math.round(this.props.job.CityData.categories[0].score_out_of_10),
          Math.round(this.props.job.CityData.categories[16].score_out_of_10),
          Math.round(this.props.job.CityData.categories[1].score_out_of_10),
          Math.round(this.props.job.CityData.categories[8].score_out_of_10),
          Math.round(this.props.job.CityData.categories[14].score_out_of_10),
        ]
      : null;
    let avgScore = score
      ? score.reduce((a, b) => a + b, 0) / score.length
      : "No Data Found";
    return (
      <Modal
        size="lg"
        centered
        show={this.props.show}
        onHide={this.props.onHide}
        className="job-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>{this.props.job.title}</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Container fluid>
              <Row>
                <h2>{this.props.job.company}</h2>
              </Row>

              {/* description text */}
              <Row>
                <p id="description-text">{this.props.job.description}</p>
              </Row>
              <Button href={this.props.job.redirect_url}>
                See Full Listing
              </Button>
            </Container>

            <Container className="modal-city-container" fluid>
              <Row>
                <h2>
                  {this.props.job.city},{this.props.job.state}
                </h2>
              </Row>

              <Row>
                {avgScore === "No Data Found" ? (
                  <h4>No Data Found</h4>
                ) : (
                  <h4>City Vibe Score = {avgScore} / 10</h4>
                )}
              </Row>
              <Row>
                <div id="cityVibeContainer">
                  <div id="cityVibeContainer">
                    {this.props.job.CityData ? (
                      <ListGroup>
                        <ListGroupItem
                          className={this.scoreColor(
                            this.props.job.CityData.categories[0]
                              .score_out_of_10
                          )}
                        >
                          Housing Rating ={" "}
                          {Math.round(
                            this.props.job.CityData.categories[0]
                              .score_out_of_10
                          )}
                        </ListGroupItem>
                        <ListGroupItem
                          className={this.scoreColor(
                            this.props.job.CityData.categories[1]
                              .score_out_of_10
                          )}
                        >
                          Cost of Living Rating ={" "}
                          {Math.round(
                            this.props.job.CityData.categories[1]
                              .score_out_of_10
                          )}
                        </ListGroupItem>
                        <ListGroupItem
                          className={this.scoreColor(
                            this.props.job.CityData.categories[8]
                              .score_out_of_10
                          )}
                        >
                          Health Care Rating ={" "}
                          {Math.round(
                            this.props.job.CityData.categories[8]
                              .score_out_of_10
                          )}
                        </ListGroupItem>
                        <ListGroupItem
                          className={this.scoreColor(
                            this.props.job.CityData.categories[16]
                              .score_out_of_10
                          )}
                        >
                          Nature Vibes ={" "}
                          {Math.round(
                            this.props.job.CityData.categories[16]
                              .score_out_of_10
                          )}
                        </ListGroupItem>
                        <ListGroupItem
                          className={this.scoreColor(
                            this.props.job.CityData.categories[14]
                              .score_out_of_10
                          )}
                        >
                          Leisure and Culture ={" "}
                          {Math.round(
                            this.props.job.CityData.categories[14]
                              .score_out_of_10
                          )}
                        </ListGroupItem>
                      </ListGroup>
                    ) : null}
                  </div>
                  {this.props.auth0.isAuthenticated ? (
                    <div id="rating-div">
                      <Rating
                        className="starRating"
                        onClick={this.handleRating}
                        size={50}
                        transition={true}
                        allowFraction={true}
                      />
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={this.handleJobSumbit}
                      >
                        Add To Favorites!
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <p>Login to Save to Favorites!</p>
                      <Login />
                    </div>
                  )}
                </div>
              </Row>
            </Container>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}

export default withAuth0(JobModal);
