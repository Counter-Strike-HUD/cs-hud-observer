

import * as net from 'net';

const client = new net.Socket();

client.connect(27017, '51.77.83.159', () => {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});

client.on('data', (data) => {
	console.log('Received: ' + data);
	//cclient.destroy(); // kill client after server's response
});

client.on('close', () => {
	console.log('Connection closed');
});

