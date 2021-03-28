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
    const [update, setUpdate] = useState(false);

    useEffect(() => {

        console.log('Calin match info')

        const response = api.matches.getMatch('43bf7743ebd930d65a411e83465a7a04e30d09f6').then(res =>{
            console.log(res)
        }).catch(err => console.log(err));

        console.log(response)

    },[update])

        return(
            <SocketContext.Provider value={socket}> 

               <div className="grid-container">
                
                    <Crosshair />

                    <Score />

                    <TeamNames teamleft='MYSTERIOUS' teamright='INFECTORS' />

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