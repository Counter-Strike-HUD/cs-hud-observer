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
    const [logoLeft, setLogoLeft] = useState('default.png')
    const [logoRight, setLogoRight] = useState('default.png')
    const [update, setUpdate] = useState(false);

    useEffect(() => {

        console.log('Calin match info')

        api.matches.getMatch('43bf7743ebd930d65a411e83465a7a04e30d09f6').then(res =>{
            setMatchID(res.id)

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
        .then(() => {

            

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
                        <PlayersLeft />
                    </div>
                    
                    
                    <div className="team-box-right">
                        <PlayersRight />
                    </div>

                    <div className="player-info">

                        <PlayerObserved />
                      
                    </div>
                </div>

            </SocketContext.Provider>       
        );
    
}

export default Example;