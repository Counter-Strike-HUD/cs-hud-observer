import React from 'react';
import KillItem from './kill-item/KillItem';

const Kill = (props) =>{

    return (
        <React.Fragment>
                <div className="wrapper">
                    <KillItem victim={{side: 'ct', name: 'kalle 1'}} killer={{side: 'tt', name: 'kauk 1'}}  delay="5000" />
                    <KillItem victim={{side: 'ct', name: 'kalle 1'}} killer={{side: 'tt', name: 'kauk 1'}}  delay="6000" />
                    <KillItem victim={{side: 'ct', name: 'kalle 1'}} killer={{side: 'tt', name: 'kauk 1'}}  delay="6000" />
                    <KillItem victim={{side: 'ct', name: 'kalle 1'}} killer={{side: 'tt', name: 'kauk 1'}}  delay="7000" />
                    <KillItem victim={{side: 'ct', name: 'kalle 1'}} killer={{side: 'tt', name: 'kauk 1'}}  delay="8000" />
                    <KillItem victim={{side: 'ct', name: 'kalle 1'}} killer={{side: 'tt', name: 'kauk 1'}}  delay="9000" />

                </div>   
        </React.Fragment>
    );
}

export default Kill;