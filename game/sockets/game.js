'use strict';

const Event = require('events').EventEmitter;
const net = require('net');
const crypto = require('crypto');
const config = require('./config')



/**
 *  GameSocket is a socket responsible for transfering data between game and client
*/

class GameSocket extends Event {

    constructor() {

        super();

        // Create a new socket 
        this.server = net.createServer();

        // Client auth state
        this.authed = false;

        // Auth token
        this.token = config.token;

        // State 
        this.sockets = {
            client: null,
            remoteAddress: null
        };

        // Should be user kicked?
        this.kick = false;

        // Listen for incoming requests
        this.listen();
        this.socket();

        // Helpers
        this._checkToken();

    }

    /**
     * Start listening for a new connections
     */
    listen() {

        // Start listener
        this.server.listen(config.port, '0.0.0.0', () => {
            console.log(`⚡️[server]: GameSocket is running at ${config.port}`);
        })

        // Listen for socket close event and destroy on error
        this.server.on('close', (error) => {
            throw new Error('⚡️[server]: GameSocket closed', error);
        })

    }

    /**
     * Parse incoming connections
     */
    socket() {

        // Listen for connection
        this.server.on('connection', socket => {

            // Set encoding to utf8
            socket.setEncoding('utf8');

            // Listen for errors in socket
            // Happens when user force drops connection
            socket.on('error', (err) =>{
                if(err.errno !== 'ECONNRESET') console.error('⚡️[server]: GameSocket ' + err);
            });

            // User disconnected unset client socket
            socket.on("close", () =>{

                // Check if this connection is from a client and this is not a double connection
                if(socket.remoteAddress === this.sockets.remoteAddress && this.kick === false) {
                   
                    // Unset state for this client
                    this.authed = false;
                    this.sockets = {
                        client: null,
                        remoteAddress: null
                    };

                    console.log('⚡️[server]: Client closed the connection');

                // Check if this is also not a serer address
                } else if(socket.remoteAddress !== config.game_server_address && socket.remoteAddress !== undefined) {

                    // Unset kick state because a new client will be connected in future
                    this.kick = false;

                    console.log('⚡️[server]: Anonymous (' + socket.remoteAddress + ') kicked');
                }

            });

            // Listen for incoming data
            socket.on('data', data => {

                // Check if client is authed
                if(!this.authed) {

                    // Check if message contains token bearer
                    if(data.startsWith("Bearer ")) {

                        // Parse client token
                        const clienttoken = data.substring(7, data.length);

                        // Compare local with remote token
                        if(this.token !== clienttoken) {

                            // Create friendly message for client
                            const message = `{
                                "event_name": "auth",
                                "authed": false,
                                "message": "Token missmatch happened."
                            }`;

                            // Send error message to the client
                            socket.write(message);


                            // If failed destroy connection and drop user since token missmatch happened
                            socket.destroy(); 
                            console.log('⚡️[server]: Client not authed');

                        } else {

                            // If token match set local state and save client socket 
                            this.authed = true;
                            this.sockets.client = socket;
                            this.sockets.remoteAddress = socket.remoteAddress;

                            // Create friendly message for client
                            const message = `{
                                "event_name": "auth",
                                "authed": true,
                                "message": "User succesfully authed."
                            }`;

                            // Send message to the client
                            socket.write(message);

                            console.log('⚡️[server]: Client authed');
                        }

                    }else{

                        // Check if this is not a server address
                        if(socket.remoteAddress !== config.game_server_address) {

                            // If not drop connection
                            socket.destroy();
                        }
                    }
                } else {

                    // If user is not authed check if this is a server sending
                    if(socket.remoteAddress !== config.game_server_address) {

                        // If not destroy a connection
                        socket.destroy();
                        
                        // Kick client message
                        this.kick = true;

                    } else if(this.sockets.client !== null) {

                        // Write data to the client socket
                        this.sockets.client.write(data);
                    }
                }
            })
        })
    }

    /**
     * Check if token is set in config
     */
    _checkToken() {

        // Check token existence
        if(!this.token || this.token.length !== 32 && this.token !== "") {

            // If token is not set generate a new one
            const generate = crypto.randomBytes(16).toString('hex');

            // Display message
            console.log('Token doesnt exist, generating new. Copy line below.');
            console.log(`Bearer ${generate}`);

            // Save token for a future and fuck you
            this.token = generate;
        }
    }

}

new GameSocket();

