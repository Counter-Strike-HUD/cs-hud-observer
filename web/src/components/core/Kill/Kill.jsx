import React, {useContext, useEffect, useState} from 'react';
import KillItem from './kill-item/KillItem';

import {SocketContext} from '../Socket/Socket'



const Kill = (props) =>{

    const socket = useContext(SocketContext);

    const [kills, setKills] = useState([])
 
    useEffect(() =>{

        socket.on('kill', event =>{
            console.log('kill happened', event)
            setKills(kills => [...kills, event])
        })

    }, 0)

    return (
        <React.Fragment>
                <div className="wrapper">

                    {kills.map((kill) =>
                        <KillItem victim={{side: 'ct', name: 'kalle 1'}} killer={{side: 'tt', name: 'kauk 1'}}  delay="5000" />
                    )}
                       
                </div>   
        </React.Fragment>
    );
}

export default Kill;