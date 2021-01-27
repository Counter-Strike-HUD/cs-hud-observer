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
import TeamView from './components/teams/view/ViewTeam';

import PlayerAdd from './components/players/add/PlayerAdd';
import PlayerView from './components/players/view/PlayerView';

import MatchesAdd from './components/matches/add/MatchesAdd';
import MatchesView from './components/matches/view/MatchesView';
//const client = io.connect('localhost:8000');


import Screen from './components/screen/Example';


function App() {
  
  return (
      <Router>

        {window.location.pathname !== '/screen' ? <Routes /> : null}
       
        <Switch>
          <Route path="/matches/view/:id" component={MatchesView} />
          <Route path="/matches/add" component={MatchesAdd} /> 
          <Route path="/players/view/:id" component={PlayerView} /> 
          <Route path="/players/add" component={PlayerAdd} /> 
          <Route path="/teams/view/:id" component={TeamView} />   
          <Route path="/teams/add" component={TeamAdd} />   
          <Route path="/matches" component={Matches} />
          <Route path="/players" component={Players} /> 
          <Route path="/teams" component={Teams} />
          <Route path="/screen" component={Screen} />
          <Route path="/" component={Welcome} />
        </Switch>
      </Router>
  );

}


export default App;
