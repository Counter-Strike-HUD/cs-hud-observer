import { Server } from "socket.io";
import { createServer} from "http";
import config from '../../../config.json'
import { AppState } from "../handler/state";


// Setup socketio
const socketio = new Server(createServer(), {
    cors: {
        origin: config.hostname,
        methods: ["GET", "POST"],
        credentials: true
    },
});

// Init state class
const state = new AppState();

socketio.on('connection', socket =>{
    console.log('New connection on server socket', socket.id)

    // For testing purposes only.
    socket.onAny((event: object, msg: string) =>{
        console.log('New event: ' ,event, msg)
        //socketio.emit(event.toString(), msg);
    });


    // Listen for backend handler connection event
    socket.on('get_gamestatus', () =>{

        // Send game status state
        socketio.emit('get_gamestatus', state.game);
     
    })

    // Listen for backend handler connection event
    socket.on('game_connected', () =>{

        // Send game status state
        socket.emit('game_connected', state.game);
        
    })


    // Listen for backend handler connection event
    socket.on('game_authed', (status) =>{

        // Check if status is true, if yes set state connected
        if(status){

            // We set here connected also since we dont have use if state holds connecte true but not authed
            state.game.connected = true;
            state.game.authed = true;
        }

        // Send game status state
        socket.emit('game_authed', status);
     
    })

    


    // Listen for backend handler connection event
    socket.on('backend_connect', () =>{

        // Set backend connection state
        state.backend.id = socket.id;
        state.backend.connected = true;
        
    })

    // Listen for frontend connection event 
    socket.on('frontend_connect', () =>{

        // Set frontend connection state
        state.frontend.id = socket.id;
        state.frontend.connected = true;
    })


    // Listen for client disconnect events
    socket.on('disconnect', () =>{

        // Check which client disconnected
        if(state.backend.id === socket.id){

            // Unset state to initial 
            state.backend.id = '';
            state.backend.connected = false;
        }


        if(state.frontend.id === socket.id){
            
            // Unset state to initial 
            state.frontend.id = '';
            state.frontend.connected = false;
        }
    })

})



export default socketio;