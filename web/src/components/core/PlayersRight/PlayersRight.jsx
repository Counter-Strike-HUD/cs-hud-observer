import React, {useState, useEffect, useContext} from 'react';
import * as api from '../../screen/api/api';
import {SocketContext} from '../Socket/Socket';


const PlayersRight = ({playersList}) =>{

    const [players, setPlayers] = useState([]);
    const [finishedLoading, setFinishedLoading] = useState(false);


    const socket = useContext(SocketContext);


    useEffect(() => {

        playersList.map((playerid, index) =>{

            api.players.getPlayer(playerid).then(p =>{

                const playerinfo = {
                    current_weapon: '16',
                    primary_weapon: null,
                    secondary_weapon: '16',
                    health: 100,
                    equipment: [],
                    defuse: false,
                    small_kevlar: false,
                    full_kevlar: false,
                    dead: false,
                    money: 0
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

        socket.on('buy_equipment', (event) =>{

            const object = JSON.parse(event);

            if(players.length > 0){

                const playerindex = players.findIndex(player => player.player_steamid === object.weapon_buyer);

                if(playerindex !== -1){

                    const newplayers = [...players];
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

                        // defuse
                        case 33:
                            newplayers[playerindex].defuse = true;
                        break;
                    
                        default:
                            break;
                    }

                    setPlayers(newplayers);
                }

            }
        });

        return () => socket.off('buy_equipment');

    }, [finishedLoading]);



    useEffect(() => {

        socket.on('damage', (event) =>{

            const object = JSON.parse(event);

            console.log('received damage')

            if(players.length > 0){

                const playerindex = players.findIndex(player => player.player_steamid === object.victim_id);

                if(playerindex !== -1){

                    console.log('found')

                    const newplayers = [...players];
                
                    newplayers[playerindex].health = object.health;

                    setPlayers(newplayers);
                }

            }
        });

        return () => socket.off('damage');

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

        socket.on('round_end', (event) =>{

            const object = JSON.parse(event);

            if(players.length > 0){


                setTimeout(() =>{

                    players.forEach((player, index) =>{

                        const newplayers = [...players];

                        newplayers[index].dead = false;
                        newplayers[index].health = 100;

                        setPlayers(newplayers);
                    });

                }, 5000);
             
            }
        });

        return () => socket.off('round_end');

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


    useEffect(() => {

        socket.on('kill', (event) =>{

            const object = JSON.parse(event);

            if(players.length > 0){

                const playerindex = players.findIndex(player => player.player_steamid === object.victim_id);

                if(playerindex !== -1){

                    const newplayers = [...players];
                
                    newplayers[playerindex].health = 0;
                    newplayers[playerindex].dead = true;
                    newplayers[playerindex].current_weapon = 0;
                    newplayers[playerindex].primary_weapon = 0;
                    newplayers[playerindex].secondary_weapon = 0;
                    newplayers[playerindex].equipment = [];
                    newplayers[playerindex].defuse = false;
                    newplayers[playerindex].small_kevlar = false;
                    newplayers[playerindex].full_kevlar = false;

                    setPlayers(newplayers);
                }

            }
        });

        return () => socket.off('kill');

    }, [finishedLoading]);



    useEffect(() => {

        socket.on('money_change', (event) =>{

            const object = JSON.parse(event);

            if(players.length > 0){

                const playerindex = players.findIndex(player => player.player_steamid === object.user_id);

                if(playerindex !== -1){

                    const newplayers = [...players];
                    newplayers[playerindex].money = object.current_money;
                    setPlayers(newplayers);
                }

            }
        });

        return () => socket.off('money_change');

    }, [finishedLoading]);


    return(
        <React.Fragment>
            {
                players && players.map((player, index)=>{

                    const i = index + 1;
                    
                  return  (
                    <div key={i} className={`right-player-${i}`}>

                    {!player.dead &&
                        <div className={`health-player-right-${i}`} style={{backgroundImage: `linear-gradient(to left, rgba(68, 71, 253, 1) ${player.health}%, rgba(48,54,97,1) ${player.health}%, rgba(48,54,97,1) 100%)`, }}>
                            <div className={`nick-right-${i}`}>
                                {player.player_nickname}
                            </div>
                            <div className={`armor-right-${i}`}>
                                {player.small_kevlar && <img src={require(`../../screen/resources/images/31.png`)} alt="full"></img>}
                                {player.full_kevlar && <img src={require(`../../screen/resources/images/32.png`)} alt="full"></img>}
                            </div>
                            <div className={`health-number-right-${i}`}>
                                {player.health}
                            </div>
                        </div>}
                    
                    {player.dead &&

                        <div className={`health-player-right-${i} dead`} style={{backgroundImage: `linear-gradient(90deg, rgba(85,85,85,0.3701855742296919) 0%, rgba(85,85,85,0.773546918767507) 35%, rgba(85,85,85,1) 100%, rgba(85,85,85,1) 100%)`}}>
                            <div className={`nick-right-${i}`}>
                                {player.player_nickname}
                            </div>
                        </div>
                    }
                    
                    {!player.dead &&
                        <div className={`player-info-right-${i}`}>
                            <div className={`avatar-right-${i}`}>
                                <img src={require(`../../screen/resources/images/unknown-user.png`)} alt="user" />
                            </div>
                            <div className={`equipment-right-${i}`}>
                                {player.defuse && 
                                    <img src={require(`../../screen/resources/images/33.png`)} alt="defuse"></img>}
                            </div>
                            <div className={`utility-right-${i}`}>

                                { 
                                    player.equipment.map((item, index)=>{
                                        return <img key={index} src={require(`../../screen/resources/images/${item}.png`)} alt="equipment"></img>
                                    })
                                }
                                
                            </div>
                            <div className={`weapon-right-${i}`}>
                                {player.current_weapon && 
                                <img src={require(`../../screen/resources/images/${players[index].current_weapon}.png`)} alt="full"></img> }
                            </div>
                        </div>}

                        {player.dead &&

                            <div className={`player-info-right-${i}`} style={{backgroundImage: `linear-gradient(90deg, rgba(85,85,85,0.3701855742296919) 0%, rgba(85,85,85,0.773546918767507) 35%, rgba(85,85,85,1) 100%, rgba(85,85,85,1) 100%)`}}>
                                <div className={`avatar-right-${i}`}>
                                    <img src={require(`../../screen/resources/images/skull.png`)} alt="user" />
                                </div>

                                <div className={`weapon-right-${i}`}>
                                    <strong style={{color: 'white'}}>$ {player.money}</strong>
                                </div>
                            </div>}
                </div>
                   )
                })
            }
            
           
        </React.Fragment>
    );
}

export default PlayersRight;