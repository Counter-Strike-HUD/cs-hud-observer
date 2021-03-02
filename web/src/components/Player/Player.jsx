import React from 'react';
import ArmorFull from "../screen/resources/images/assaultsuit.png";
import LightArmor from "../screen/resources/images/kevlar.png";
import User from "../screen/resources/images/unknown-user.png";
import C4 from "../screen/resources/images/c4.png";
import FlashGrenade from "../screen/resources/images/flash_grenade.png";
import SmokeGrenade from "../screen/resources/images/smoke_grenade.png";
import HeGrenade from "../screen/resources/images/explosive_grenade.png";
import Ak47 from "../screen/resources/images/ak47.png";

const Player = ({name, health}) => {
    return React.useMemo(() => {
        return (
            <div className="player-card">
                <div className="player-card-head">

                <span className="nick-left-1">
                    {name}
                </span>

                    <div className="armor-left-1">
                        <img src={ArmorFull} alt="full"></img>
                        <img src={LightArmor} alt="full"></img>
                    </div>

                    <div className="health-number-left-1">
                        {health}
                    </div>
                    <div style={{ left: 0, top: 0,  position: 'absolute', background: 'red', width: `${health}%`, height: '100%'}}></div>

                </div>

                <div className="player-info-left-1">
                    <div className="avatar-left-1">
                        <img src={User} alt="user" />
                    </div>
                    <div className="equipment-left-1">
                        <img src={C4} alt="full"></img>
                    </div>
                    <div className="utility-left-1">
                        <img src={FlashGrenade} alt="full"></img>
                        <img src={SmokeGrenade} alt="full"></img>
                        <img src={HeGrenade} alt="full"></img>
                    </div>
                    <div className="weapon-left-1">
                        <img src={Ak47} alt="full"></img>
                    </div>
                </div>

            </div>
        )

    }, [name, health])
}


export default Player;