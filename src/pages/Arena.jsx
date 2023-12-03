import React, { useEffect, useState } from 'react';
import Board from "./Board";
import CountdownTimer from "./CountdownTimer/CountdownTimer"
import Button from 'react-bootstrap/Button';
import GameConfiguration from './game-config';
import { ButtonGroup, Container, Row, Col } from 'react-bootstrap';
import { CountDownTimer } from '../pages/CountdownTimer/Utils/CountdownTimerUtils';

const Arena = () => {
    const [modalShow, setModalShow] = useState(false);
    const [startGame, setStartGame] = useState(false);
    const [playerOneTimer, setPlayerOneTimer] = useState(0);
    const [playerTwoTimer, setPlayerTwoTimer] = useState(0);
    const [startPlayerOne, setStartPlayerOne] = useState(false);
    const [resetPlayerOne, setResetPlayerOne] = useState(false);
    const [pausePlayerOne, setPausePlayerOne] = useState(false);
    const [startPlayerTwo, setStartPlayerTwo] = useState(false);
    const [resetPlayerTwo, setResetPlayerTwo] = useState(false);
    const [pausePlayerTwo, setPausePlayerTwo] = useState(false);
    const [myCountDownTimer1, setmyCountDownTimer1] = useState(new CountDownTimer());
    const [myCountDownTimer2, setmyCountDownTimer2] = useState(new CountDownTimer());
    // const [turn, setTurn] = useState(-1);
    const [turn, changeTurn] = useState(0)

    function settimevalue(val) {
        setPlayerOneTimer(val * 60000)
        setPlayerTwoTimer(val * 60000)
    }

    useEffect(() => {
        console.log('startGame: ' + startGame);
        if (startGame) {
            console.log('turn: ', turn, ' got chance');
            setResetPlayerOne(false);
            setResetPlayerTwo(false);
            if (turn == 0) {
                console.log('running player 1');
                setPausePlayerTwo(true);
                setPausePlayerOne(false);
                setStartPlayerOne(true);
            } else {
                setPausePlayerOne(true);
                setPausePlayerTwo(false);
                setStartPlayerTwo(true);
            }
        }
    }, [startGame, turn]);

    return (
        <div className="arena">
            <div>
                <ButtonGroup>
                    <Button variant="primary" onClick={() => { setModalShow(true); setResetPlayerOne(true); setStartPlayerOne(false); setPausePlayerOne(false); setResetPlayerTwo(true); setStartPlayerTwo(false); setPausePlayerTwo(false); }}>
                        Configure Game Settings
                    </Button>
                    <GameConfiguration
                        showModal={modalShow}
                        onHide={() => setModalShow(false)}
                        settimevalue={settimevalue}
                        setStartGame={setStartGame}
                        changeTurn={changeTurn}
                    />
                </ButtonGroup>
            </div>
            <div className="comps">
                <div className="player">
                    <Container autoFocus={turn == 0}>
                        <Row>
                            <Col md={5}>
                                <CountdownTimer className='timer'
                                    CountdownTimestampMs={playerOneTimer}
                                    startGame={startPlayerOne}
                                    pauseGame={pausePlayerOne}
                                    resetGame={resetPlayerOne}
                                    myCountDownTimer={myCountDownTimer1}
                                    turn={turn}
                                />
                            </Col>
                            <Col md={4}>
                                <p className="player-label-white">White</p>
                            </Col>
                            <Col md={3}>
                                <ButtonGroup size="lg">
                                    <Button variant="warning" disabled={turn == 1} onClick={() => { setStartPlayerOne(true); setResetPlayerOne(false); setPausePlayerOne(false) }}>
                                        Start
                                    </Button>
                                </ButtonGroup> {' '}
                                <ButtonGroup size="lg">
                                    <Button variant="danger" disabled={turn == 1} onClick={() => { setPausePlayerOne(false); setResetPlayerOne(false); setStartPlayerOne(false) }}>
                                        Pause
                                    </Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="board-area">
                    <Board changeTurn={changeTurn} turn={turn} />
                </div>
                <div className="player" style={{ marginBottom: '25px' }}>
                    <Container autoFocus={turn == 1}>
                        <Row>
                            <Col md={5}>
                                <CountdownTimer className='timer'
                                    CountdownTimestampMs={playerTwoTimer}
                                    startGame={startPlayerTwo}
                                    pauseGame={pausePlayerTwo}
                                    resetGame={resetPlayerTwo}
                                    myCountDownTimer={myCountDownTimer2}
                                    turn={turn}
                                />
                            </Col>
                            <Col md={4}>
                                <p className="player-label-black">Black</p>
                            </Col>
                            <Col md={3}>
                                <ButtonGroup size="lg">
                                    <Button variant="warning" disabled={turn == 0} onClick={() => { setStartPlayerTwo(true); setResetPlayerTwo(false); setPausePlayerTwo(false) }}>
                                        Start
                                    </Button>
                                </ButtonGroup> {' '}
                                <ButtonGroup size="lg">
                                    <Button variant="danger" disabled={turn == 0} onClick={() => { setPausePlayerTwo(false); setResetPlayerTwo(false); setStartPlayerTwo(false) }}>
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