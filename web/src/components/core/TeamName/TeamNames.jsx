import React from 'react';

import TeamLeft from './team-left/TeamLeft';
import TeamRight from './team-right/TeamRight';


const TeamNames = (props) =>{
    return(
        <React.Fragment>
            <TeamLeft />
            <TeamRight />
        </React.Fragment>
    );
}

export default TeamNames;