import React from 'react';



export default function PlayerLeft (props) {


    return(
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
                    {/*<img src={Ak47} alt="full"></img>*/}
                </div>
            </div>
        </div>
    )

}