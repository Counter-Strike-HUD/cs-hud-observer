import React from 'react';
import {Link} from "react-router-dom";

class MatchesRoute extends React.Component{

    render(){        
        return(
            <Link className="nav-icon" to="/matches">Matches
             
            </Link>
        );
    }
}


export default MatchesRoute;