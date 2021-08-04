import express from 'express';
import net from 'net';
import {io} from 'socket.io-client';
import config from '../../../config.json';
const router = express.Router();
import * as apiModel from '../models/apiModel';
import {ClientSocket} from '../handler/server';


const socket = io(`http://localhost:${config.INTERNAL_SOCKET_PORT}`);


// Emit that backend is connected
socket.emit('backend_connect');


// Serve default api response 
router.get('/', (req , res, next) =>{
    res.json({
        "status_code": 200,
        "message": "Default API page, see app documentation."
    });    
});

// Get teams
router.get('/teams', (req , res, next) =>{

    const teams = apiModel.getAllClans();

    res.json({
        "status_code": 200,
        "message": "Team list.",
        "teams": teams
    });    
});

// Add team
router.post('/addclan', (req , res) =>{

    const id: string = apiModel.generateUniqueID();

    if(apiModel.parseClanAdd(id, req.body)){
        return res.status(200).json({'id': id, 'status_code': 200, 'message': 'Team is successfully added.'}) 
    }

    return res.status(500).json({'status_code': 500, 'message': 'Team is not added.'})   
});

// View team
router.get('/view/team/:id', (req , res) =>{

    const team = apiModel.parseClanView(req.params.id);

    if(!team){
        return res.status(404).json({'status_code': 404, 'message': 'Team not found.'})  
    }

    return res.status(200).json({'id': req.params.id, 'status_code': 200, 'message': 'Team is successfully found.', 'team_info': team}) 
});

// Edit team
router.post('/editclan', (req , res) =>{

    if(apiModel.parseClanEdit(req.body.id, req.body)){
        return res.status(200).json({'id': req.body.id, 'status_code': 200, 'message': 'Team is successfully added.'}) 
    }

    return res.status(500).json({'status_code': 500, 'message': 'Team is not edited.'})   
});


// Get players
router.get('/players', (req , res, next) =>{

    const players = apiModel.getAllPlayers();

    res.json({
        "status_code": 200,
        "message": "Players list.",
        "players": players ? players : [],
        "steam_key": config.auth.STEAM_API_KEY,
    }); 

});



// Add player
router.post('/addplayer', (req , res) =>{

    const id: string = apiModel.generateUniqueID();

    if(apiModel.parsePlayerAdd(id, req.body)){
        return res.status(200).json({'id': id, 'status_code': 200, 'message': 'Player is successfully added.'}) 
    }

    return res.status(500).json({'status_code': 500, 'message': 'Player is not added.'})   

});

// View player
router.get('/view/player/:id', (req , res) =>{

    const player = apiModel.parsePlayerView(req.params.id);

    if(!player){
        return res.status(404).json({'status_code': 404, 'message': 'Player not found.'})  
    }

    return res.status(200).json({'id': req.params.id, 'status_code': 200, 'message': 'Player is successfully found.', 'player_info': player}) 
});

// Edit player
router.post('/editplayer', (req , res) =>{

    if(apiModel.parsePlayerEdit(req.body.id, req.body)){
        return res.status(200).json({'id': req.body.id, 'status_code': 200, 'message': 'Player is successfully edited.'}) 
    }

    return res.status(500).json({'status_code': 500, 'message': 'Player is not edited.'})   
});



// Get players
router.get('/matches', (req , res, next) =>{

    const matches = apiModel.getAllMatches();

    res.json({
        "status_code": 200,
        "message": "Matches list.",
        "matches": matches ? matches : [],
    }); 

});


router.post('/matches/info', (req , res, next) =>{

    const team_one = apiModel.parseClanView(req.body.team_one);
    const team_two = apiModel.parseClanView(req.body.team_two);

    res.json({
        "status_code": 200,
        "message": "Matches teams info.",
        "team_one": team_one,
        "team_two": team_two,
    }); 

});

// View match
router.get('/view/match/:id', (req , res) =>{

    const match = apiModel.parseMatchView(req.params.id);

    if(!match){
        return res.status(404).json({'status_code': 404, 'message': 'Match not found.'})  
    }

    return res.status(200).json({'id': req.params.id, 'status_code': 200, 'message': 'Match is successfully found.', 'match_info': match}) 
});


// Add mathch
router.post('/addmatch', (req , res) =>{

    const id: string = apiModel.generateUniqueID();

    if(apiModel.parseMatchAdd(id, req.body)){
        return res.status(200).json({'id': id, 'status_code': 200, 'message': 'Match is successfully added.'}) 
    }

    return res.status(500).json({'status_code': 500, 'message': 'Match is not added.'})   

});


// Edit match
router.post('/editmatch', (req , res) =>{

    if(apiModel.parseMatchEdit(req.body.id, req.body)){
        return res.status(200).json({'id': req.body.id, 'status_code': 200, 'message': 'Match is successfully edited.'}) 
    }

    return res.status(500).json({'status_code': 500, 'message': 'Match is not edited.'})   
});


// Edit match
router.post('/socketconnect', (req , res) =>{

    // Destruct object
    const {address, port, token} = req.body;


    // Check if address string is valid
    if(net.isIP(address) === 0){
        return res.status(400).json({'status_code': 400, "message": "IP address is invalid"});
    }

    const portint = parseInt(port);

    if(portint === NaN){
        return res.status(400).json({'status_code': 400, "message": "Port must be a number"});
    }


    console.log(portint)

    // Check if port is in range
    if(portint < 0 || portint > 65536){
        return res.status(400).json({'status_code': 400, "message": "Port must be in a range of 0 - 65536"});
    }

    const gamesocket = new ClientSocket(address, portint, token, socket);


    // Internal state holder
    let state = {
        connected: false,
        authed: false,
    }


    // Try to connect to remote game socket
    gamesocket._connect((status: boolean | string) =>{

        console.log('callback connected', status)

        socket.emit('game_connected', true);
    });


    // Try to connect to remote game socket
    gamesocket._auth((status: boolean ) =>{

        console.log('callback auth', status)

        console.log(status)

        // Set connected state
        state.authed = status;

        // Emit 
        socket.emit('game_authed', status)

        return;

    });


    // Respond after 5 s to request
    setTimeout(() =>{
        return res.status(200).json({'status_code': 200, 'connection': state.connected, 'auth': state.authed, 'message': 'Successfully connected to the remote game socket.'})
    }, 5000); 
});




// 404 not found api route
router.get('*', (req, res) =>{
    return res.status(404).json({
        "status_code": 404,
        "message": "Unknown route.",
    });
});



export default router;