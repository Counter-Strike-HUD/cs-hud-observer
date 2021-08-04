import React from 'react';
import socketio from "socket.io-client";

export const socket = socketio.connect('localhost:4000', {withCredentials: true});

socket.on('connect', () =>{
    socket.emit('hud_socket');
})


socket.on('get_gamestatus', event =>{
    console.log(event);
})

socket.onAny((event, msg) =>{
    console.log(event, msg)
})

export const SocketContext = React.createContext();