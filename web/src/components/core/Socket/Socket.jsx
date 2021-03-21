import React from 'react';
import socketio from "socket.io-client";

export const socket = socketio.connect('localhost:8000', {withCredentials: true});

socket.on('test', test =>{
    console.log('test message', test);
})

export const SocketContext = React.createContext();