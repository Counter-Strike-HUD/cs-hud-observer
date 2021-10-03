import React, {useEffect} from 'react';
import socketio from "socket.io-client";
import create from 'zustand';
import api from '../../screen/api/api';

export const socket = socketio.connect('localhost:4000', {withCredentials: true});

// Emit back that hud is present
socket.on('connect', () =>{
    socket.emit('hud_socket');
})


// Log all socket messages
socket.onAny((event, msg) =>{
    console.log(event, msg)
})



export const useHudStore = create(set => ({

    // Teamscores
    team1_score: 0,
    team2_score: 0,

    // Half
    half: 'first',

    // Teams
    tt_players: [],
    ct_players: [],

    kills: [],


    initLeftTeam: (playerInfo) => set(state => ({tt_players: [...playerInfo]})),
    initRightTeam: (playerInfo) => set(state => ({ct_players: [...playerInfo]})), 

    setKill: (kill) => set(state => ({kills: [...state.kills, kill]})),

    updateTeam1Score: () => set(state => ({team1_score: state.team1_score + 1})),
    updateTeam2Score: () => set(state => ({team2_score: state.team2_score + 1})), 


}))

let renderCount = 0

export const SocketStoreComponent = ({teamLeft, teamRight}) =>{

    renderCount += 1;
    console.log(`SocketStoreComponent renderCount: `, renderCount);

    const addTeamLeft = useHudStore(state => state.initLeftTeam);
    const addTeamRight = useHudStore(state => state.initRightTeam);

    const setKill = useHudStore(state => state.setKill);

    const team1Score = useHudStore(state => state.updateTeam1Score);
    const team2Score = useHudStore(state => state.updateTeam2Score);

    const leftPlayers = useHudStore(state => state.tt_players);
    const rightPlayers = useHudStore(state => state.ct_players);


    useEffect(() => {

        // Temp holder of player left
        let tempPlayersLeft = [];

        // Map backend info
        teamLeft.map((playerid, index) =>{

            // Get specific info for the tt players
            api.players.getPlayer(playerid).then(p =>{

                const playerinfo = {
                    current_weapon: '17',
                    primary_weapon: null,
                    secondary_weapon: '17',
                    primary_ammo_current: 0,
                    secondary_ammo_current: 20,
                    primary_ammo_reserve: 0,
                    secondary_ammo_reserve: 40,
                    health: 100,
                    equipment: [],
                    c4: false,
                    small_kevlar: false,
                    full_kevlar: false,
                    dead: false,
                    money: 0,
                    spectate: false
                };

   
                tempPlayersLeft.push({...p.player_info, ...playerinfo})

                if(index === teamLeft.length - 1){

                    addTeamLeft(tempPlayersLeft);
            
                }
            })
        })
    }, [teamLeft]);



    useEffect(() => {

        // Temp holder of player left
        let tempPlayersRight = [];

        teamRight.map((playerid, index) =>{

            api.players.getPlayer(playerid).then(p =>{

                const playerinfo = {
                    current_weapon: '16',
                    primary_weapon: null,
                    secondary_weapon: '16',
                    primary_ammo_current: 0,
                    secondary_ammo_current: 12,
                    primary_ammo_reserve: 0,
                    secondary_ammo_reserve: 24,
                    health: 100,
                    equipment: [],
                    defuse: false,
                    small_kevlar: false,
                    full_kevlar: false,
                    dead: false,
                    money: 0,
                    spectate: p.player_info.player_steamid === "STEAM_0:1:115179770" ? true : false
                };


               
                tempPlayersRight.push({...p.player_info, ...playerinfo})

                if(index === teamRight.length - 1){

                    addTeamRight(tempPlayersRight);

                }
            })
        })
    }, [teamRight]);




    useEffect(() =>{

        socket.on('weapon_switched', (event) =>{

            const object = JSON.parse(event);

            if(leftPlayers.length > 0){

                const playerindex = leftPlayers.findIndex(player => player.player_steamid === object.user_pick_id);
        
                if(playerindex !== -1){
        
                    const newplayers = [...leftPlayers];
                    
                    newplayers[playerindex].current_weapon = object.weapon_id;
        
                    addTeamLeft(newplayers);
                }
        
            }

        });
        

            
        socket.on('weapon_switched', (event) =>{

            const object = JSON.parse(event);

            if(rightPlayers.length > 0){
        
                const playerindex = rightPlayers.findIndex(player => player.player_steamid === object.user_pick_id);
        
                if(playerindex !== -1){
        
                    const newplayers = [...rightPlayers];
                    
                    newplayers[playerindex].current_weapon = object.weapon_id;
        
                    addTeamRight(newplayers);
                }
        
            }
        });

        
        /**
         * Listen for c4 tt player pickup
         */
        socket.on('c4_pick', (event) =>{

            const object = JSON.parse(event);

            if(leftPlayers.length > 0){

                const playerindex = leftPlayers.findIndex(player => player.player_steamid === object.user_pick_id);
        
                if(playerindex !== -1){
        
                    const newplayers = [...leftPlayers];
                    
                    newplayers[playerindex].c4 = true;
        
                    addTeamLeft(newplayers);
                }
        
            }

        });


        /**
         * Listen for c4 tt player pickup
         */
        socket.on('c4_drop', (event) =>{

            const object = JSON.parse(event);

            if(leftPlayers.length > 0){

                const playerindex = leftPlayers.findIndex(player => player.player_steamid === object.user_drop_id);
        
                if(playerindex !== -1){
        
                    const newplayers = [...leftPlayers];
                    
                    newplayers[playerindex].c4 = false;
        
                    addTeamLeft(newplayers);
                }
        
            }

        });

        /**
         * Listen for plant event
         */
        socket.on('c4_planted', (event) =>{

            const object = JSON.parse(event);

            if(leftPlayers.length > 0){

                const playerindex = leftPlayers.findIndex(player => player.player_steamid === object.plant_invoker_id);
        
                if(playerindex !== -1){

                    const newplayers = [...leftPlayers];
                    
                    newplayers[playerindex].c4 = false;
        
                    addTeamLeft(newplayers);
                }
        
            }

        });


        /**
         * Listen for equipment buy
         */
        socket.on('buy_equipment', (event) =>{

            const object = JSON.parse(event);
        
            if(leftPlayers.length > 0){
        
                const playerindex = leftPlayers.findIndex(player => player.player_steamid === object.weapon_buyer);
        
                if(playerindex !== -1){
        
                    const newplayers = [...leftPlayers];
    
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
        
                   addTeamLeft(newplayers);
                }
        
            }


            if(rightPlayers.length > 0){
        
                const playerindex = rightPlayers.findIndex(player => player.player_steamid === object.weapon_buyer);
        
                if(playerindex !== -1){
        
                    const newplayers = [...rightPlayers];
    
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
        
                   addTeamRight(newplayers);
                }
        
            }
        });


        socket.on('damage', (event) =>{

            const object = JSON.parse(event);
        
            if(leftPlayers.length > 0){
        
                const playerindex = leftPlayers.findIndex(player => player.player_steamid === object.victim_id);
        
                if(playerindex !== -1){
        
                    const newplayers = [...leftPlayers];
                
                    newplayers[playerindex].health = object.health;
        
                    addTeamLeft(newplayers);
                }
        
            }

            if(rightPlayers.length > 0){
        
                const playerindex = rightPlayers.findIndex(player => player.player_steamid === object.victim_id);
        
                if(playerindex !== -1){
        
                    const newplayers = [...rightPlayers];
                
                    newplayers[playerindex].health = object.health;
        
                    addTeamRight(newplayers);
                }
            }
        });


        socket.on('pickup_item', (event) =>{

            const object = JSON.parse(event);
        
            if(leftPlayers.length > 0){
        
                const playerindex = leftPlayers.findIndex(player => player.player_steamid === object.user_id);
        
                if(playerindex !== -1){
        
                    const newplayers = [...leftPlayers];
        
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
        
        
                    addTeamLeft(newplayers);
                }
            }


            if(rightPlayers.length > 0){
        
                const playerindex = rightPlayers.findIndex(player => player.player_steamid === object.user_id);
        
                if(playerindex !== -1){
        
                    const newplayers = [...rightPlayers];
        
        
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
        
        
                    addTeamRight(newplayers);
                }
            }
        });


        socket.on('kill', (event) =>{

            const object = JSON.parse(event);

            const findattackertt = leftPlayers.find(player => player.player_steamid === object.killer_id);
            const findattackerct = rightPlayers.find(player => player.player_steamid === object.killer_id);

            let attacker = {};
            let victim = {};

            if(findattackertt){
                attacker = {...findattackertt, side: 'tt'};
            }

            if(findattackerct){
                attacker = {...findattackerct, side: 'ct'};
            }

            const findvictimtt = leftPlayers.find(player => player.player_steamid === object.victim_id);
            const findvictimct = rightPlayers.find(player => player.player_steamid === object.victim_id);

            if(findvictimtt){
                victim = {...findvictimtt, side: 'tt'};
            }

            if(findvictimct){
                victim = {...findvictimct, side: 'ct'};
            }


            setKill({...object, attacker, victim});


            if(leftPlayers.length > 0){
        
                const playerindex = leftPlayers.findIndex(player => player.player_steamid === object.victim_id);
        
                if(playerindex !== -1){


                    const newplayers = [...leftPlayers];
                
                    newplayers[playerindex].health = 0;
                    newplayers[playerindex].dead = true;
                    newplayers[playerindex].current_weapon = 0;
                    newplayers[playerindex].primary_weapon = 0;
                    newplayers[playerindex].secondary_weapon = 0;
                    newplayers[playerindex].primary_ammo_current = 0;
                    newplayers[playerindex].secondary_ammo_current = 0;
                    newplayers[playerindex].primary_ammo_reserv = 0;
                    newplayers[playerindex].secondary_ammo_reserve = 0;
                    newplayers[playerindex].equipment = [];
                    newplayers[playerindex].c4 = false;
                    newplayers[playerindex].small_kevlar = false;
                    newplayers[playerindex].full_kevlar = false;
        
                    addTeamLeft(newplayers);
                }
            }


            if(rightPlayers.length > 0){
        
                const playerindex = rightPlayers.findIndex(player => player.player_steamid === object.victim_id);
        
                if(playerindex !== -1){
        
                    const newplayers = [...rightPlayers];
                
                    newplayers[playerindex].health = 0;
                    newplayers[playerindex].dead = true;
                    newplayers[playerindex].current_weapon = 0;
                    newplayers[playerindex].primary_weapon = 0;
                    newplayers[playerindex].secondary_weapon = 0;
                    newplayers[playerindex].primary_ammo_current = 0;
                    newplayers[playerindex].secondary_ammo_current = 0;
                    newplayers[playerindex].primary_ammo_reserv = 0;
                    newplayers[playerindex].secondary_ammo_reserve = 0;
                    newplayers[playerindex].equipment = [];
                    newplayers[playerindex].c4 = false;
                    newplayers[playerindex].small_kevlar = false;
                    newplayers[playerindex].full_kevlar = false;
        
                    addTeamRight(newplayers);
                }
            }

        });
        

        socket.on('round_end', (event) =>{

            const object = JSON.parse(event);
        
            if(leftPlayers.length > 0){
        
                setTimeout(() =>{
        
                    leftPlayers.forEach((player, index) =>{
        
                        const newplayers = [...leftPlayers];
        
                        newplayers[index].dead = false;
                        newplayers[index].health = 100;
                        newplayers[index].current_weapon = 17;
        
                        addTeamLeft(newplayers);
                    });
        
                }, 5000);
            }

            if(rightPlayers.length > 0){
        
                setTimeout(() =>{
        
                    rightPlayers.forEach((player, index) =>{
        
                        const newplayers = [...rightPlayers];
        
                        newplayers[index].dead = false;
                        newplayers[index].health = 100;
                        newplayers[index].current_weapon = 16;
        
                        addTeamRight(newplayers);
                    });
        
                }, 5000);
            }
        });


        socket.on('nade_land', (event) =>{

            const object = JSON.parse(event);
        
            if(leftPlayers.length > 0){
        
                const playerindex = leftPlayers.findIndex(player => player.player_steamid === object.invoker_id);
        
                if(playerindex !== -1){
        
                    const newplayers = [...leftPlayers];
        
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
        
        
                    addTeamLeft(newplayers);
                }
            }

            if(rightPlayers.length > 0){
        
                const playerindex = rightPlayers.findIndex(player => player.player_steamid === object.invoker_id);
        
                if(playerindex !== -1){
        
                    const newplayers = [...rightPlayers];
        
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
        
        
                    addTeamRight(newplayers);
                }
            }

        });



        
    socket.on('money_change', (event) =>{

        const object = JSON.parse(event);

        if(leftPlayers.length > 0){

            const playerindex = leftPlayers.findIndex(player => player.player_steamid === object.user_id);

            if(playerindex !== -1){

                const newplayers = [...leftPlayers];

                newplayers[playerindex].money = object.current_money;

                addTeamLeft(newplayers);
            }

        }

        if(rightPlayers.length > 0){

            const playerindex = rightPlayers.findIndex(player => player.player_steamid === object.user_id);

            if(playerindex !== -1){

                const newplayers = [...rightPlayers];

                newplayers[playerindex].money = object.current_money;

                addTeamRight(newplayers);
            }

        }
    });
        
    socket.on('ammo_update', (event) =>{

        const object = JSON.parse(event);

        object.players.map((playerInfo) =>{

            if(leftPlayers.length > 0){

                const playerindex = leftPlayers.findIndex(player => player.player_steamid === playerInfo.player_id);

                if(playerindex !== -1){

                    const newplayers = [...leftPlayers];

                    if(playerInfo.weapon_type === 'primary'){
                        newplayers[playerindex].primary_ammo_current = playerInfo.current_ammo;
                        newplayers[playerindex].primary_ammo_reserve = playerInfo.ammo_reserve;
                    }


                    if(playerInfo.weapon_type === 'secondary'){
                        newplayers[playerindex].secondary_ammo_current = playerInfo.current_ammo;
                        newplayers[playerindex].secondary_ammo_reserve = playerInfo.ammo_reserve;
                    }
            

                    addTeamLeft(newplayers);
                }

            }

            if(rightPlayers.length > 0){

                const playerindex = rightPlayers.findIndex(player => player.player_steamid === playerInfo.player_id);

                if(playerindex !== -1){

                    const newplayers = [...rightPlayers];

                    
                    if(playerInfo.weapon_type === 'primary'){
                        newplayers[playerindex].primary_ammo_current = playerInfo.current_ammo;
                        newplayers[playerindex].primary_ammo_reserve = playerInfo.ammo_reserve;
                    }


                    if(playerInfo.weapon_type === 'secondary'){
                        newplayers[playerindex].secondary_ammo_current = playerInfo.current_ammo;
                        newplayers[playerindex].secondary_ammo_reserve = playerInfo.ammo_reserve;
                    }
            

                    addTeamRight(newplayers);
                }

            }
        })
    });   


    socket.on('round_end', (event) =>{

        const object = JSON.parse(event);

        if(object.side_win === 'TT') team1Score();
        if(object.side_win === 'CT') team2Score();

    });
        

        return () => socket.removeAllListeners();

    }, [leftPlayers, rightPlayers]);


    // Return null, we are not rendering nothing
    return null;

}







/*








*/

