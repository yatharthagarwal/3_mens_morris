import React, { useEffect, useState } from 'react';
import Board from "./Board";
import CountdownTimer from "./CountdownTimer/CountdownTimer"
import Button from 'react-bootstrap/Button';
import GameConfiguration from './game-config';
import { ButtonGroup, Container, Row, Col } from 'react-bootstrap';
import { CountDownTimer } from '../pages/CountdownTimer/Utils/CountdownTimerUtils';

const Arena = () => {
    const [modalShow, setModalShow] = useState(false);
    const [playerOneTimer, setPlayerOneTimer] = useState(0);
    const [playerTwoTimer, setPlayerTwoTimer] = useState(0);
    const [startPlayerOne, setStartPlayerOneValue] = useState(false);
    const [resetPlayerOne, setResetPlayerOneValue] = useState(false);
    const [pausePlayerOne, setPausePlayerOneValue] = useState(false);
    const [startPlayerTwo, setStartPlayerTwoValue] = useState(false);
    const [resetPlayerTwo, setResetPlayerTwoValue] = useState(false);
    const [pausePlayerTwo, setPausePlayerTwoValue] = useState(false);
    const [myCountDownTimer1, setmyCountDownTimer1] = useState(new CountDownTimer());
    const [myCountDownTimer2, setmyCountDownTimer2] = useState(new CountDownTimer());

    // let myCountDownTimer1, myCountDownTimer2;
    // useEffect(() => {
    //     myCountDownTimer1 = new CountDownTimer();
    //     myCountDownTimer2 = new CountDownTimer();
    // }, []);

    function settimevalue(val) {
        setPlayerOneTimer(val * 60000)
        setPlayerTwoTimer(val * 60000)
    }
    return (
        <div className="arena">
            <div>
                <ButtonGroup>
                    <Button variant="primary" onClick={() => { setModalShow(true); setResetPlayerOneValue(true); setStartPlayerOneValue(false); setPausePlayerOneValue(false); setResetPlayerTwoValue(true); setStartPlayerTwoValue(false); setPausePlayerTwoValue(false); }}>
                        Configure Game Settings
                    </Button>
                    <GameConfiguration
                        showModal={modalShow}
                        onHide={() => setModalShow(false)}
                        settimevalue={settimevalue}
                    />
                </ButtonGroup>
            </div>
            <div className="comps">
                <div className="player">
                    <Container>
                        <Row>
                            <Col md={5}>
                                <CountdownTimer className='timer'
                                    CountdownTimestampMs={playerOneTimer}
                                    startGame={startPlayerOne}
                                    pauseGame={pausePlayerOne}
                                    resetGame={resetPlayerOne}
                                    myCountDownTimer={myCountDownTimer1}
                                />
                            </Col>
                            <Col md={4}>
                                <p className="player-label-white">White</p>
                            </Col>
                            <Col md={3}>
                                <ButtonGroup size="lg">
                                    <Button variant="warning" onClick={() => { setStartPlayerOneValue(true); setResetPlayerOneValue(false); setPausePlayerOneValue(false) }}>
                                        Start
                                    </Button>
                                </ButtonGroup> {' '}
                                <ButtonGroup size="lg">
                                    <Button variant="danger" onClick={() => { setPausePlayerOneValue(false); setResetPlayerOneValue(false); setStartPlayerOneValue(false) }}>
                                        Pause
                                    </Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="board-area">
                    <Board />
                </div>
                <div className="player">
                    <Container>
                        <Row>
                            <Col md={5}>
                                <CountdownTimer className='timer'
                                    CountdownTimestampMs={playerTwoTimer}
                                    startGame={startPlayerTwo}
                                    pauseGame={pausePlayerTwo}
                                    resetGame={resetPlayerTwo}
                                    myCountDownTimer={myCountDownTimer2}
                                />
                            </Col>
                            <Col md={4}>
                                <p className="player-label-black">Black</p>
                            </Col>
                            <Col md={3}>
                                <ButtonGroup size="lg">
                                    <Button variant="warning" onClick={() => { setStartPlayerTwoValue(true); setResetPlayerTwoValue(false); setPausePlayerTwoValue(false) }}>
                                        Start
                                    </Button>
                                </ButtonGroup> {' '}
                                <ButtonGroup size="lg">
                                    <Button variant="danger" onClick={() => { setPausePlayerTwoValue(false); setResetPlayerTwoValue(false); setStartPlayerTwoValue(false) }}>
                                        Pause
                                    </Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div >
    )
}

export default Arena;