import {HLDS_Log} from 'hlds-log';
import config from '../../config.json';
import express from 'express';
import path from 'path';
import cors from 'cors';

import apiRouter from './routes/apiRouter';

// Init app
const app = express();

// Serve static files 
app.use('/assets', express.static(path.join(__dirname, 'public')))

// Use body parser
app.use(express.urlencoded({limit: '50mb', extended: false }));
app.use(express.json({limit:'50mb'}));

// json format output
app.set('json spaces', 2)

// Prevent signed header by express etc
app.disable('x-powered-by')

// Use cors 
app.use(cors());


/*
    PUBLIC ROUTES
*/

// Use docs route handler
app.use('/api', apiRouter);


// Start app and listen on web port
app.listen(config.backend.TCP_LOCAL_PORT, () =>{
    console.log(`Web server started on port ${config.backend.TCP_LOCAL_PORT}...`);
});

