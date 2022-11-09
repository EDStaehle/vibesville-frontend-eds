import React, { Component } from 'react'

 class About extends Component {
  render() {
    return (
      <>
      <div className='About'>
        <div>
        <h1>About the Team</h1>
        <p>Team 5, insert text about who we are, who our team is and what we do, etc.</p>
        </div>
        <h2>The Team</h2>
        <div className='Namecard'>
          <img src='' alt=''/>
          <div className='container'>
            <h2>Seth Pierce</h2>
            <p>bio of team member here. Lorem ipsum ipsum</p>
          </div>
        </div>
        <div className='Namecard'>
          <img src='' alt=''/>
          <div className='container'>
            <h2>Elias Staehle</h2>
            <p>bio of team member here. Lorem ipsum ipsum</p>
          </div>
        </div>
        <div className='Namecard'>
          <img src='' alt=''/>
          <div className='container'>
            <h2>Dennis Nichols</h2>
            <p>bio of team member here. Lorem ipsum ipsum</p>
          </div>
        </div>
        <div className='Namecard'>
          <img src='./assets/RC.JPEG' alt='Raphael'/>
          <div className='container'>
            <h2>Raphael Chookagian</h2>
            <p>bio of team member here. Lorem ipsum ipsum</p>
          </div>
        </div>
      </div>
    
    </>

    )
}
}
export default About;
