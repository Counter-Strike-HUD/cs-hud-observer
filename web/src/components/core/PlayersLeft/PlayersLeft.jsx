import React from 'react';



const PlayersLeft = React.memo(({players}) =>{


    return(
        <React.Fragment>
            {
                players && players.map((player, index)=>{
         
                    const i = index + 1;
                    
                  return  (
                    <div key={i} className={`left-player-${i}`}>

                        {!player.dead &&
                            <div className={`health-player-left-${i}`} style={{backgroundImage: `linear-gradient(90deg, rgba(235,55,55,1) ${player.health}%, rgba(48,54,97,1) ${player.health}%, rgba(48,54,97,1) 100%)`, }}>
                                <div className={`nick-left-${i}`}>
                                    {player.player_nickname}
                                </div>
                                <div className={`armor-left-${i}`}>
                                    {player.small_kevlar && <img src={require(`../../screen/resources/images/31.png`)} alt="full"></img>}
                                    {player.full_kevlar && <img src={require(`../../screen/resources/images/32.png`)} alt="full"></img>}
                                </div>
                                <div className={`health-number-left-${i}`}>
                                    {player.health}
                                </div>
                            </div>}
                        
                        {player.dead &&

                            <div className={`health-player-left-${i} dead`} style={{backgroundImage: `linear-gradient(90deg, rgba(85,85,85,1) 0%, rgba(85,85,85,1) 35%, rgba(85,85,85,0.773546918767507) 100%, rgba(85,85,85,0.3701855742296919) 100%)`}}>
                                <div className={`nick-left-${i}`}>
                                    {player.player_nickname}
                                </div>
                            </div>
                        }
                        
                        {!player.dead &&
                            <div className={`player-info-left-${i}`}>
                                <div className={`avatar-left-${i}`}>
                                    <img src={require(`../../screen/resources/images/unknown-user.png`)} alt="user" />
                                </div>
                                <div className={`equipment-left-${i}`}>
                                    {player.c4 && 
                                        <img src={require(`../../screen/resources/images/6.png`)} alt="c4"></img>}
                                </div>
                                <div className={`utility-left-${i}`}>

                                    { 
                                        player.equipment.map((item, index)=>{
                                            return <img key={index} src={require(`../../screen/resources/images/${item}.png`)} alt="equipment"></img>
                                        })
                                    }
                                    
                                </div>
                                <div className={`weapon-left-${i}`}>
                                    {player.current_weapon && 
                                    <img src={require(`../../screen/resources/images/${players[index].current_weapon}.png`)} alt="full"></img> }
                                </div>
                            </div>}

                            {player.dead &&

                                <div className={`player-info-left-${i}`} style={{backgroundImage: `linear-gradient(90deg, rgba(85,85,85,1) 0%, rgba(85,85,85,1) 35%, rgba(85,85,85,0.773546918767507) 100%, rgba(85,85,85,0.3701855742296919) 100%)`}}>
                                    <div className={`avatar-left-${i}`}>
                                        <img src={require(`../../screen/resources/images/skull.png`)} alt="user" />
                                    </div>

                                    <div className={`weapon-left-${i}`}>
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

export default PlayersLeft;