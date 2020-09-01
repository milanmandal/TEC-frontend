import React from 'react';

import Countdown from 'react-countdown';

import './Timer.Styles.css'
import { Redirect } from 'react-router-dom';

const Timer = ({time, currentPath}) => {
    if(currentPath ==='round1'){
        return(
            <Countdown date={Date.now() + time*1000}>
            {
                <Redirect to='/round1/score' />
            }
            </Countdown>
        )
    }
    if(currentPath === 'round2'){
        return(
            <Countdown date={Date.now() + time*1000}>
            {
                <Redirect to='/round2/score' />
            }
            </Countdown>
        )
    }
    if(currentPath === 'round3'){
        return(
            <Countdown date={Date.now() + time*1000}>
            {
                <Redirect to='/round3/score' />
            }
            </Countdown>
        )
    }
    else{
        return(null)
    }
}


export default Timer;