import React, {useState, useEffect, useRef, useContext} from 'react';

import * as api from '../../screen/api/api';

/*
import Ak47 from '../../screen/resources/images/ak47.png';
import ArmorFull from '../../screen/resources/images/assaultsuit.png';
import LightArmor from '../../screen/resources/images/kevlar.png';
import FlashGrenade from '../../screen/resources/images/flash_grenade.png';
import HeGrenade from '../../screen/resources/images/explosive_grenade.png';
import SmokeGrenade from '../../screen/resources/images/smoke_grenade.png';
import C4 from '../../screen//resources/images/c4.png';
//import Defuser from '../../screen//resources/images/defuser.png';
import User from '../../screen/resources/images/unknown-user.png';
*/


import {SocketContext} from '../Socket/Socket';

//const images = require.context('../../screen/resources/images', true, /.png$/);

//console.log(images('/glock.png'))


const PlayersLeft = ({playersList}) =>{

    const [playersID, setPlayersID] = useState([...playersList]);
    const [players, setPlayers] = useState([]);
    const [finishedLoading, setFinishedLoading] = useState(false);

    const previousProps = usePrevious(playersID);


    const socket = useContext(SocketContext);


    useEffect(() => {

        playersList.map((playerid, index) =>{

            api.players.getPlayer(playerid).then(p =>{

                const playerinfo = {
                    current_weapon: '17',
                    primary_weapon: null,
                    secondary_weapon: '17',
                    health: 100,
                    equipment: []
                };

                setPlayers(player => [...player, {...p.player_info, ...playerinfo}]);

                if(index === playersList.length - 1){
                    setFinishedLoading(true);
                }
            })
        })

    }, [playersList])

    useEffect(() => {

        console.log('called socket effect');

        socket.on('weapon_switched', (event) =>{

            const object = JSON.parse(event);

            console.log("STEAMID: ", object.user_pick_id);

            console.log(players);

            if(players.length > 0){

                const playerindex = players.findIndex(player => player.player_steamid === object.user_pick_id);

                const newplayers = [...players];
                
                newplayers[playerindex].current_weapon = object.weapon_id;
            
                console.log(newplayers)

                setPlayers(newplayers);

                console.log(players)

            }
        });

        return () => socket.off('weapon_switched');

    }, [finishedLoading]);

    // Using ref to remember old state value
    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;
    }


    return(
        <React.Fragment>
            {
                players && players.map((player, index)=>{
         
                    const i = index + 1;
                    
                  return  (
                    <div key={i} className={`left-player-${i}`}>
                        <div className={`health-player-left-${i}`}>
                            <div className={`nick-left-${i}`}>
                                {player.player_nickname}
                            </div>
                            <div className={`armor-left-${i}`}>
                                {/*
                                <img src={ArmorFull} alt="full"></img>
                                <img src={LightArmor} alt="full"></img>*/}
                            </div>
                            <div className={`health-number-left-${i}`}>
                                100
                            </div>
                        </div>

                        <div className={`player-info-left-${i}`}>
                            <div className={`avatar-left-${i}`}>
                                <img src="" alt="user" />
                            </div>
                            <div className={`equipment-left-${i}`}>
                                <img src="" alt="full"></img>
                            </div>
                            <div className={`utility-left-${i}`}>
                                {/*
                                <img src={FlashGrenade} alt="full"></img>
                                <img src={SmokeGrenade} alt="full"></img>
                                <img src={HeGrenade} alt="full"></img>*/}
                            </div>
                            <div className={`weapon-left-${i}`}>
                                <img src={require(`../../screen/resources/images/${players[index].current_weapon}.png`)} alt="full"></img>
                               
                            </div>
                        </div>

                    </div>
                   )
                })
            }
            
           
        </React.Fragment>
    );
}

export default PlayersLeft;