import React, { Component } from 'react'
import "./About.css";

 class About extends Component {
  render() {
    return (
      <>
      <div className='About'>
 
        <h2>The Team</h2>
        <div className='Namecard'>
          <img src='./assets/Seth.jpg' alt='Seth'/>
          <div className='container'>
            <h2>Seth Pierce</h2>
            <p>My name is Seth Pierce. I'm 24 years old and I'm currently learning to code at Code Fellows. I spent 4 years in the Marine Corps as a diesel mechanic and I'm hoping to make a change in careers and grow as a Developer through Code Fellows.</p>
          </div>
        </div>
        <div className='Namecard'>
          <img src='./assets/Elias.jpg' alt='Elias'/>
          <div className='container'>
            <h2>Elias Staehle</h2>
            <p>My name is Elias Staehle. I am 24 years old and a USMC vet that is training to become a full stack developer at code fellows.</p>
          </div>
        </div>
        <div className='Namecard'>
          <img src='./assets/Dennis.png' alt='Dennis'/>
          <div className='container'>
            <h2>Dennis Nichols</h2>
            <p>Software developer with data science and GIS interests. I have a broad scientific and technical background with education and work experience in fields ranging from nuclear power operation to geospatial analysis to public health project management.</p>
          </div>
        </div>
        <div className='Namecard'>
          <img src='./assets/RC.JPEG' alt='Raphael'/>
          <div className='container'>
            <h2>Raphael Chookagian</h2>
            <p> Hello! My name is Raphael Chookagian. I am a student at Code Fellows full-stack JavaScript program. I have been a commercial photographer for the past decade and am now transitioning into web development. <br />
            Born in Rio de Janeiro, Brazil. U.S. Army combat veteran, certified personal trainer and fashion photographer. Well versed in working internationally within teams and solo to accomplish set objectives. <br />
            You can find me on <br />
            <a href="https://www.linkedin.com/in/raphaelchookagian/">
              Linkedin
            </a>&<a href="https://github.com/cesarderio"> GitHub</a>. <br />
            Thank you for checking out our project!</p>
          </div>
        </div>
      </div>
    
    </>

    )
}
}
export default About;
