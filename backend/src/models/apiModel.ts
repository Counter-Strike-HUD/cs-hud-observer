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

export function generateUniqueID(): string{
 
    return crypto.randomBytes(20).toString('hex');

}

export function parseClanAdd(id: string, body: TeamAdd){

    if(!body.team_logo){
        return false;
    }

    body.team_logo = body.team_logo.replace(/^data:image\/jpeg+;base64,/, "");
    body.team_logo = body.team_logo.replace(/ /g, '+');

    const bufferImage: Buffer =  Buffer.from(body.team_logo, 'base64');

    const imagePath = path.join(__dirname, '..', 'public', `${id}.png`);

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

        body.team_logo = body.team_logo.replace(/^data:image\/jpeg+;base64,/, "");
        body.team_logo = body.team_logo.replace(/ /g, '+');
    
        const bufferImage: Buffer =  Buffer.from(body.team_logo, 'base64');
    
        const imagePath = path.join(__dirname, '..', 'public', `${id}.png`);
    
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

    console.log(values)

    try {
        db.get('teams').find({id}).assign({team_name: values.team_name, team_short_name: values.team_short_name, team_country_code: values.team_country_code, team_logo_name: values.team_logo_name, team_description: values.team_description}).write();
    } catch (err) {
        db.get('error_list').push({error_name: 'save_team_db', error_message: err, error_custom: 'Error while saving team into database.'}).write();
        return false
    }
    

    return true

}

