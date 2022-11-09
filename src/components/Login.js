import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "react-bootstrap";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;



//add this to SavedJobs/BestJobs component->

// import { useAuth0 } from "@auth0/auth0-react";  <------

// then wrap export default BestCity component with higher order component ->

// export default withAuth0(BestJobs);   <---

//----------------------------------------------------------------
 // EXAMPLE FOR USING AUTH0 WITH SAVED USER/JOB/CITY LIST:

// class BestJobs extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       jobs: []
//     }
//   }
  
//   async componenentDidMount(){

//     if(this.props.auth0.isAuthenticated){
//       const res = await this.props.auth0.getIdTokenClaims();

//       const jwt = res.__raw;

//       console.log('token: ', jwt);   

//       const config = {
//         header: ( "Authorization": `Bearer ${jwt}`),
//         method: 'get',
//         baseURL: process.env.REACT_APP_SERVER,
//         url: '/jobs'
//       }
//       let cityData = await axios(config);
      
      
//       this.setState({
//         city: jobsData.data
//       })
//     }
//   }
  
// }
