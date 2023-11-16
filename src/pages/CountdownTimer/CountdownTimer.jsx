import {  useState, useEffect } from 'react';
import { getRemainingTime } from './Utils/CountdownTimerUtils'

const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
}

const CountdownTimer = ({CountdownTimestampMs}) => {
    const [remainingTime, setremainingTime] = useState(defaultRemainingTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(CountdownTimestampMs);
        }, 1000);
        return () => clearInterval(intervalId)
    }, [CountdownTimestampMs])

    function updateRemainingTime(countdown) {
        setremainingTime(getRemainingTime(countdown))
    }

    return (
        <div className="countdown-timer">
            <span className='two-numbers'>{remainingTime.hours}</span>
            <span>:</span>
            <span className='two-numbers'>{remainingTime.minutes}</span>
            <span>:</span>
            <span className='two-numbers'>{remainingTime.seconds}</span>
            {/* <span>:</span> */}
        </div>
    )
}

export default CountdownTimer;