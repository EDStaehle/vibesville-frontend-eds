import React, { Component } from 'react'
import JobCard from './JobCard'
import axios from 'axios';

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

      let url = ''

      let jobs = await axios.get(url);
      this.setState({
        jobs: jobs.data
      });
      
    } catch(error){
      this.setState({
      })
    }}

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
              return <JobCard title={job.title} company={job.company} location={job.location} description={job.description} modalOpen={this.setState({selectedJob: job})}/>
            }): <p>no jobs found</p>
          }
          {
          //   this.state.selectedBook &&
          // < show={this.state.updateDisplay} 
          // onHide={()=> this.setState({updateDisplay: false})} 
          // book={this.state.selectedBook} 
          // updateBooks={this.updateBooks}/>
          }
        </div>
      </>
    )
  }
}
