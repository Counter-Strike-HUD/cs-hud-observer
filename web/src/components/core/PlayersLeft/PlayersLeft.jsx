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

const PlayersLeft = (props) =>{
    return(
        <React.Fragment>
            <div className="left-player-1">
                <div className="health-player-left-1">
                    <div className="nick-left-1">
                        kalle
                    </div>
                    <div className="armor-left-1">
                        <img src={ArmorFull} alt="full"></img>
                        <img src={LightArmor} alt="full"></img>
                    </div>
                    <div className="health-number-left-1">
                        100
                    </div>
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

            <div className="left-player-2">
                <div className="health-player-left-2">

                    <div className="nick-left-2">
                        LEG1JADZEKO11
                    </div>

                    <div className="armor-left-2">
                        <img src={ArmorFull} alt="full"></img>
                        <img src={LightArmor} alt="full"></img>
                    </div>
                    <div className="health-number-left-2">
                        100
                    </div>

                </div>

                <div className="player-info-left-2">
                    <div className="avatar-left-2">
                        <img src={User} alt="user" />
                    </div>
                    <div className="equipment-left-2">
                        <img src={C4} alt="full"></img>
                    </div>
                    <div className="utility-left-2">
                        <img src={FlashGrenade} alt="full"></img>
                        <img src={SmokeGrenade} alt="full"></img>
                        <img src={HeGrenade} alt="full"></img>
                    </div>
                    <div className="weapon-left-2">
                        <img src={Ak47} alt="full"></img>
                    </div>
                </div>
            </div>

            <div className="left-player-3">
                <div className="health-player-left-3">
                    <div className="nick-left-3">
                        kauk
                    </div>
                    <div className="armor-left-3">
                        <img src={ArmorFull} alt="full"></img>
                        <img src={LightArmor} alt="full"></img>
                    </div>
                    <div className="health-number-left-3">
                        100
                    </div>

                </div>

                <div className="player-info-left-3">
                    <div className="avatar-left-3">
                        <img src={User} alt="user" />
                    </div>
                    <div className="equipment-left-3">
                        <img src={C4} alt="full"></img>
                    </div>
                    <div className="utility-left-3">
                        <img src={FlashGrenade} alt="full"></img>
                        <img src={SmokeGrenade} alt="full"></img>
                        <img src={HeGrenade} alt="full"></img>
                    </div>
                    <div className="weapon-left-3">
                        <img src={Ak47} alt="full"></img>
                    </div>
                </div>
            </div>

            <div className="left-player-4">
                <div className="health-player-left-4">
                    <div className="nick-left-4">
                        aed1oN
                    </div>
                    <div className="armor-left-4">
                        <img src={ArmorFull} alt="full"></img>
                        <img src={LightArmor} alt="full"></img>
                    </div>
                    <div className="health-number-left-4">
                        100
                    </div>

                </div>

                <div className="player-info-left-4">
                    <div className="avatar-left-4">
                        <img src={User} alt="user" />
                    </div>
                    <div className="equipment-left-4">
                        <img src={C4} alt="full"></img>
                    </div>
                    <div className="utility-left-4">
                        <img src={FlashGrenade} alt="full"></img>
                        <img src={SmokeGrenade} alt="full"></img>
                        <img src={HeGrenade} alt="full"></img>
                    </div>
                    <div className="weapon-left-4">
                        <img src={Ak47} alt="full"></img>
                    </div>
                </div>
            </div>

            <div className="left-player-5">
                <div className="health-player-left-5">
                    <div className="nick-left-5">
                        AgresivaNNN
                    </div>
                    <div className="armor-left-5">
                        <img src={ArmorFull} alt="full"></img>
                        <img src={LightArmor} alt="full"></img>
                    </div>
                    <div className="health-number-left-5">
                        100
                    </div>
                </div>

                <div className="player-info-left-5">
                    <div className="avatar-left-5">
                        <img src={User} alt="user" />
                    </div>
                    <div className="equipment-left-5">
                        <img src={C4} alt="full"></img>
                    </div>
                    <div className="utility-left-5">
                        <img src={FlashGrenade} alt="full"></img>
                        <img src={SmokeGrenade} alt="full"></img>
                        <img src={HeGrenade} alt="full"></img>
                    </div>
                    <div className="weapon-left-5">
                        <img src={Ak47} alt="full"></img>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default PlayersLeft;