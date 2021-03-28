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

    }, [])

    return (
        <React.Fragment>
                <div className="wrapper">

                    {kills.map((kill) =>
                        <KillItem key={kill.victim.name} victim={{side: kill.victim.side, name: kill.victim.name}} killer={{side: kill.killer.side, name: kill.killer.name}}  delay="5000" />
                    )}
                       
                </div>   
        </React.Fragment>
    );
}

export default Kill;