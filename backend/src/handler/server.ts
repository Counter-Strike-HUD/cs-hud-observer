

import net from 'net';
import {EventEmitter} from 'events';
import { Server, Socket } from "socket.io";
import { createServer} from "http";
import config from '../../../config.json';

export interface ClientSocket{
	state: State;
	socket: net.Socket;
	info: {
		address: string;
		port: number;
		token: string;
	}
	io: Server | null;
	lastError: string;
}

export interface State{
	connected: boolean;
	authed: boolean;
}



/**
 * ClientSocket class
 * 
 * Main handler for incoming server data 
 */

export class ClientSocket extends EventEmitter{

	constructor(address: string, port: number, token: string) {

		super();

		// Map class constructor data
		this.info = {
			address,
			port,
			token
		}


		// Socket io instance
		this.io = null;

		// Local client socket connection
		this.socket = new net.Socket();

		// Internal state 
		this.state = {
			connected: false,
			authed: false
		}

		this.lastError = '';

		// Listen for successfull connection event
		this.socket.on('connect', (info: any[]) =>{ 

			// Send auth key after connection
			this.socket.write(`Bearer ${this.info.token}`);

			console.log('Connected');
		});


		// Listen for error connection event
		this.socket.on('error', (err: Error) =>{ 
			console.log('Error', err);

			// Set last error message
			this.lastError = err.message;
		});


		this.socket.on('close', () => {
			console.log('Connection closed');

			// Auth check if we are connected but not authed and close event fired
			// That means token is invalid
			if(this.state.connected && !this.state.authed){
				this.emit('auth_failed');
			}
		});

		// Call message parser function
		this._messageParser();
	}

	/**
	 * _connect
	 * 
	 * Connect to the specific address and port
	 */
	_connect(connected: Function){

		// Connect to the address and port, event will fire on successfull or failed connection
		this.socket.connect(this.info.port, this.info.address, () =>{

			// Set connected state for check in timeout
			this.state.connected = true;

			// Resolve callback with true
			connected(true);
		});

		// Set connected callback to false
		setTimeout(() =>{

			// Check if we have connected state true?
			if(!this.state.connected){

				// Resolve callback with error message
				connected(this.lastError);
			}
			
		}, 5000);
	}

	/**
	 * _auth
	 * 
	 * Function used to make auth to the remote game socket
	 */
	_auth(authed: Function){

		// Listen for auth event
		this.once('auth', status =>{ 

			// Set interal state
			this.state.authed = status;

			// Callback auth
			authed(status);
		});
	}


	/**
	 * _messageParser
	 * 
	 * Internal function used for parsing incoming socket messages
	 */
	_messageParser(){
		
		// Listen for socket data event
		this.socket.on('data', (msg: Buffer) =>{

			const m = msg.toString('utf8');

			console.log(m);

			// Try to JSON parse message
			try {

				// Try to parse as JSON object
				const data = JSON.parse(m);

				console.log(data)

				// Check if this event is auth response
				if(data.event_name === 'auth'){

					// Check if message is successfull
					if(data.authed){

						// Emit success
						this.emit('auth', true);
					}else{

						// Emit failed auth
						this.emit('auth', false);
					}
				}

				// If socket io instance is set send message
				if(this.io) this.io.emit(data.event_name, JSON.stringify(data));
				
			} catch (error) {

			
				// On this point JSON parse failed and we need to manualy parse objects from string with regex
				const parsed: Array<string> | null = m.match(/[^{\}]+(?=})/);

				// Check if regex succeded
				if(parsed !== null && parsed.length > 0){

					// Parse trough array
					parsed.forEach(match =>{

						const event = JSON.parse(`{${match}}`);

						// If socket io instance is set send message
						if(this.io) this.io.emit(event.event_name, JSON.stringify(event));

					});
				}

	
			}

		});
	}


	/**
	 * _setupSocketIO
	 * 
	 * Setups socket IO server after successfull connection to game socket
	 */
	_setupSocketIO(){

		// Setup socketio
		this.io = new Server(createServer(), {
			cors: {
				origin: config.hostname,
				methods: ["GET", "POST"],
				credentials: true
			},
		});

		// Start listening
		this.io.listen(config.web.SOCKET_PORT);

		// Log on connection
		this.io.on('connection', (socket: Socket) =>{
			console.log('New client connected');
		});
	}
}


const client = new ClientSocket('54.36.236.240', 28015, '80931dca799344575459ce56175a3a01');


client._connect((status: boolean | string) =>{
	console.log('callback connected', status)
});

client._auth((authed: boolean) =>{
	console.log('Auth ', authed);
	
	client._setupSocketIO();
});



module.exports = {ClientSocket};

