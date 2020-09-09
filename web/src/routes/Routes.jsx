import React from 'react';
import {Navbar} from 'react-bootstrap';


import PlayersRoute from './players/PlayersRoute';
import TeamsRoute from './teams/TeamsRoute';
import MatchesRoute from './matches/MatchesRoute';

class Routes extends React.Component{

    render(){        
        return(
            <div>

                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">
                     CS HUD
                    </Navbar.Brand>
                    <Navbar.Text>
                        <TeamsRoute />
                    </Navbar.Text>
                    <Navbar.Text>
                        <PlayersRoute />
                    </Navbar.Text>
                    <Navbar.Text>
                        <MatchesRoute />   
                    </Navbar.Text>
                </Navbar>
                   
            </div>       
        );
    }
}

export default Routes;