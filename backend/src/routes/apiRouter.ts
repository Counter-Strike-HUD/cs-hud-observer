import express from 'express';
const router = express.Router();

import db from '../db/database';

import * as apiModel from '../models/apiModel';

interface Team {
    team_name: string;
    team_short_name: string;
    team_logo_name: string
}

// Serve default api response 
router.get('/', (req , res, next) =>{
    res.json({
        "status_code": 200,
        "message": "Default API page, see app documentation."
    });    
});

// Get teams
router.get('/teams', (req , res, next) =>{

    const teams: ArrayLike<Team> = db.get('teams').value();

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

// Add team
router.get('/view/team/:id', (req , res) =>{

    const team = apiModel.parseClanView(req.params.id);

    if(!team){
        return res.status(404).json({'status_code': 404, 'message': 'Team not found.'})  
    }

    return res.status(200).json({'id': req.params.id, 'status_code': 200, 'message': 'Team is successfully found.', 'team_info': team}) 
});

// Add team
router.post('/editclan', (req , res) =>{


    if(apiModel.parseClanEdit(req.body.id, req.body)){
        return res.status(200).json({'id': req.body.id, 'status_code': 200, 'message': 'Team is successfully added.'}) 
    }

    return res.status(500).json({'status_code': 500, 'message': 'Team is not added.'})   
});



// 404 not found api route
router.get('*', (req, res) =>{
    return res.status(404).json({
        "status_code": 404,
        "message": "Unknown route.",
    });
});


export default router;