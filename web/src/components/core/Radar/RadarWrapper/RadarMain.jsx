import React from 'react';


const RadarMain = (props) =>{

    return(
        <div className="map" style={{ backgroundImage: `url( ${require('./maps/' + props.mapName + '.png') } )` }}>
           
        </div>
    );
}

export default RadarMain;