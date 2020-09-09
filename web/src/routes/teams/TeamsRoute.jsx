import React from 'react';
import {Link} from "react-router-dom";

class TeamsRoute extends React.Component{

    render(){        
        return(
            <Link className="nav-icon" to="/teams">Teams
             
            </Link>
        );
    }
}


export default TeamsRoute;