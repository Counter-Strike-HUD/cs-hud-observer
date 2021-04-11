import React, {useState, useEffect, useRef} from 'react';
import * as api from '../../screen/api/api';

import Ak47 from '../../screen/resources/images/ak47.png';
import ArmorFull from '../../screen/resources/images/assaultsuit.png';
import LightArmor from '../../screen/resources/images/kevlar.png';
import FlashGrenade from '../../screen/resources/images/flash_grenade.png';
import HeGrenade from '../../screen/resources/images/explosive_grenade.png';
import SmokeGrenade from '../../screen/resources/images/smoke_grenade.png';
import C4 from '../../screen//resources/images/c4.png';
import Defuser from '../../screen//resources/images/defuser.png';
import User from '../../screen/resources/images/unknown-user.png';

const PlayersLeft = ({playersList}) =>{

    const [playersID, setPlayersID] = useState([]);
    const [players, setPlayers] = useState([]);
    const previousProps = usePrevious(playersID);


    useEffect(() => {

        setPlayersID(playersList);
    
        playersID !== previousProps && playersID.map( player =>{
            api.players.getPlayer(player).then(player =>{
                console.log(player)
                setPlayers(players => [...players, player.player_info])
            })
        })
   
    })

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
                                <img src={ArmorFull} alt="full"></img>
                                <img src={LightArmor} alt="full"></img>
                            </div>
                            <div className={`health-number-left-${i}`}>
                                100
                            </div>
                        </div>

                        <div className={`player-info-left-${i}`}>
                            <div className={`avatar-left-${i}`}>
                                <img src={User} alt="user" />
                            </div>
                            <div className={`equipment-left-${i}`}>
                                <img src={C4} alt="full"></img>
                            </div>
                            <div className={`utility-left-${i}`}>
                                <img src={FlashGrenade} alt="full"></img>
                                <img src={SmokeGrenade} alt="full"></img>
                                <img src={HeGrenade} alt="full"></img>
                            </div>
                            <div className={`weapon-left-${i}`}>
                                <img src={Ak47} alt="full"></img>
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