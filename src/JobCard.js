import React, { Component } from "react";
import { Card, Row, Col, ListGroup, Button } from "react-bootstrap";
import "./JobCard.css";

export default class JobCard extends Component {
  openModal = () => {
    this.props.modalOpen(this.props.job);
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
      <Card>
        <Card.Header>
          <h2>{this.props.job.title}</h2>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col className="col1">
              <h2>{this.props.job.company}</h2>
            </Col>
            <Col className="col2">
              <h2>
                {this.props.job.city},{this.props.job.state}
              </h2>
            </Col>
          </Row>
          <Row>
            <Col className="col1">
              <h4>Description</h4>
            </Col>
            <Col className="col2">
              <h4>City Vibe Score = {avgScore} / 10</h4>
            </Col>
          </Row>
          <Row>
            <Col className="col1">
              <p>{this.props.job.description}</p>
              <Button onClick={this.openModal}>View More</Button>
            </Col>
            <Col className="col2">
              <div id="cityVibeContainer">
                {this.props.job.CityData ? (
                  <ListGroup>
                    <ListGroup.Item>
                      Housing Rating ={" "}
                      {Math.round(
                        this.props.job.CityData.categories[0].score_out_of_10
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Cost of Living Rating ={" "}
                      {Math.round(
                        this.props.job.CityData.categories[1].score_out_of_10
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Health Care Rating ={" "}
                      {Math.round(
                        this.props.job.CityData.categories[8].score_out_of_10
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Nature Vibes ={" "}
                      {Math.round(
                        this.props.job.CityData.categories[16].score_out_of_10
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Leisure and Culture ={" "}
                      {Math.round(
                        this.props.job.CityData.categories[14].score_out_of_10
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                ) : (
                  <p>No Data Found</p>
                )}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}
