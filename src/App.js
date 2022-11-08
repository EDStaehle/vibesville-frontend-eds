import React from 'react'
import Main from './Main'
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';
// import BestJobs from './components/BestJobs';
import data from './data.json'
import Sidebar from './Sidebar';
// import { DEFAULT_BREAKPOINTS } from 'react-bootstrap/esm/ThemeProvider';
import { withAuth0 } from '@auth0/auth0-react';


class App extends React.Component {
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
setSaved = (saved) => {
  this.setState({
    saved: saved
  })
}

  render() {
    // console.log(this.props.auth0.user.email)
    return (
      <>
        <div>
          {this.props.auth0.isAuthenticated  ?
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
          <Main/>
        </div>
      </>
    )
  }
}

export default withAuth0(App);


