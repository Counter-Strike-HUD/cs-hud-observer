import React from 'react';

const Score = (props) =>{

    const {logoLeft, logoRight } = props;

    return(
        <div className="score">
                            
            <div className="streak-left">
                --
            </div>
            <div className="streak-right">
                --
            </div>

            <div className="logo-left-area">
                <img src={`assets/teams/${logoLeft}`} alt=""/>
            </div>

            
            <div className="left-score">
                <p>{props.team1score}</p>
            </div>

            <div className="middle">
                <p>
                    1:35
                </p>     
            </div>

            <div className="right-score">
                <p>{props.team2score}</p>
            </div>

            <div className="logo-right-area">
                <img src={`assets/teams/${logoRight}`} alt=""/>
            </div>
                

            <div className="info">
                test
            </div>
        </div>
    );
}

export default Score;