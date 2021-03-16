import React from 'react';

const TeamLeft = (props) =>{
    return(
        <div className="team-left">
            <p>
                {props.teamleft || 'TEAM 1'}
            </p> 
        </div>
    );
}

export default TeamLeft;