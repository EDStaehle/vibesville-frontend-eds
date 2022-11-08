import React from 'react'
import Main from './Main'
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';
// browser routes
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
// import BestJobs from './components/BestJobs';

import Sidebar from './Sidebar';
// import { DEFAULT_BREAKPOINTS } from 'react-bootstrap/esm/ThemeProvider';
import { withAuth0 } from '@auth0/auth0-react';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      saved: [],
      stars: '',
      show: false
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

  render() {
    console.log(this.state.saved)
    return (
      <>
        {/* <Router>
          <div>
            
            <Routes>
              <Route
              >
              </Route>
              <Route>
              </Route>
            </Routes>
          </div> */}
          <div>
            {this.props.auth0.isAuthenticated ?
              <>
                <Profile />
                <Logout />
                <Sidebar
                  setSaved={this.setSaved}
                  saved={this.state.saved}
                  favs={this.state.stars}
                  data={this.state.data}
                  show={this.state.show}
                  showCanvas={this.showCanvas}
                  hideCanvas={this.hideCanvas}
                />
              </>
              :
              <Login />}
            <Main setSaved={this.setSavedNew}/>
          </div>
        {/* </Router> */}
      </>
    )
  }
}

export default withAuth0(App);


