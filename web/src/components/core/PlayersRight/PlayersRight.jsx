import React from 'react';



const PlayersRight = React.memo(({players}) =>{

    return(
        <React.Fragment>
            {
                players && players.map((player, index)=>{

                    const i = index + 1;
                    
                  return  (
                    <div key={i} className={`right-player-${i}`}>

                    {!player.dead &&
                        <div className={`health-player-right-${i}`} style={{backgroundImage: `linear-gradient(to left, rgba(68, 71, 253, 1) ${player.health}%, rgba(48,54,97,1) ${player.health}%, rgba(48,54,97,1) 100%)`, }}>
                            <div className={`nick-right-${i}`}>
                                {player.player_nickname}
                            </div>
                            <div className={`armor-right-${i}`}>
                                {player.small_kevlar && <img src={require(`../../screen/resources/images/31.png`)} alt="full"></img>}
                                {player.full_kevlar && <img src={require(`../../screen/resources/images/32.png`)} alt="full"></img>}
                            </div>
                            <div className={`health-number-right-${i}`}>
                                {player.health}
                            </div>
                        </div>}
                    
                    {player.dead &&

                        <div className={`health-player-right-${i} dead`} style={{backgroundImage: `linear-gradient(90deg, rgba(85,85,85,0.3701855742296919) 0%, rgba(85,85,85,0.773546918767507) 35%, rgba(85,85,85,1) 100%, rgba(85,85,85,1) 100%)`}}>
                            <div className={`nick-right-${i}`}>
                                {player.player_nickname}
                            </div>
                        </div>
                    }
                    
                    {!player.dead &&
                        <div className={`player-info-right-${i}`}>
                            <div className={`avatar-right-${i}`}>
                                <img src={require(`../../screen/resources/images/unknown-user.png`)} alt="user" />
                            </div>
                            <div className={`equipment-right-${i}`}>
                                {player.defuse && 
                                    <img src={require(`../../screen/resources/images/33.png`)} alt="defuse"></img>}
                            </div>
                            <div className={`utility-right-${i}`}>

                                { 
                                    player.equipment.map((item, index)=>{
                                        return <img key={index} src={require(`../../screen/resources/images/${item}.png`)} alt="equipment"></img>
                                    })
                                }
                                
                            </div>
                            <div className={`weapon-right-${i}`}>
                                {player.current_weapon && 
                                <img src={require(`../../screen/resources/images/${players[index].current_weapon}.png`)} alt="full"></img> }
                            </div>
                        </div>}

                        {player.dead &&

                            <div className={`player-info-right-${i}`} style={{backgroundImage: `linear-gradient(90deg, rgba(85,85,85,0.3701855742296919) 0%, rgba(85,85,85,0.773546918767507) 35%, rgba(85,85,85,1) 100%, rgba(85,85,85,1) 100%)`}}>
                                <div className={`avatar-right-${i}`}>
                                    <img src={require(`../../screen/resources/images/skull.png`)} alt="user" />
                                </div>

                                <div className={`weapon-right-${i}`}>
                                    <strong style={{color: 'white'}}>$ {player.money}</strong>
                                </div>
                            </div>}
                </div>
                   )
                })
            }
            
           
        </React.Fragment>
    );
    
});

export default PlayersRight;