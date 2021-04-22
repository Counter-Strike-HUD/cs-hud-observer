const Event = require('events').EventEmitter;
const net = require('net');
const crypto = require('crypto');
const config = require('./config.json');



/**
 *  GameSocket is a socket responsible for transfering data between game and client
*/

class GameSocket extends Event{

    constructor(){
        super();

        this.server = net.createServer();
        this.config = config;
        this.authed = false;
        this.token = this.config?.token;
        this.sockets = {
            client: null,
            server: null 
        };


        // Listen for incoming requests
        this.listen();
        this.socket();

        // Helpers
        this._checkToken();
        
    }


    listen(){
        this.server.listen(this.config.port, '0.0.0.0', () => {
            console.log(`⚡️[server]: GameSocket is running at ${this.config.port}`)
        })

        this.server.on('close', (error) => {
            throw new Error('Server socket closed', error);
        });
    }

    socket(){

        this.server.on('connection', socket =>{

            // Set encoding to utf8
            socket.setEncoding('utf8');

            socket.on('data', data =>{

                if(!this.authed){
                    if (data.startsWith("Bearer ")){
                        const token = data.substring(7, data.length);
                        if(token !== this.token){
                            socket.destroy(); 
                        }else{
                            this.authed = true;
                            this.sockets.client = socket;
                        }
                    }
                }

                // Check if game server is sending us data
                if(socket.remotePort === this.config.game_port && socket.remoteAddress === '127.0.0.1'){
                    //Check do we have connected client
                    if(this.sockets.client !== null){
                        // Write data
                        this.sockets.client.write(data)
                    }
                }
            })
        })
    }


    _checkToken(){
        if(!this.token && !this.token?.length < 32){
            const token = crypto.randomBytes(20).toString('hex');
            console.log('Token doesnt exist, generating new. Copy line below.');
            console.log(`Bearer ${token}`)
            return this.token = token;
        }
    }

}

new GameSocket();