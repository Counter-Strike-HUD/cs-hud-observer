import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    },
});

io.on("connection", (socket: Socket) => {
    
    console.log('New connection', socket.id);

    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
});




setInterval(() => {
    console.log('Sending emit message');
    io.emit('kill', 'testing')
}, 1000);

httpServer.listen(8000);