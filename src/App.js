import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';
// import BestJobs from './components/BestJobs';
// import { useAuth0 } from "@auth0/auth0-react";

<<<<<<< HEAD
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



=======
function App() {
  return (
    <>
    <h1>VibesVille</h1>
    <Login />
    <Logout />
    <Profile />
    </>
  );
}

export default App;

//add <BestJobs />
// wrap App -->
// export default withAuth0(App);


// function App() {
//   return (
//     <>
//       <h1>VibesVille</h1>
//       {this.props.auth0.isAuthenticated ?
//         <>
//           <Profile />
//           <BestJobs />
//           <Logout />
//         </>
//         :
//         <Login />
//       }
//     </>
//   );
// }

// export default withAut0(App);
>>>>>>> 6ad6c989cd1cadcd86892375ae396d35aeddd257
