import React, {useContext, useState, useEffect} from 'react';
import * as api from '../../screen/api/api';
import {SocketContext} from '../Socket/Socket';

const PlayerObserved = ({players}) =>{

    const [playersInfo, setPlayersInfo] = useState([]);
    const [spectate, setSpectate] = useState(0);
    const [finishedLoading, setFinishedLoading] = useState(false);

    const socket = useContext(SocketContext);


    useEffect(() => {

        players.map((playerid, index) =>{

            api.players.getPlayer(playerid).then(p =>{

                const playerinfo = {
                    current_weapon: '16',
                    primary_weapon: null,
                    secondary_weapon: '16',
                    health: 100,
                    equipment: [],
                    defuse: false,
                    c4: false,
                    small_kevlar: false,
                    full_kevlar: false,
                    dead: false,
                    money: 0
                };

                setPlayersInfo(player => [...player, {...p.player_info, ...playerinfo}]);

                if(index === players.length - 1){
                    setFinishedLoading(true);
                    setSpectate(5);
                }
            })
        })

    }, [players]);



    useEffect(() => {

        socket.on('weapon_switched', (event) =>{

            const object = JSON.parse(event);

            if(playersInfo.length > 0){

                const playerindex = playersInfo.findIndex(player => player.player_steamid === object.user_pick_id);

                console.log(playerindex);

                if(playerindex !== -1){

                    const newplayers = [...playersInfo];
                    
                    newplayers[playerindex].current_weapon = object.weapon_id;

                    setPlayersInfo(newplayers);
                }

            }
        });

        return () => socket.off('weapon_switched');

    }, [finishedLoading]);



    useEffect(() => {

        socket.on('c4_pick', (event) =>{

            const object = JSON.parse(event);

            if(playersInfo.length > 0){

                const playerindex = playersInfo.findIndex(player => player.player_steamid === object.user_pick_id);

                if(playerindex !== -1){

                    const newplayers = [...playersInfo];

                    console.log(newplayers)
                    
                    newplayers[playerindex].c4 = true;

                    setPlayersInfo(newplayers);
                }

            }
        });

        return () => socket.off('c4_pick');

    }, [finishedLoading]);



    useEffect(() => {

        socket.on('c4_drop', (event) =>{

            const object = JSON.parse(event);

            if(playersInfo.length > 0){

                const playerindex = playersInfo.findIndex(player => player.player_steamid === object.user_drop_id);

                if(playerindex !== -1){

                    const newplayers = [...playersInfo];
                    console.log(newplayers)
                    newplayers[playerindex].c4 = false;

                    setPlayersInfo(newplayers);
                }

            }
        });

        return () => socket.off('c4_drop');

    }, [finishedLoading]);



    useEffect(() => {

        socket.on('c4_planted', (event) =>{

            const object = JSON.parse(event);

            if(playersInfo.length > 0){

                const playerindex = playersInfo.findIndex(player => player.player_steamid === object.plant_invoker_id);

                if(playerindex !== -1){

                    const newplayers = [...playersInfo];
                    console.log(newplayers)
                    newplayers[playerindex].c4 = false;

                    setPlayersInfo(newplayers);
                }

            }
        });

        return () => socket.off('c4_planted');

    }, [finishedLoading]);



    useEffect(() => {

        socket.on('buy_equipment', (event) =>{

            const object = JSON.parse(event);

            if(playersInfo.length > 0){

                const playerindex = playersInfo.findIndex(player => player.player_steamid === object.weapon_buyer);

                if(playerindex !== -1){

                    const newplayers = [...playersInfo];
                    console.log(newplayers)


                    switch (object.weapon_id) {

                        // small kevlar
                        case 31:
                                newplayers[playerindex].small_kevlar = true;
                            break;

                        // full 
                        case 32:
                                newplayers[playerindex].full_kevlar = true;
                            break;
                    
                        default:
                            break;
                    }

                    setPlayersInfo(newplayers);
                }

            }
        });

        return () => socket.off('buy_equipment');

    }, [finishedLoading]);



    useEffect(() => {

        socket.on('damage', (event) =>{

            const object = JSON.parse(event);

            console.log('received damage')

            if(playersInfo.length > 0){

                const playerindex = playersInfo.findIndex(player => player.player_steamid === object.victim_id);

                if(playerindex !== -1){

                    console.log('found')

                    const newplayers = [...playersInfo];
                
                    newplayers[playerindex].health = object.health;

                    setPlayersInfo(newplayers);
                }

            }
        });

        return () => socket.off('damage');

    }, [finishedLoading]);




    useEffect(() => {

        socket.on('pickup_item', (event) =>{

            const object = JSON.parse(event);

            if(playersInfo.length > 0){

                const playerindex = playersInfo.findIndex(player => player.player_steamid === object.user_id);

                if(playerindex !== -1){

                    const newplayers = [...playersInfo];

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


                    setPlayersInfo(newplayers);
                }

            }
        });

        return () => socket.off('pickup_item');

    }, [finishedLoading]);



    useEffect(() => {

        socket.on('round_end', (event) =>{

            const object = JSON.parse(event);

            if(playersInfo.length > 0){


                setTimeout(() =>{

                    playersInfo.forEach((player, index) =>{

                        const newplayers = [...playersInfo];

                        newplayers[index].dead = false;
                        newplayers[index].health = 100;

                        setPlayersInfo(newplayers);
                    });

                }, 5000);
             
            }
        });

        return () => socket.off('round_end');

    }, [finishedLoading]);



    useEffect(() => {

        socket.on('nade_land', (event) =>{

            const object = JSON.parse(event);

            if(playersInfo.length > 0){

                const playerindex = playersInfo.findIndex(player => player.player_steamid === object.invoker_id);

                if(playerindex !== -1){

                    const newplayers = [...playersInfo];

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


                    setPlayersInfo(newplayers);
                }

            }
        });

        return () => socket.off('pickup_item');

    }, [finishedLoading]);


    useEffect(() => {

        socket.on('kill', (event) =>{

            const object = JSON.parse(event);

            if(playersInfo.length > 0){

                const playerindex = playersInfo.findIndex(player => player.player_steamid === object.victim_id);

                if(playerindex !== -1){

                    const newplayers = [...playersInfo];
                
                    newplayers[playerindex].health = 0;
                    newplayers[playerindex].dead = true;
                    newplayers[playerindex].current_weapon = 0;
                    newplayers[playerindex].primary_weapon = 0;
                    newplayers[playerindex].secondary_weapon = 0;
                    newplayers[playerindex].equipment = [];
                    newplayers[playerindex].c4 = false;
                    newplayers[playerindex].small_kevlar = false;
                    newplayers[playerindex].full_kevlar = false;

                    setPlayersInfo(newplayers);
                }

            }
        });

        return () => socket.off('kill');

    }, [finishedLoading]);



    useEffect(() => {

        socket.on('money_change', (event) =>{

            const object = JSON.parse(event);

            if(playersInfo.length > 0){

                const playerindex = playersInfo.findIndex(player => player.player_steamid === object.user_id);

                if(playerindex !== -1){

                    const newplayers = [...playersInfo];
                    newplayers[playerindex].money = object.current_money;
                    setPlayersInfo(newplayers);
                }

            }
        });

        return () => socket.off('money_change');

    }, [finishedLoading]);



    return(
        <React.Fragment>

            {!finishedLoading &&
                <React.Fragment>
                    <div className="player-spectaded-upper-layer">
        
                        <div className="player-spectaded-name">
                            Player
                        </div>

                        <div className="player-spectaded-health">
                            + 100
                        </div>

                        <div className="player-spectaded-gear">
                        
                        </div>
                    </div>

                    <div className="player-spectaded-down-layer">
                            
                        <div className="player-spectaded-utility">
                            {/*
                            <img src={FlashGrenade} alt="full"></img>
                            <img src={SmokeGrenade} alt="full"></img>
                            <img src={HeGrenade} alt="full"></img>*/}
                        </div>

                        <div className="player-spectaded-avatar">
                            {/*<img src={User} alt="user" />*/}
                        </div>
                    </div>
                </React.Fragment>
            }


            {finishedLoading && playersInfo.length >= spectate &&
                <React.Fragment>
                    <div className="player-spectaded-upper-layer">

                        <div className="player-spectaded-name">
                            {playersInfo[spectate].player_nickname}
                        </div>

                        <div className="player-spectaded-health">
                            + {playersInfo[spectate].health}
                        </div>

                        <div className="player-spectaded-gear">
                            { 
                                playersInfo[spectate].equipment.map((item, index)=>{
                                    return <img key={index} src={require(`../../screen/resources/images/${item}.png`)} alt="equipment"></img>
                                })
                            }
                        </div>
                    </div>

                    <div className="player-spectaded-down-layer">
                        
                        <div className="player-spectaded-utility">
                            {/*
                            <img src={FlashGrenade} alt="full"></img>
                            <img src={SmokeGrenade} alt="full"></img>
                            <img src={HeGrenade} alt="full"></img>*/}
                        </div>

                        <div className="player-spectaded-avatar">
                            {/*<img src={User} alt="user" />*/}
                        </div>
                    </div>
                </React.Fragment>
            }

        </React.Fragment>
    );
}

export default PlayerObserved;