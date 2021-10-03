import React, {useContext, useEffect, useState} from 'react';
import KillItem from './kill-item/KillItem';
import {socket} from '../Socket/Socket';



const Kill = React.memo(({kills}) =>{

    return (
        <React.Fragment>
                <div className="wrapper">

                    {kills && kills.map((kill, index) =>
                        <KillItem key={index} killinfo={kill} victim={{side: kill.victim.side, name: kill.victim.player_nickname}} killer={{side: kill.attacker.side, name: kill.attacker.player_nickname}}  delay="5000" />
                    )}
                       
                </div>   
        </React.Fragment>
    );
});

export default Kill;