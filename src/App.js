import React from 'react'
import Main from './Main'
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';
import Header from './Header';
import Dashboard from './Dashboard';
import About from './About';
import axios from 'axios';

// browser routes
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


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
      button: true,
      updateCompleted: false
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
  updateCard = async (itemToUpdate) => {

    try{
      let url = `https://vibesville.herokuapp.com/saved/${itemToUpdate._id}`
      let updateditem = await axios.put(url, itemToUpdate);

      let updateditemArray = this.state.saved.map(existingItem => {
        return existingItem._id === itemToUpdate._id 
        ? updateditem.data
        : existingItem
      });
      this.setState({saved: updateditemArray, updateCompleted: true})
       


    }catch (error) {
      console.log(error.message);
    }
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

deleteSaved = async (id) => {
  try {
    await axios.delete(`https://vibesville.herokuapp.com/saved/${id}`)

    let updatedSaved = this.state.saved.filter(job => job._id !== id)

    this.setState({
      saved: updatedSaved
    })
  } catch (error) {
    console.log(error.message)
  }
}

  render() {
    return (
      <>
        <Router>
          <Header />
              <div>
                {this.props.auth0.isAuthenticated ?
                  <>
                    {/* <Profile /> */}
                    <Logout />
                    <Sidebar
                      setSaved={this.setSaved}
                      saved={this.state.saved}
                      favs={this.state.stars}
                      show={this.state.show}
                      showCanvas={this.showCanvas}
                      hideCanvas={this.hideCanvas}
                      button={this.state.button}
                      deleteJob={this.deleteSaved}
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
                  updateCompleted={this.state.updateCompleted}
                  deleteSaved={this.deleteSaved}
                  updateCard={this.updateCard}
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


