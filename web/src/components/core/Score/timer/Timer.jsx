import React from 'react';


// Prepend `0` for one digit numbers. For that the number has to be
// converted to string, as numbers don't have length method
const padTime = time => {
    return String(time).length === 1 ? `0${time}` : `${time}`;
  };
  
const format = time => {
// Convert seconds into minutes and take the whole part
const minutes = Math.floor(time / 60);

// Get the seconds left after converting minutes
const seconds = time % 60;

//Return combined values as string in format mm:ss
return `${minutes}:${padTime(seconds)}`;
};


const Timer = ({seconds, mode}) =>{

    const [counter, setCounter] = React.useState(seconds);
    React.useEffect(() => {
      let timer;
      if (counter > 0) {
        timer = setTimeout(() => setCounter(c => c - 1), 1000);
      }
  
      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }, [counter]);
  
    return (
        <React.Fragment>
            {counter === 0 ? <div style={{color: 'red'}}>0:0</div> : <div>{counter <= 10 ? <div style={{color: 'red'}}>{format(counter)}</div> : <div>{format(counter)}</div>}</div>}
        </React.Fragment>
    );

}


export default Timer;