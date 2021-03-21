import React, {useContext} from 'react';
import {SocketContext} from '../Socket/Socket'


const Crosshair = (props) =>{

    const socket = useContext(SocketContext);

    return(
        <React.Fragment>
                <div className="crosshair">
                    +
                </div>
        </React.Fragment>
    );
}

export default Crosshair;