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
                    equipment: [],
                    c4: false,
                };

                setPlayers(player => [...player, {...p.player_info, ...playerinfo}]);

                if(index === playersList.length - 1){
                    setFinishedLoading(true);
                }
            })
        })

    }, [playersList])



    useEffect(() => {

        socket.on('weapon_switched', (event) =>{

            const object = JSON.parse(event);

            if(players.length > 0){

                const playerindex = players.findIndex(player => player.player_steamid === object.user_pick_id);

                console.log(playerindex);

                if(playerindex !== -1){

                    const newplayers = [...players];

                    console.log(newplayers)
                    
                    newplayers[playerindex].current_weapon = object.weapon_id;

                    setPlayers(newplayers);
                }

            }
        });

        return () => socket.off('weapon_switched');

    }, [finishedLoading]);



    useEffect(() => {

        socket.on('c4_pick', (event) =>{

            const object = JSON.parse(event);

            if(players.length > 0){

                const playerindex = players.findIndex(player => player.player_steamid === object.user_pick_id);

                if(playerindex !== -1){

                    const newplayers = [...players];

                    console.log(newplayers)
                    
                    newplayers[playerindex].c4 = true;

                    setPlayers(newplayers);
                }

            }
        });

        return () => socket.off('c4_pick');

    }, [finishedLoading]);



    useEffect(() => {

        socket.on('c4_drop', (event) =>{

            const object = JSON.parse(event);

            if(players.length > 0){

                const playerindex = players.findIndex(player => player.player_steamid === object.user_drop_id);

                if(playerindex !== -1){

                    const newplayers = [...players];
                    console.log(newplayers)
                    newplayers[playerindex].c4 = false;

                    setPlayers(newplayers);
                }

            }
        });

        return () => socket.off('c4_drop');

    }, [finishedLoading]);



    useEffect(() => {

        socket.on('c4_planted', (event) =>{

            const object = JSON.parse(event);

            if(players.length > 0){

                const playerindex = players.findIndex(player => player.player_steamid === object.plant_invoker_id);

                if(playerindex !== -1){

                    const newplayers = [...players];
                    console.log(newplayers)
                    newplayers[playerindex].c4 = false;

                    setPlayers(newplayers);
                }

            }
        });

        return () => socket.off('c4_planted');

    }, [finishedLoading]);




    useEffect(() => {

        socket.on('pickup_item', (event) =>{

            const object = JSON.parse(event);

            if(players.length > 0){

                const playerindex = players.findIndex(player => player.player_steamid === object.user_id);

                if(playerindex !== -1){

                    const newplayers = [...players];

                    console.log(newplayers)


                    // HE HeGrenade
                    if(object.item_id === 4){
                        newplayers[playerindex].equipment.push(4);
                    }


                    // Smoke grenade
                    if(object.item_id === 9){
                        newplayers[playerindex].equipment.push(9);
                    }


                    // Flesh grenade
                    if(object.item_id === 25){
                        newplayers[playerindex].equipment.push(25);
                    }


                    setPlayers(newplayers);
                }

            }
        });

        return () => socket.off('pickup_item');

    }, [finishedLoading]);




    useEffect(() => {

        socket.on('nade_land', (event) =>{

            const object = JSON.parse(event);

            if(players.length > 0){

                const playerindex = players.findIndex(player => player.player_steamid === object.invoker_id);

                if(playerindex !== -1){

                    const newplayers = [...players];

                    console.log(newplayers)


                    // HE HeGrenade
                    if(object.nade_type === 'weapon_hegrenade'){

                        const filtered = newplayers[playerindex].equipment.filter(equip => equip !== 4);
                        newplayers[playerindex].equipment  = [...filtered];
                    }


                    // Smoke grenade
                    if(object.nade_type === 'weapon_smokegrenade'){

                        const filtered = newplayers[playerindex].equipment.filter(equip => equip !== 9);
                        newplayers[playerindex].equipment  = [...filtered];
                    }


                    // Flesh grenade
                    if(object.nade_type === 'weapon_flashbang'){

                        const exists = newplayers[playerindex].equipment.find(item => item === 25);

                        if(exists){
                            // User can have two flashbangs
                            // Find first element of flashbang
                            const id = newplayers[playerindex].equipment.findIndex(equip => equip === 25);

                            // Remove first element
                            newplayers[playerindex].equipment.splice(id,1); 
                        }
                    }


                    setPlayers(newplayers);
                }

            }
        });

        return () => socket.off('pickup_item');

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
                                <img src={require(`../../screen/resources/images/unknown-user.png`)} alt="user" />
                            </div>
                            <div className={`equipment-left-${i}`}>
                                {player.c4 && 
                                    <img src={require(`../../screen/resources/images/6.png`)} alt="c4"></img>}
                            </div>
                            <div className={`utility-left-${i}`}>

                                {
                                    player.equipment.map((item, index)=>{
                                        return <img key={index} src={require(`../../screen/resources/images/${item}.png`)} alt="equipment"></img>
                                    })
                                }
                                
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