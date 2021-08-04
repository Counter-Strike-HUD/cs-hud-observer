

import net from 'net';
import {EventEmitter} from 'events';
import { Socket } from "socket.io-client";

export interface ClientSocket{
	state: State;
	socket: net.Socket;
	info: {
		address: string;
		port: number;
		token: string;
	}
	io: Socket;
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

	constructor(address: string, port: number, token: string, socketio: Socket) {

		super();

		// Map class constructor data
		this.info = {
			address,
			port,
			token
		}


		// Socket io instance
		this.io = socketio;

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

			console.log('socket called', status);

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

		console.log('message parser called')
		
		// Init empty string variable
		let message = '';

		// Listen for socket data event
		this.socket.on('data', (msg: Buffer) =>{

			const m = msg.toString('utf-8');

			console.log(m, 'END');

			// Check if string char is not closing bracket
			if(m.slice(-1) !== '}'){

				// Append new string to the message variable
				message += m;

			}else{

				// Check do we have old chunks of message?
				if(message !== ''){

					// If yes append it to the old chunk and form 'good' string
					// Later we need to unset this to empty string
					message += m;
				}

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
					if(this.io) {
						console.log('io exists')
						this.io.emit(data.event_name, JSON.stringify(data));
					}


					// Unset string
					message = '';
					
				} catch (error) {

				
					// Remove all whitespaces and newlines from string
					const cleanjsonstring = m.replace(/(\r\n|\n|\r)/gm, "");

					// Remove all sticked curly brackets with commas
					const jsonstrings = cleanjsonstring.replace(/}{/gm, '},{')


					const jsontrim = jsonstrings.split(' ').join('')


					// Parse string
					const json = JSON.parse(`[${jsontrim}]`);


					// Check if regex succeded
					if(json !== null && json.length > 0){

					
						// Parse trough array
						// Event is now just any, later gonna implement type checking
						json.forEach((event: any) =>{

							console.log(event)

							// If socket io instance is set send message
							if(this.io) this.io.emit(event.event_name, JSON.stringify(event));

						});
					}

					// Unset message
					message = '';
				}
			}
	
		});
	}
}


module.exports = {ClientSocket};

