import React from 'react';

const TeamRight= (props) =>{
    return(
        <div className="team-right">
            <p>
                {props.teamright || 'TEAM 2'}
            </p> 
        </div>
    );
}

export default TeamRight;