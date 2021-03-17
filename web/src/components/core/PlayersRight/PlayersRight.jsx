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

const PlayersRight = (props) =>{
    return(
        <React.Fragment>
            <div className="right-player-1">
                <div className="health-player-right-1">
                        <div className="nick-right-1">
                        kalle
                    </div>
                    <div className="armor-right-1">
                        <img src={ArmorFull} alt="full"></img>
                        <img src={LightArmor} alt="full"></img>
                    </div>
                    <div className="health-number-right-1">
                        100
                    </div>
                </div>

                <div className="player-info-right-1">
                    <div className="avatar-right-1">
                        <img src={User} alt="user" />
                    </div>
                    <div className="equipment-right-1">
                        <img src={Defuser} alt="full"></img>
                    </div>
                    <div className="utility-right-1">
                        <img src={FlashGrenade} alt="full"></img>
                        <img src={SmokeGrenade} alt="full"></img>
                        <img src={HeGrenade} alt="full"></img>
                    </div>
                    <div className="weapon-right-1">
                        <img src={Ak47} alt="full"></img>
                    </div>
                </div>

            </div>

            <div className="right-player-2">
                <div className="health-player-right-2">

                    <div className="nick-right-2">
                        LEG1JADZEKO11
                    </div>

                    <div className="armor-right-2">
                        <img src={ArmorFull} alt="full"></img>
                        <img src={LightArmor} alt="full"></img>
                    </div>
                    <div className="health-number-right-2">
                        100
                    </div>

                </div>

                <div className="player-info-right-2">
                    <div className="avatar-right-2">
                        <img src={User} alt="user" />
                    </div>
                    <div className="equipment-right-2">
                        <img src={Defuser} alt="full"></img>
                    </div>
                    <div className="utility-right-2">
                        <img src={FlashGrenade} alt="full"></img>
                        <img src={SmokeGrenade} alt="full"></img>
                        <img src={HeGrenade} alt="full"></img>
                    </div>
                    <div className="weapon-right-2">
                        <img src={Ak47} alt="full"></img>
                    </div>
                </div>
            </div>

            <div className="right-player-3">
                <div className="health-player-right-3">
                    <div className="nick-right-3">
                        kauk
                    </div>
                    <div className="armor-right-3">
                        <img src={ArmorFull} alt="full"></img>
                        <img src={LightArmor} alt="full"></img>
                    </div>
                    <div className="health-number-right-3">
                        100
                    </div>

                </div>

                <div className="player-info-right-3">
                    <div className="avatar-right-3">
                        <img src={User} alt="user" />
                    </div>
                    <div className="equipment-right-3">
                        <img src={Defuser} alt="full"></img>
                    </div>
                    <div className="utility-right-3">
                        <img src={FlashGrenade} alt="full"></img>
                        <img src={SmokeGrenade} alt="full"></img>
                        <img src={HeGrenade} alt="full"></img>
                    </div>
                    <div className="weapon-right-3">
                        <img src={Ak47} alt="full"></img>
                    </div>
                </div>
            </div>

            <div className="right-player-4">
                <div className="health-player-right-4">
                    <div className="nick-right-4">
                        aed1oN
                    </div>
                    <div className="armor-right-4">
                        <img src={ArmorFull} alt="full"></img>
                        <img src={LightArmor} alt="full"></img>
                    </div>
                    <div className="health-number-right-4">
                        100
                    </div>

                </div>

                <div className="player-info-right-4">
                    <div className="avatar-right-4">
                        <img src={User} alt="user" />
                    </div>
                    <div className="equipment-right-4">
                        <img src={Defuser} alt="full"></img>
                    </div>
                    <div className="utility-right-4">
                        <img src={FlashGrenade} alt="full"></img>
                        <img src={SmokeGrenade} alt="full"></img>
                        <img src={HeGrenade} alt="full"></img>
                    </div>
                    <div className="weapon-right-4">
                        <img src={Ak47} alt="full"></img>
                    </div>
                </div>
            </div>

            <div className="right-player-5">
                <div className="health-player-right-5">
                    <div className="nick-right-5">
                        AgresivaNNN
                    </div>
                    <div className="armor-right-5">
                        <img src={ArmorFull} alt="full"></img>
                        <img src={LightArmor} alt="full"></img>
                    </div>
                    <div className="health-number-right-5">
                        100
                    </div>
                </div>

                <div className="player-info-right-5">
                    <div className="avatar-right-5">
                        <img src={User} alt="user" />
                    </div>
                    <div className="equipment-right-5">
                        <img src={Defuser} alt="full"></img>
                    </div>
                    <div className="utility-right-5">
                        <img src={FlashGrenade} alt="full"></img>
                        <img src={SmokeGrenade} alt="full"></img>
                        <img src={HeGrenade} alt="full"></img>
                    </div>
                    <div className="weapon-right-5">
                        <img src={Ak47} alt="full"></img>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}


export default PlayersRight;