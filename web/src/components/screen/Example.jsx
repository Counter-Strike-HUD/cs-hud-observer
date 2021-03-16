import React from 'react';

import TeamNames from '../core/TeamName/TeamNames';
import Crosshair from '../core/Crosshair/Crosshair';
import MapsPool from '../core/MapsPool/MapsPool';
import Radar from '../core/Radar/Radar';
import Kill from '../core/Kill/Kill';
import Score from '../core/Score/Score';

import ArmorFull from './resources/images/assaultsuit.png';
import LightArmor from './resources/images/kevlar.png';
import Ak47 from './resources/images/ak47.png';
import FlashGrenade from './resources/images/flash_grenade.png';
import HeGrenade from './resources/images/explosive_grenade.png';
import SmokeGrenade from './resources/images/smoke_grenade.png';
import C4 from './resources/images/c4.png';
import Defuser from './resources/images/defuser.png';

import User from './resources/images/unknown-user.png';

import './Screen.css'


function Example() { 

        return(
            <div>
               <div className="grid-container">
                
                    <Crosshair />

                    <Score />

                    <TeamNames teamleft='MYSTERIOUS' teamright='INFECTORS' />

                    <div className="box-left">
                       
                        <MapsPool />

                        <Radar />

                    </div>

                    <div className="box-right">
                        <Kill />
                    </div>
                    
                    <div className="team-box-left">
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

                    </div>
                    
                    
                    <div className="team-box-right">
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
                    </div>
                    <div className="player-info">

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
                      
                    </div>
                </div>
            </div>       
        );
    
}

export default Example;