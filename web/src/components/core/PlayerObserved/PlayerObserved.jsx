import React from 'react';


const PlayerObserved =  React.memo(({players})=>{

    const spectaded = players.filter(player => player.spectate === true);

    return(

        <React.Fragment>

            {players && spectaded && spectaded.map((player, index) =>

                <React.Fragment key={index} >

                    <div className="player-spectaded-upper-layer">

                        <div className="player-spectaded-name">
                            {player.player_nickname}
                        </div>

                        <div className="player-spectaded-health">
                            + {player.health}
                        </div>

                        <div className="player-spectaded-gear">
                            {player.small_kevlar && <img src={require(`../../screen/resources/images/31.png`)} alt="full"></img>}
                            {player.full_kevlar && <img src={require(`../../screen/resources/images/32.png`)} alt="full"></img>}
                        </div>
                    </div>

                    <div className="player-spectaded-down-layer">
                        
                        <div className="player-spectaded-utility">
                            { 
                                player.equipment.map((item, index)=>{
                                    return <img key={index} src={require(`../../screen/resources/images/${item}.png`)} alt="equipment"></img>
                                })
                            }
                        </div>

                        <div className="player-spectaded-avatar">
                            <img src={require(`../../screen/resources/images/unknown-user.png`)} alt="user" />
                        </div>

                        <div className="player-spectaded-amunition">
                            {player.current_weapon === player.secondary_weapon ? <React.Fragment>{player.secondary_ammo_current} / {player.secondary_ammo_reserve}</React.Fragment> : ''}
                            {player.current_weapon === player.primary_weapon ? <React.Fragment>{player.primary_ammo_current} / {player.primary_ammo_reserve}</React.Fragment> : ''}
                        </div>
                    </div>
                </React.Fragment>
            )}

        </React.Fragment>
    );
  
});

export default PlayerObserved;