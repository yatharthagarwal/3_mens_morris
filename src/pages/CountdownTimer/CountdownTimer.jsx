import { useState, useEffect } from 'react';
// import { getRemainingTime } from './Utils/CountdownTimerUtils'
// import { CountDownTimer } from './Utils/CountdownTimerUtils';

const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
}

const CountdownTimer = ({ CountdownTimestampMs, startGame, resetGame, pauseGame, myCountDownTimer, turn }) => {
    const [remainingTime, setremainingTime] = useState(defaultRemainingTime);

    // const myCountDownTimer = new CountDownTimer();

    useEffect(() => {
        console.log("happeninh for : ", turn);
        console.log("resetGame: ", resetGame);
        console.log("pauseGame", pauseGame);
        console.log("startGame", startGame);
        if (resetGame) {
            setremainingTime(myCountDownTimer.getRemainingTime(CountdownTimestampMs, true, false));
        } else if (pauseGame) {
            setremainingTime(myCountDownTimer.getRemainingTime(CountdownTimestampMs, false, true));
        } else if (startGame && resetGame) {
            setremainingTime(myCountDownTimer.getRemainingTime(CountdownTimestampMs, resetGame));
        } else if (startGame) {
            console.log('started: ');
            const intervalId = setInterval(() => {
                updateRemainingTime(CountdownTimestampMs);
            }, 1000);
            return () => clearInterval(intervalId)
        }
    }, [CountdownTimestampMs, startGame, turn, resetGame, pauseGame])

    function updateRemainingTime(countdown) {
        setremainingTime(myCountDownTimer.getRemainingTime(countdown))
    }

    return (
        <div className="countdown-timer">
            <span className='two-numbers'>{remainingTime.hours}</span>
            <span>:</span>
            <span className='two-numbers'>{remainingTime.minutes}</span>
            <span>:</span>
            <span className='two-numbers'>{remainingTime.seconds}</span>
        </div>
    )
}

export default CountdownTimer;