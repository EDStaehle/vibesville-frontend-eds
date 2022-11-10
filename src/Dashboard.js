import React from 'react';
import './Dashboard.css'
import {  withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import DashCard from './DashCard';

class Dashboard extends React.Component {
constructor(props){
  super(props)
  this.state ={
    cardSaved: this.props.saved,
    
  }
}
  async componentDidMount() {
    this.props.button();
    if (this.props.auth0.isAuthenticated) {
      let savedData = await axios.get(
        `${process.env.REACT_APP_SERVER}/saved/${this.props.auth0.user.email}`
      );
      console.log(savedData)
      this.props.setSaved(savedData.data)
    }
  }
  render() {
    console.log(this.props.saved)
    
    let data = this.props.saved.map((d,idx) => (
      <DashCard
      deleteSaved={this.props.deleteSaved}
      updateCompleted={this.props.updateCompleted}
      updateCard={this.props.updateCard}
      key={idx}
      saved={this.props.saved}
      setSaved={this.props.setSaved}
      d={d}/>
    ))
    return (
      <div className='dashCardContain'>
        {
          this.props.auth0.isAuthenticated ? <div> {data} </div> : <p>please login</p>
        }
      </div>
    )
  }
}
export default withAuth0(Dashboard);