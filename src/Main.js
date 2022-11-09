import React from 'react'
import JobCard from './JobCard'
import axios from 'axios';
import JobModal from './JobModal'
import './Main.css'
import { withAuth0 } from '@auth0/auth0-react';
import { Form ,Button, Spinner } from 'react-bootstrap';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobTitle: '',
      jobs: [],
      selectedJob: '',
      isLoading: false
    }
  }

  handleInput = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    this.setState({
      jobTitle: e.target.value
    })
  }
componentDidMount(){
  this.props.button();
}

  getJobData= async (e) => {
    e.preventDefault();
    this.setState({isLoading: true})
    try {

      let url = `https://vibesville.herokuapp.com/jobs?jobQuery=${this.state.jobTitle}`

      let jobs = await axios.get(url);
      this.setState({
        jobs: jobs.data,
        isLoading: false
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
      <div className="mainContain">
        <header>
          <img
            src="https://via.placeholder.com/800x400/"
            alt="placeholder"
          ></img>
          <h1>VibesVille</h1>
        </header>
        <div className="search">
          <Form onSubmit={this.getJobData} id="form">
            <input
              placeholder="Search Jobs Now!"
              type="search"
              name="search"
              onChange={this.handleInput}
            />
            {/* <Button type="submit">Vibe Check!</Button> */}
            <Button type = "submit" variant="primary" >
              Vibe Check!
              {this.state.isLoading ? <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /> : false}
              {/* <span className="visually-hidden">Loading...</span> */}
            </Button>
          </Form>
        </div>
        <div>
          {this.state.jobs
            ? this.state.jobs.map((job) => {
                return (
                  <JobCard job={job} modalOpen={this.openModal} key={job._id} />
                );
              })
            : null}
          {
            <JobModal
              show={this.state.modalDisplay}
              onHide={() => this.setState({ modalDisplay: false })}
              job={this.state.selectedJob}
              setSaved={this.props.setSaved}
            />
          }
        </div>
      </div>
    );
  }
}

export default withAuth0(Main);