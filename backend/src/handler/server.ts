

import * as net from 'net';

const client = new net.Socket();

client.connect(27051, '127.0.0.1', () => {
	console.log('Connected');
	client.write('Bearer efeee4b0b4c93d42fe061e14107a20f82ece1f5d');
});

client.on('data', (data) => {
	console.log('Received: ' + data);
	//cclient.destroy(); // kill client after server's response
});

client.on('close', () => {
	console.log('Connection closed');
});

