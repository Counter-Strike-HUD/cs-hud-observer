import React, { useEffect, useState }  from 'react';



/**
 * Render function for a defined time period
*/

const KillItem = (props) =>{

    const {killer, victim} = props;

    const [visible, setVisible] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setVisible(false);
      }, props.delay);
    }, [props.delay]);

    return visible ? 
        <React.Fragment>
            <div className="kill">
                <span className={ `${killer.side}-style`}>{killer.name}</span>
                    {/*<img src={Ak47} alt="full"></img>*/}
                <span className={ `${victim.side}-style`}>{victim.name}</span>
            </div> 
        </React.Fragment>
    : <div />
}

export default KillItem;