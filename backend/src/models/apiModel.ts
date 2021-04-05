import crypto from 'crypto';
import fs from 'fs';
import db from '../db/database';
import path from 'path';

interface BodyBase {
    'team_name': string;
    'team_short_name': string;
    'team_country_code': string;
    'team_description': string;   
}

interface TeamAdd extends BodyBase{
    'team_logo': string;
}

interface Values extends BodyBase{
    'id': string;
    'team_logo_name': string;
}

interface Teams {
    team_name: string;
    team_short_name: string;
    team_logo_name: string
}

interface Players {
    id: string;
    player_name: string;
    player_nickname: string;
    player_lastname: string;
}

interface PlayerAddBody{
    player_name: string;
    player_nickname: string;
    player_lastname: string;
    player_countrycode: string;
    player_steamid: string;
    player_teamid: string;
    player_description: string;
    player_age: string;
}

interface PlayerAdd extends PlayerAddBody{
    id: string;
}

interface MatchesBody {
    team_one: string;
    team_two: string;
    status: 'ongoing'| 'finished' | 'live';
    match_type: string;
    team_one_players: string[];
    team_two_players: string[];
}


interface Matches extends MatchesBody{
    id: string;
}


export function generateUniqueID(): string{
 
    return crypto.randomBytes(20).toString('hex');

}

export function getAllClans(){

    const teams: ArrayLike<Teams> = db.get('teams').value();

    return teams
}

export function parseClanAdd(id: string, body: TeamAdd){

    if(!body.team_logo){
        return false;
    }

    body.team_logo = body.team_logo.replace(/^data:image\/jpeg+;base64,/, "");
    body.team_logo = body.team_logo.replace(/ /g, '+');

    const bufferImage: Buffer =  Buffer.from(body.team_logo, 'base64');

    const imagePath = path.join(__dirname, '..', 'public', 'teams', `${id}.png`);

    fs.writeFile(imagePath, bufferImage, (err) => {
        if(err){
            db.get('error_list').push({error_name: 'save_team_image', error_message: err, error_custom: 'Error while saving team image.'}).write();
            return false
        }
    });

    const values: Values = {
        'id': id,
        'team_name': body.team_name,
        'team_short_name': body.team_short_name,
        'team_country_code': body.team_country_code,
        'team_logo_name': `${id}.png`,
        'team_description': body.team_description
    }

    try {
        db.get('teams').push(values).write();
    } catch (err) {
        db.get('error_list').push({error_name: 'save_team_db', error_message: err, error_custom: 'Error while saving team into database.'}).write();
        return false
    }
    

    return true

}

export function parseClanView(id: string): Values{
    return db.get('teams').find({id}).value();
}

export function parseClanEdit(id: string, body: TeamAdd){


    if(body.team_logo){

        console.log('exiests logo edit')

        body.team_logo = body.team_logo.replace(/^data:image\/jpeg+;base64,/, "");
        body.team_logo = body.team_logo.replace(/ /g, '+');
    
        const bufferImage: Buffer =  Buffer.from(body.team_logo, 'base64');
    
        const imagePath = path.join(__dirname, '..', 'public', 'teams', `${id}.png`);
    
        fs.writeFile(imagePath, bufferImage, (err) => {
            if(err){
                db.get('error_list').push({error_name: 'save_team_image', error_message: err, error_custom: 'Error while saving team image.'}).write();
                return false
            }
        });

    }

    const values: Values = {
        'id': id,
        'team_name': body.team_name,
        'team_short_name': body.team_short_name,
        'team_country_code': body.team_country_code,
        'team_logo_name': `${id}.png`,
        'team_description': body.team_description
    }

    try {
        db.get('teams').find({id}).assign({team_name: values.team_name, team_short_name: values.team_short_name, team_country_code: values.team_country_code, team_logo_name: values.team_logo_name, team_description: values.team_description}).write();
    } catch (err) {
        db.get('error_list').push({error_name: 'save_team_db', error_message: err, error_custom: 'Error while saving team into database.'}).write();
        return false
    }
    

    return true

}

export function getAllPlayers(){

    const players: ArrayLike<Players> = db.get('players').value();

    return players
}

export function parsePlayerAdd(id: string, body: PlayerAddBody){

    const values: PlayerAdd = {
        'id': id,
        'player_name': body.player_name,
        'player_nickname': body.player_nickname,
        'player_lastname': body.player_lastname,
        'player_description': body.player_description,
        'player_age': body.player_age,
        'player_steamid': body.player_steamid,
        'player_countrycode': body.player_countrycode,
        'player_teamid': body.player_teamid
    }

    try {
        db.get('players').push(values).write();
    } catch (err) {
        db.get('error_list').push({error_name: 'save_player_db', error_message: err, error_custom: 'Error while saving player into database.'}).write();
        return false
    }
    

    return true

}


export function parsePlayerView(id: string): PlayerAdd{
    return db.get('players').find({id}).value();
}



export function parsePlayerEdit(id: string, body: PlayerAddBody){

    const values: PlayerAdd = {
        'id': id,
        'player_name': body.player_name,
        'player_nickname': body.player_nickname,
        'player_lastname': body.player_lastname,
        'player_description': body.player_description,
        'player_age': body.player_age,
        'player_steamid': body.player_steamid,
        'player_countrycode': body.player_countrycode,
        'player_teamid': body.player_teamid
    }

    try {
        db.get('players').find({id}).assign({player_name: values.player_name, player_nickname: values.player_nickname, player_lastname: values.player_lastname, player_description: values.player_description, player_age: values.player_age, player_steamid: values.player_steamid, player_teamid: values.player_teamid, player_countrycode: values.player_countrycode}).write();
    } catch (err) {
        db.get('error_list').push({error_name: 'save_team_db', error_message: err, error_custom: 'Error while saving player into database.'}).write();
        return false
    }
    

    return true

}


export function getAllMatches(){

    const matches: ArrayLike<Matches> = db.get('matches').value();

    return matches
}

export function parseMatchAdd(id: string, body: MatchesBody){

    const values: Matches = {
        'id': id,
        'team_one': body.team_one,
        'team_two': body.team_two,
        'status': body.status, 
        'match_type': body.match_type , 
        'team_one_players': [],
        'team_two_players': [] 
    }

    try {
        db.get('matches').push(values).write();
    } catch (err) {
        db.get('error_list').push({error_name: 'save_match_db', error_message: err, error_custom: 'Error while saving match into database.'}).write();
        return false
    }
    
    return true

}


export function parseMatchView(id: string): Matches{
    return db.get('matches').find({id}).value();
}



export function parseMatchEdit(id: string, body: MatchesBody){
    
    const values: Matches = {
        'id': id,
        'team_one': body.team_one,
        'team_two': body.team_two,
        'status': body.status, 
        'match_type': body.match_type   ,
        'team_one_players': body.team_one_players,
        'team_two_players': body.team_two_players,
    }

    try {
        db.get('matches').find({id}).assign({team_one: values.team_one, team_two: values.team_two, status: values.status, match_type: values.match_type, team_one_players: values.team_one_players, team_two_players: values.team_two_players}).write();
    } catch (err) {
        db.get('error_list').push({error_name: 'save_match_db', error_message: err, error_custom: 'Error while saving match into database.'}).write();
        return false
    }
    
    return true

}


