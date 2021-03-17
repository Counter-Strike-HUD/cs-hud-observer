import React from 'react';


import Ak47 from '../../screen/resources/images/ak47.png';
import ArmorFull from '../../screen/resources/images/assaultsuit.png';
import LightArmor from '../../screen/resources/images/kevlar.png';
import FlashGrenade from '../../screen/resources/images/flash_grenade.png';
import HeGrenade from '../../screen/resources/images/explosive_grenade.png';
import SmokeGrenade from '../../screen/resources/images/smoke_grenade.png';
import C4 from '../../screen//resources/images/c4.png';
import Defuser from '../../screen//resources/images/defuser.png';
import User from '../../screen/resources/images/unknown-user.png';

const PlayerObserved = (props) =>{
    return(
        <React.Fragment>
            <div className="player-spectaded-upper-layer">

                <div className="player-spectaded-name">
                    kalle
                </div>

                <div className="player-spectaded-health">
                    + 100
                </div>

                <div className="player-spectaded-gear">
                    <img src={ArmorFull} alt="full"></img>
                    <img src={LightArmor} alt="full"></img>
                </div>


                </div>

                <div className="player-spectaded-down-layer">
                    
                <div className="player-spectaded-utility">
                    <img src={FlashGrenade} alt="full"></img>
                    <img src={SmokeGrenade} alt="full"></img>
                    <img src={HeGrenade} alt="full"></img>
                </div>

                <div className="player-spectaded-avatar">
                    <img src={User} alt="user" />
                </div>
            </div>

        </React.Fragment>
    );
}

export default PlayerObserved;