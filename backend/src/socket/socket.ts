import { Server, Socket } from "socket.io";
import { createServer} from "http";
import config from '../../../config.json'



// Setup socketio
const socket = new Server(createServer(), {
    cors: {
        origin: config.hostname,
        methods: ["GET", "POST"],
        credentials: true
    },
});


export default socket;