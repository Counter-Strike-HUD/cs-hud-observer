import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//import io from 'socket.io-client';


import './App.css';

// Navbar routes
import Routes from './routes/Routes';
import Welcome from './components/main/Welcome';
import Players from './components/players/Players';
import Teams from './components/teams/Teams';
import Matches from './components/matches/Matches';

// Link routes 
import TeamAdd from './components/teams/add/TeamAdd';


//const client = io.connect('localhost:8000');


function App() {
  
  return (
      <Router>
        <Routes />
        <Switch>
          <Route path="/teams/add">   
            <TeamAdd />
          </Route> 
          <Route path="/matches">
            <Matches />
          </Route>
          <Route path="/players">
            <Players />
          </Route>
          <Route path="/teams">
            <Teams />
          </Route>
          <Route path="/">
            <Welcome/>
          </Route>
        </Switch>
      </Router>
  );

}


export default App;
