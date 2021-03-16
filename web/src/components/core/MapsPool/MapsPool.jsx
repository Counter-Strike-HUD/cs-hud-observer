import React from 'react';


const MapsPool = (props) =>{
    return(
        <React.Fragment>
            <div className="mode-and-maps">
                <span className="mode">
                    Best of 3
                </span> 
                <span className="maps-playing">
                    MIRAGE
                </span>
                <span className="maps-playing active">
                    DUST2
                </span>
                <span className="maps-playing">
                    NUKE
                </span>
            </div>
        </React.Fragment>
    );
}

export default MapsPool;