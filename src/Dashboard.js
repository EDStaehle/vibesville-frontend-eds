import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Dashboard.css'
import { useAuth0, withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { Rating } from 'react-simple-star-rating'
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

      let savedData = await axios.get(`https://vibesville.herokuapp.com/saved/${this.props.auth0.user.email}`);
      console.log(savedData)
      this.props.setSaved(savedData.data)

    }
  }
  render() {
    console.log(this.props.saved)
    let data = this.props.saved.map((d) => (
      <DashCard
      deleteSaved={this.props.deleteSaved}
      updateCompleted={this.props.updateCompleted}
      updateCard={this.props.updateCard}
      key={d._id}
      saved={this.props.saved}
      setSaved={this.props.setSaved}
      d={d}/>
    ))
    return (
      <>
        {
          this.props.auth0.isAuthenticated ? <div> {data} </div> : <p>please login</p>
        }

      </>
    )
  }
}
export default withAuth0(Dashboard);