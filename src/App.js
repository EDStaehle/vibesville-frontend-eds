import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';
// import BestJobs from './components/BestJobs';
// import { useAuth0 } from "@auth0/auth0-react";

function App() {
  return (
    <>
      <h1>VibesVille</h1>
      {this.props.auth0.isAuthenticated ?
        <>
          <Profile />
          <Logout />
        </>
        :
        <Login />
      }
    </>
  );
}

export default App;

//add <BestJobs />
// wrap App -->
// export default withAuth0(App);
