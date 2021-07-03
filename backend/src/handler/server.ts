

import * as net from 'net';

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

