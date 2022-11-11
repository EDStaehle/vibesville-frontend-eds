import React from "react";
import {
  Modal,
  Button,
  Row,
  Container,
  ListGroup,
  ListGroupItem,
  Accordion
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
  };
  


  postFavJob = async (favoriteJobObj) => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER}/saved`, favoriteJobObj);
      let savedData = await axios.get(`${process.env.REACT_APP_SERVER}/saved/${this.props.auth0.user.email}`)
      this.props.setSaved(savedData.data)
    } catch (error) {
      console.log(error.message);
    }
  };
  scoreColor = (score) => {
    if (score < 3) {
      return "red";
    } else if (score < 6) {
      console.log("did something with score");
      return "yellow";
    } else return "green";
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
                      <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header
                            id="first"
                            className={this.scoreColor(
                              this.props.job.CityData.categories[0]
                                .score_out_of_10
                            )}
                          >
                            Housing Cost Rating ={" "}
                            {Math.round(
                              this.props.job.CityData.categories[0]
                                .score_out_of_10
                            )}
                          </Accordion.Header>
                          <Accordion.Body>
                            <ListGroup>
                            <ListGroupItem><strong>Based on the following factors:</strong></ListGroupItem>
                            
                              <ListGroupItem>Average rent of a large apartment</ListGroupItem>
                              <ListGroupItem>Average rent of a medium apartment</ListGroupItem>
                              <ListGroupItem>Average rent of a small apartment</ListGroupItem>
                           </ListGroup>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                          <Accordion.Header
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
                          </Accordion.Header>
                          <Accordion.Body>
                            <ListGroup>
                            <ListGroupItem>
                              <strong>Based on the price index for a basket of goods and
                              services such as:</strong>
                            </ListGroupItem>
                            
                              <ListGroupItem>Ridesharing costs</ListGroupItem>
                              <ListGroupItem>Basic food costs</ListGroupItem>
                              <ListGroupItem>
                                Price of entertainment and leisure activities
                              </ListGroupItem>
                              <ListGroupItem>Also includeds an inflation score</ListGroupItem>
                           </ListGroup>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                          <Accordion.Header
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
                          </Accordion.Header>
                          <Accordion.Body>
                            <ListGroup>
                            <ListGroupItem><strong>Based on the following factors:</strong></ListGroupItem>
                            
                              <ListGroupItem>Government healthcare expenditure</ListGroupItem>
                              <ListGroupItem>Healthcare quality score</ListGroupItem>
                              <ListGroupItem>Life expectancy in the area</ListGroupItem>
                           </ListGroup>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                          <Accordion.Header
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
                          </Accordion.Header>
                          <Accordion.Body>
                            <ListGroup>
                            <ListGroupItem><strong>Based on the following factors:</strong></ListGroupItem>
                            
                              <ListGroupItem>Presence of hills</ListGroupItem>
                              <ListGroupItem>Elevation (access to mountains)</ListGroupItem>
                              <ListGroupItem>Access to water bodies</ListGroupItem>
                           </ListGroup>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                          <Accordion.Header
                            as="div"
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
                          </Accordion.Header>
                          <Accordion.Body>
                            <ListGroup>
                            <ListGroupItem><strong>Based on the following factors:</strong></ListGroupItem>
                
                              <ListGroupItem>
                                Number of cultural buildings such as art
                                galleries and theaters
                              </ListGroupItem>
                              <ListGroupItem>Number of sporting venues</ListGroupItem>
                              <ListGroupItem>Number of museums and zoos</ListGroupItem>
                          </ListGroup>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
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
