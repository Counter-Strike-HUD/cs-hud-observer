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

    // Teams
    tt_players: [],
    ct_players: [],


    initLeftTeam: (playerInfo) => set(state => ({tt_players: [...playerInfo]})),
    initRightTeam: (playerInfo) => set(state => ({ct_players: [...playerInfo]})), 

}))


export const SocketStoreComponent = ({teamLeft, teamRight}) =>{

    const addTeamLeft = useHudStore(state => state.initLeftTeam);
    const addTeamRight = useHudStore(state => state.initRightTeam);


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
                    health: 100,
                    equipment: [],
                    c4: false,
                    small_kevlar: false,
                    full_kevlar: false,
                    dead: false,
                    money: 0
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
                    health: 100,
                    equipment: [],
                    defuse: false,
                    small_kevlar: false,
                    full_kevlar: false,
                    dead: false,
                    money: 0
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

        
    }, [socket]);


    // Return null, we are not rendering nothing
    return null;

}







/*







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
            
                default:
                    break;
            }

            setPlayers(newplayers);
        }

    }
});






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
            newplayers[playerindex].c4 = false;
            newplayers[playerindex].small_kevlar = false;
            newplayers[playerindex].full_kevlar = false;

            setPlayers(newplayers);
        }

    }
});



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
*/

