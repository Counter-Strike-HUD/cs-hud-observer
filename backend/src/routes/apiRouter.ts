import express from 'express';
const router = express.Router();

import db from '../db/database';

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
router.post('/addclan', (req , res, next) =>{

    console.log(req.body)

    return res.json({'test':'test'})   
});



// 404 not found api route
router.get('*', (req, res) =>{
    return res.status(404).json({
        "status_code": 404,
        "message": "Unknown route.",
    });
});


export default router;