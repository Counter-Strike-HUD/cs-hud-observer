import React, {useEffect, useState} from 'react';

import TeamNames from '../core/TeamName/TeamNames';
import Crosshair from '../core/Crosshair/Crosshair';
import MapsPool from '../core/MapsPool/MapsPool';
import Radar from '../core/Radar/Radar';
import Kill from '../core/Kill/Kill';
import Score from '../core/Score/Score';
import PlayersLeft from '../core/PlayersLeft/PlayersLeft';
import PlayersRight from '../core/PlayersRight/PlayersRight';
import PlayerObserved from '../core/PlayerObserved/PlayerObserved';

import {SocketContext, socket} from '../core/Socket/Socket';
import * as api from './api/api';


import './Screen.css'

function Example() { 

    const [teams, setTeams] = useState(null);
    const [matchID, setMatchID] = useState(null);
    const [team1Name, setTeam1Name] = useState('TEAM 1');
    const [team2Name, setTeam2Name] = useState('TEAM 2');
    const [team1Players, setTeam1Players] = useState([]);
    const [team2Players, setTeam2Players] = useState([]);
    const [logoLeft, setLogoLeft] = useState('default.png')
    const [logoRight, setLogoRight] = useState('default.png')
    const [update, setUpdate] = useState(false);

    useEffect(() => {

        console.log('Calin match info')

        api.matches.getMatch('027a4b5795541d659cdd9c481c0550379ba43b72').then(res =>{
            setMatchID(res.id)
            setTeam1Players(res.match_info.team_one_players);
            setTeam2Players(res.match_info.team_two_players);
            console.log(res)
            return res
        })
        .then((res) =>{

            // TEAM 1
            api.teams.getTeam(res.match_info.team_one).then(res => {
               console.log(res.team_info.team_logo_name); 

               setLogoLeft(res.team_info.team_logo_name);
               setTeam1Name(res.team_info.team_short_name.toUpperCase())
            });

            // TEAM 2
            api.teams.getTeam(res.match_info.team_two).then(res => {
                setLogoRight(res.team_info.team_logo_name);
                setTeam2Name(res.team_info.team_short_name.toUpperCase())}
            )

        })  
        .catch(err => console.log(err));

   

    },[update])

        return(
            <SocketContext.Provider value={socket}> 

               <div className="grid-container">
                
                    <Crosshair />

                    <Score logoLeft={logoLeft} logoRight={logoRight} />

                    <TeamNames teamleft={team1Name} teamright={team2Name} />

                    <div className="box-left">
                       
                        <MapsPool />

                        <Radar />

                    </div>

                    <div className="box-right">
                        <Kill />
                    </div>
                    
                    <div className="team-box-left">
                        <PlayersLeft playersList={team1Players} />
                    </div>
                    
                    
                    <div className="team-box-right">
                        <PlayersRight playersList={team2Players} />
                    </div> 

                    <div className="player-info">

                        <PlayerObserved />
                      
                    </div>
                </div>

            </SocketContext.Provider>       
        );
    
}

export default Example;