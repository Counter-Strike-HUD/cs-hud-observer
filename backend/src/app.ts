import {HLDS_Log} from 'hlds-log';
import Socket from 'socket.io';
import config from '../../config.json';
import express from 'express';
import path from 'path';
import cors from 'cors';

import apiRouter from './routes/apiRouter';

const logger = new HLDS_Log(config.backend.UDP_LOCAL_PORT, true);

logger.start();

const io = Socket();

logger.on('raw', (info: Object) =>{
    console.log(info);
})

io.on('connection', socket =>{
    console.log('New stream connected: ', socket.id)
    socket.on('hello', msg =>{
        console.log('client says hello')
    })
})

io.listen(config.web.SOCKET_PORT);

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

