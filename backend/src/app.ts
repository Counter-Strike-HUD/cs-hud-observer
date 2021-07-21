import config from '../../config.json';
import express from 'express';
import path from 'path';
import cors from 'cors';
import socket from './socket/socket';


// Init app socket internal server
// All handling is resolved in socket.ts
socket.listen(config.INTERNAL_SOCKET_PORT);

socket.on('connection', soc =>{
    console.log('New connection on server socket', soc.id)

    soc.onAny((event: object, msg: string) =>{
        console.log('New event: ' ,event, msg)

        socket.emit(event.toString(), msg);
    })

    
})


// Import API router
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

