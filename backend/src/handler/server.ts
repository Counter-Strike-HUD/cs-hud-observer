import * as dgram from "dgram";
const server = dgram.createSocket("udp4");
import {EventEmitter} from 'events';


class GameEvent extends EventEmitter {

    port: number

    constructor(port: number) {
        super();
        this.port = port;
    }

    start() {
        this.onError();
        this.messageParser();
        this.listenSocket();
        this.bindPort(this.port);
    }

    onError() {
        server.on("error", (err: Event) => {
            this.emit('error', err);
            server.close();
        });
    }

    messageParser() {
        server.on("message", (msg: Buffer, info: Object) => {
            const message = (msg as Buffer).toString("ascii").replace(/[\n\t\r]/g, "");

        });      
    }

    listenSocket() {
        server.on("listening", () => {
            const address = server.address();
            console.log(`server listening ${address.address}:${address.port}`);
        });
    }


    bindPort(port: number) {
        server.bind(port);
    }
}

export default GameEvent;