import React, {useEffect, useState} from 'react';

import { SocketStoreComponent } from '../core/Socket/Socket';
import TeamNames from '../core/TeamName/TeamNames';
import Crosshair from '../core/Crosshair/Crosshair';
import MapsPool from '../core/MapsPool/MapsPool';
import Radar from '../core/Radar/Radar';
import Kill from '../core/Kill/Kill';
import Score from '../core/Score/Score';
import PlayersLeft from '../core/PlayersLeft/PlayersLeft';
import PlayersRight from '../core/PlayersRight/PlayersRight';
import PlayerObserved from '../core/PlayerObserved/PlayerObserved';


import * as api from './api/api';
import { useHudStore } from '../core/Socket/Socket';
import hudconfig from './hud.json';


import './Screen.css'

function Example() { 

    const [allPlayers, setAllPlayers] = useState([]);
    const [matchID, setMatchID] = useState(null);
    const [team1Name, setTeam1Name] = useState('TEAM 1');
    const [team2Name, setTeam2Name] = useState('TEAM 2');
    const [team1Players, setTeam1Players] = useState([]);
    const [team2Players, setTeam2Players] = useState([]);
    const [type, setType] = useState(null);
    const [mapsPool, setMapsPool] = useState([]);
    const [logoLeft, setLogoLeft] = useState('default.png')
    const [logoRight, setLogoRight] = useState('default.png')
    const [update, setUpdate] = useState(false);

    useEffect(() => {

        console.log('Calin match info')

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('match');
        
        if(!id){console.error('match id not found')}

        api.matches.getMatch(id).then(res =>{

            setMatchID(res.id)
            setTeam1Players(res.match_info.team_one_players);
            setTeam2Players(res.match_info.team_two_players);
            setAllPlayers([...res.match_info.team_one_players, ...res.match_info.team_two_players]);
            setType(res.match_info.match_type)
            setMapsPool(res.match_info.maps_selected)

            //socketStore(res.match_info.team_one_players, res.match_info.team_two_players);
            
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

        // Hook left players state
        const playersLeftGlobal = useHudStore(state => state.tt_players);
        const playersRightGlobal = useHudStore(state => state.ct_players);
        const kills = useHudStore(state => state.kills);
        const team1Score = useHudStore(state => state.team1_score);
        const team2Score = useHudStore(state => state.team2_score);
        const roundInfo = useHudStore(state => state.state);


        return(
     

               <div className="grid-container">
                
                    <SocketStoreComponent teamLeft={team1Players} teamRight={team2Players} />
                
                    <Crosshair />

                    <Score roundInfo={roundInfo} team1score={team1Score} team2score={team2Score} logoLeft={logoLeft} logoRight={logoRight} />

                    <TeamNames teamleft={team1Name} teamright={team2Name} />

                    <div className="box-left">
                       
                        <MapsPool type={type} pool={mapsPool} />

                        <Radar />

                    </div>

                    <div className="box-right">
                        <Kill screentime={hudconfig.settings.kill_displaytime} kills={kills} />
                    </div>
                    
                    <div className="team-box-left">
                        <PlayersLeft players={playersLeftGlobal} />
                    </div>
                    
                    
                    <div className="team-box-right">
                        <PlayersRight players={playersRightGlobal} />
                    </div> 

                    <div className="player-info">

                        <PlayerObserved players={[...playersLeftGlobal, ...playersRightGlobal]} />
                      
                    </div>
                </div>
        );
    
}

export default Example;