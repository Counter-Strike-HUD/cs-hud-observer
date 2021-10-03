import React from 'react';
import KillItem from './kill-item/KillItem';



const Kill = React.memo(({screentime, kills}) =>{

    return (
        <React.Fragment>
                <div className="wrapper">

                    {kills && kills.map((kill, index) =>
                        <KillItem key={index} killinfo={kill} victim={{side: kill.victim.side, name: kill.victim.player_nickname}} killer={{side: kill.attacker.side, name: kill.attacker.player_nickname}}  delay={screentime} />
                    )}
                       
                </div>   
        </React.Fragment>
    );
});

export default Kill;