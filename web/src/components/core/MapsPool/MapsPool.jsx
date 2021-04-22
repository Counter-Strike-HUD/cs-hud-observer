import React from 'react';


const MapsPool = ({type, pool}) =>{
    return(
        <React.Fragment>
            <div className="mode-and-maps">
                <span className="mode">
                    {type && type === 'bo1' && 'Best of 1'}
                    {type && type === 'bo3' && 'Best of 3'}
                    {type && type === 'bo5' && 'Best of 5'}
                </span> 
                {
                    pool && pool.map(map =>{
                        return <span key={map} className="maps-playing">
                            {map}
                        </span>
                    })
                }
                
            </div>
        </React.Fragment>
    );
}

export default MapsPool;