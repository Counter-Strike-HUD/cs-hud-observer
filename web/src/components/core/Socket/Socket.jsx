import React from 'react';
import socketio from "socket.io-client";

export const socket = socketio.connect('localhost:8000', {withCredentials: true});

socket.on('test', test =>{
    console.log('test message', test);
})


socket.on('*', event =>{
    console.log(event);
})

export const SocketContext = React.createContext();