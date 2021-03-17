import express from 'express';
import config from '../../../config.json';
const router = express.Router();
import * as apiModel from '../models/apiModel';


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




// 404 not found api route
router.get('*', (req, res) =>{
    return res.status(404).json({
        "status_code": 404,
        "message": "Unknown route.",
    });
});


export default router;