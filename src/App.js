import React, { Component } from 'react'
import Main from './Main'
import './App.css';
// import Login from './components/Login';
// import Logout from './components/Logout';
import Profile from './components/Profile';
// import BestJobs from './components/BestJobs';
// import { useAuth0 } from "@auth0/auth0-react";
import data from './data.json'
import Sidebar from './Sidebar';

import React, { Component, useState } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      saved: [],
      stars: '',
      data: data,
      show: false
    }
  }

showCanvas = () => {
  this.setState({
    show: true
  })
}
hideCanvas = () =>{
  this.setState({
    show: false
  })
}

  render() {
    return (
      <>
        <Sidebar
        
          saved={this.state.saved}
          favs={this.state.stars}
          data={this.state.data}
          show={this.state.show}
         showCanvas={this.showCanvas}
         hideCanvas={this.hideCanvas}
        />
      <div>
        <h1>VibesVille</h1>
        <Login />
        <Logout />
        <Profile />
        <Main/>
      </div>
      </>
    )
  }
}




