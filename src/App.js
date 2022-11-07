import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      saved: [],
      stars: '',
    }
  }
  render() {
    return (
      <div>App</div>
    )
  }
}



