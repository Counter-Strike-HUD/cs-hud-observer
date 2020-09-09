import React from 'react';
import {Link} from "react-router-dom";

class PlayersRoute extends React.Component{

    render(){        
        return(
            <Link className="nav-icon" to="/players">Players
             
            </Link>
        );
    }
}


export default PlayersRoute;