import React from 'react'
import Main from './Main'
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';
import Header from './Header';
import Dashboard from './Dashboard';
import About from './About';
// browser routes
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route
// } from "react-router-dom";
// import BestJobs from './components/BestJobs';

import Sidebar from './Sidebar';
// import { DEFAULT_BREAKPOINTS } from 'react-bootstrap/esm/ThemeProvider';
import { withAuth0 } from '@auth0/auth0-react';
import JobCard from './JobCard';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      saved: [],
      stars: '',
      show: false,
      button: true
    }
  }

  showCanvas = () => {
    this.setState({
      show: true
    })
  }
  hideCanvas = () => {
    this.setState({
      show: false
    })
  }
  setSaved = (saved) => {
    this.setState({
      saved: saved
    })
  }

  setSavedNew = (newJob) => {
    this.setState({
      saved: [...this.state.saved, newJob]
    })
  }
handlestopbtn = () => {
  this.setState({
    button: !this.state.button
  })
}
  render() {
    console.log(this.state.saved)
    return (
      <>
        <Router>
          <Header />
              <div>
                {this.props.auth0.isAuthenticated ?
                  <>
                    <Profile />
                    <Logout />
                    <Sidebar
                      setSaved={this.setSaved}
                      saved={this.state.saved}
                      favs={this.state.stars}
                      show={this.state.show}
                      showCanvas={this.showCanvas}
                      hideCanvas={this.hideCanvas}
                      button={this.state.button}
                    />
                  </>
                  :
                  <Login />}
                
              </div>
          <div>
            
            <Routes>
              <Route
                 exact path="/"
                element={<Main
                button={this.handlestopbtn}
                setSaved={this.setSavedNew}
                />}
              >
              </Route>
              <Route
                 exact path="/dashboard"
                 element={<Dashboard 
                  button={this.handlestopbtn}
                  setSaved={this.setSaved}
                  saved={this.state.saved}
                  favs={this.state.stars}
                 />}
              >
              </Route>
            </Routes>
          </div>
        </Router>
      </>
    )
  }
}

export default withAuth0(App);


