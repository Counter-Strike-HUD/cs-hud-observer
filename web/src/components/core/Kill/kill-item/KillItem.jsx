import React, { useEffect, useState }  from 'react';



/**
 * Render function for a defined time period
*/

const KillItem = (props) =>{

    const {killer, victim} = props;

    const [visible, setVisible] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setVisible(false);
      }, props.delay);
    }, [props.delay]);

    return visible ? 
        <React.Fragment>
            {!props.killinfo.suicide &&
                <div className="kill">
                    
                    {props.killinfo.killer_flashed && <img style={{marginLeft: '4px'}} src={require(`../../../screen/resources/images/flashed_kill.png`)} alt="full"></img>} 
                    
                    <span className={ `${killer.side}-style`}>{killer.name}</span>
                    
                    <img src={require(`../../../screen/resources/images/${props.killinfo.weapon_id}.png`)} alt="full"></img>
                    
                    {props.killinfo.victim_flashed && <img style={{marginLeft: '4px'}} src={require(`../../../screen/resources/images/flashed_kill.png`)} alt="flashed"></img>} 
                    {props.killinfo.headshot && <img style={{height: '16px', width: '16px', marginLeft: '4px'}} src={require(`../../../screen/resources/images/headshot.png`)} alt="hs"></img>} 
                    {props.killinfo.wallbang && <img style={{marginLeft: '4px'}} src={require(`../../../screen/resources/images/wallbang.png`)} alt="full"></img>} 

                    <span className={ `${victim.side}-style`}>{victim.name}</span>
                </div> 
            }
            {
               props.killinfo.suicide &&

               <div className="kill">
                    
               {props.killinfo.suicide_reason === 'kill' && <img style={{height: '16px', width: '16px', marginLeft: '4px'}} src={require(`../../../screen/resources/images/skull.png`)} alt="skull"></img>} 
               {props.killinfo.suicide_reason === 'weapon_c4'  && <img style={{height: '16px', width: '16px', marginLeft: '4px'}} src={require(`../../../screen/resources/images/6.png`)} alt="c4"></img>} 
               {props.killinfo.suicide_reason === 'fall' && <img style={{height: '16px', width: '16px', marginLeft: '4px'}} src={require(`../../../screen/resources/images/skull.png`)} alt="skull"></img>} 
               {props.killinfo.suicide_reason === 'weapon_hegrenade' && <img style={{height: '16px', width: '16px', marginLeft: '4px'}} src={require(`../../../screen/resources/images/4.png`)} alt="he"></img>} 

               <span className={ `${victim.side}-style`}>{victim.name}</span>
           </div> 
            }
        </React.Fragment>
    : <div />
}

export default KillItem;