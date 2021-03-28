import { createServer } from "http";
import { Server, Socket } from "socket.io";
import MockerClass from "./MockerClass";
import Mocker from './MockerClass'

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

const mocker = new MockerClass();

mocker.on('action', info =>{ console.log(info)
    io.emit(info[0], info[1])
})



httpServer.listen(8000);