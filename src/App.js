import React, { Component } from 'react'
import Main from './Main'
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>VibesVille</h1>
        <Login />
        <Logout />
        <Profile />
        <Main/>
      </div>
    )
  }
}
