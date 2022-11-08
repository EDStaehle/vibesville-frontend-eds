import React, { Component } from 'react'
import JobCard from './JobCard'
import axios from 'axios';
import JobModal from './JobModal'

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobTitle: '',
      jobs: [],
      selectedJob: '',
    }
  }

  handleInput = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    this.setState({
      jobTitle: e.target.value
    })
  }


  getJobData= async (e) => {
    e.preventDefault();

    try {

      let url = `https://vibesville.herokuapp.com/jobs?jobQuery=${this.state.jobTitle}`

      let jobs = await axios.get(url);
      this.setState({
        jobs: jobs.data
      });
      
    } catch(error){
      this.setState({
      })
    }}

    openModal = (job) => {
      this.setState({selectedJob: job, modalDisplay: true})
    }

  render() {
    return (
      <>
        <header>
          <img src='https://via.placeholder.com/800x400/'></img>
          <h1>VibesVille</h1>
        </header>
        <div id='searchBar'>
          <form onSubmit={this.getJobData} id='form'>
              <label > Search Jobs Now!</label>
              <input type="text" onInput={this.handleInput}/>
              <button type='submit'>Vibe Check!</button>
          </form>
        </div>
        <div>
          {
            this.state.jobs ?
            this.state.jobs.map((job) => {
              return <JobCard job={job} modalOpen={this.openModal}/>
            }): null
          }
          {
          <JobModal show={this.state.modalDisplay} 
          onHide={()=> this.setState({modalDisplay: false})} 
          job={this.state.selectedJob} 
          />
          }
        </div>
      </>
    )
  }
}
