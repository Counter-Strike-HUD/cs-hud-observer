

import net from 'net';
import {EventEmitter} from 'events';

/*
const client = new net.Socket();

client.connect(28015, '54.36.236.240', () => {
	console.log('Connected');
	client.write('Bearer 80931dca799344575459ce56175a3a01');
});

client.on('data', (data) => {
	console.log('Received: ' + data);
	//cclient.destroy(); // kill client after server's response
});

client.on('close', () => {
	console.log('Connection closed');
});
*/



interface ClientSocket{
	state: State;
	socket: net.Socket;
	info: {
		address: string;
		port: number;
		token: string;
	}, 
	lastError: string;
}

interface State{
	connected: boolean;
	authed: boolean;
}



/**
 * ClientSocket class
 * 
 * Main handler for incoming server data 
 */

class ClientSocket extends EventEmitter{

	constructor(address: string, port: number, token: string) {

		super();

		// Map class constructor data
		this.info = {
			address,
			port,
			token
		}

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
			console.log('Connected', info);
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

		// Check if we are connected?
		if(this.state.connected){

			// Try to write auth token message to the remote socket
			this.socket.write(`Bearer ${this.info.token}`);
		}

		// Local state for fail case
		let fail: boolean = false;

		// Listen for close event
		this.once('auth_failed', () =>{
			
			// Set fail var to true
			fail = true;
		})

		// Check after 5 seconds if auth failed
		setTimeout(() =>{

			// If auth not failed
			if(!fail){

				// Resolve as success
				authed(true);
			}else{

				// Resolve as failure
				authed(false);
			}
		}, 5000)

	}


	_messageParser(){

	}
}


const client = new ClientSocket('54.36.236.240', 28015, ' ');


client._connect((status: boolean | string) =>{
	console.log('callback connected', status)
});

client._auth((authed: boolean) =>{
	console.log('Auth ', authed);
});



module.exports = {ClientSocket};

