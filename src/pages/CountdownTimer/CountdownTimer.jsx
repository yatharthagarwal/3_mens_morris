import { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, ListGroup } from 'react-bootstrap';
// import { getRemainingTime } from './Utils/CountdownTimerUtils'
// import { CountDownTimer } from './Utils/CountdownTimerUtils';

const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    // hours: '00',
}

const CountdownTimer = ({ CountdownTimestampMs, startGame, resetGame, pauseGame, myCountDownTimer, turn, setWin }) => {
    const [remainingTime, setremainingTime] = useState(defaultRemainingTime);
    const [initialTime, setInitialTime] = useState(defaultRemainingTime);

    // const myCountDownTimer = new CountDownTimer();

    useEffect(() => {
        console.log("happeninh for : ", turn);
        console.log("resetGame: ", resetGame);
        console.log("pauseGame", pauseGame);
        console.log("startGame", startGame);
        if (startGame && remainingTime.minutes == 0 && remainingTime.seconds == 0) {
            setWin(`${1 - turn}`);
        }
        if (resetGame) {
            setremainingTime(myCountDownTimer.getRemainingTime(CountdownTimestampMs, true, false));
        } else if (pauseGame) {
            setremainingTime(myCountDownTimer.getRemainingTime(CountdownTimestampMs, false, true));
        } else if (startGame && resetGame) {
            setremainingTime(myCountDownTimer.getRemainingTime(CountdownTimestampMs, resetGame));
        } else if (startGame) {
            console.log('started: ');
            if (initialTime == defaultRemainingTime) {
                setInitialTime(myCountDownTimer.getRemainingTime(CountdownTimestampMs));
            }
            const intervalId = setInterval(() => {
                updateRemainingTime(CountdownTimestampMs);
            }, 1000);
            return () => clearInterval(intervalId)
        }
    }, [CountdownTimestampMs, startGame, turn, resetGame, pauseGame, remainingTime])

    function updateRemainingTime(countdown) {
        setremainingTime(myCountDownTimer.getRemainingTime(countdown))
    }

    return (
        <ListGroup horizontal>
            <span className="countdown-timer">
                <div className='two-numbers'>{remainingTime.minutes}</div>
                <div>:</div>
                <div className='two-numbers'>{remainingTime.seconds}</div>
            </span>
            <span className="countdown-timer">
                <div className='two-numbers'>{initialTime.minutes}</div>
                <div>:</div>
                <div className='two-numbers'>{initialTime.seconds}</div>
            </span>
        </ListGroup>
        // <Container fluid>
        //     <Row>
        //         <Col>
        //             <span className="countdown-timer">
        //                 <div className='two-numbers'>{remainingTime.minutes}</div>
        //                 <div>:</div>
        //                 <div className='two-numbers'>{remainingTime.seconds}</div>
        //             </span>
        //         </Col>
        //         <Col>
        //             <span className="countdown-timer">
        //                 <div className='two-numbers'>{initialTime.minutes}</div>
        //                 <div>:</div>
        //                 <div className='two-numbers'>{initialTime.seconds}</div>
        //             </span>
        //         </Col>
        //     </Row>
        // </Container>
    )
}

export default CountdownTimer;