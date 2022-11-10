import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "./About.css";

class About extends Component {
  render() {
    return (
      <>
        <h2 className="About">The Team</h2>
        <div className="About">
          <Card style={{ width: "24rem" }}>
            <Card.Img variant="top" src="./assets/Seth.jpg" />
            <Card.Body>
              <Card.Title>Seth Pierce</Card.Title>
              <Card.Text>
                I'm 24 years old and I'm currently learning to code at Code
                Fellows. I spent 4 years in the Marine Corps as a diesel
                mechanic and I'm hoping to make a change in careers and grow as
                a Developer through Code Fellows.
              </Card.Text>
            </Card.Body>
          </Card>   
          <Card style={{ width: "24rem" }}>
            <Card.Img variant="top" src="./assets/RC.JPEG" alt="Raphael" />
            <Card.Body>
              <Card.Title>Raphael Chookagian</Card.Title>
              <Card.Text>
                Hello! I am a student at Code Fellows full-stack JavaScript
                program. I have been a commercial photographer for the past
                decade and am now transitioning into web development. <br />
                Born in Rio de Janeiro, Brazil. U.S. Army combat veteran,
                certified personal trainer and fashion photographer. Well versed
                in working internationally within teams and solo to accomplish
                set objectives. <br />
                You can find me on{' '}
                <a href="https://www.linkedin.com/in/raphaelchookagian/">
                  Linkedin
                </a>
                &<a href="https://github.com/cesarderio"> GitHub</a>. <br />
                Thank you for checking out our project!
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: "24rem" }}>
            <Card.Img variant="top" src="./assets/Elias.jpg" />
            <Card.Body>
              <Card.Title>Elias Staehle</Card.Title>
              <Card.Text>
                I am 24 years old and a USMC vet that is training to become a
                full stack developer at code fellows.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: "24rem" }}>
            <Card.Img variant="top" src="./assets/Dennis.png" />
            <Card.Body>
              <Card.Title>Dennis Nichols</Card.Title>
              <Card.Text>
                Software developer with data science and GIS interests. I have a
                broad scientific and technical background with education and
                work experience in fields ranging from nuclear power operation
                to geospatial analysis to public health project management.
              </Card.Text>
            </Card.Body>
          </Card>
       
        </div>
      </>
    );
  }
}
export default About;
