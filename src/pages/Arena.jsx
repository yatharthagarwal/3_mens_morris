import React, { useEffect, useState } from 'react';
import Board from "./Board";
import CountdownTimer from "./CountdownTimer/CountdownTimer"
import Button from 'react-bootstrap/Button';
import GameConfiguration from './game-config';
import { ButtonGroup, Container, Row, Col, Alert } from 'react-bootstrap';
import { CountDownTimer } from '../pages/CountdownTimer/Utils/CountdownTimerUtils';
import Counter from './Counter';
import Swal from 'sweetalert2';

const Arena = () => {
    const [modalOneShow, setModalOneShow] = useState(false);
    const [modalTwoShow, setModalTwoShow] = useState(false);
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
    const [turn, changeTurn] = useState(0);
    const [whiteCount, decWhiteCount] = useState(9);
    const [blackCount, decBlackCount] = useState(9);
    const [win, setWin] = useState('');

    // function settimevalue(val) {
    //     setPlayerOneTimer(val * 60000)
    //     setPlayerTwoTimer(val * 60000)
    // }

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
        if (win.length > 0) {
            console.log('win lem: ' + win.length);
            Swal.fire({
                title: `Player ${win == '0' ? 'WHITE' : 'BLACK'} WON!`,
            });
        }
    }, [startGame, turn, win]);

    function play() {
        if (playerOneTimer === 0 || playerTwoTimer === 0) {
            // alert('Please set timer ');
            Swal.fire("Please set timer");
        } else {
            setStartGame(true);
            changeTurn(0);
        }
    }

    return (
        <div className="arena">
            <div className="comps">
                <Container>
                    <Row className="player">
                        <Col className='timer' lg={2}>
                            <CountdownTimer className='timer'
                                CountdownTimestampMs={playerOneTimer}
                                startGame={startPlayerOne}
                                pauseGame={pausePlayerOne}
                                resetGame={resetPlayerOne}
                                myCountDownTimer={myCountDownTimer1}
                                turn={turn}
                                setWin={setWin}
                            />
                            <ButtonGroup>
                                <Button variant="primary" onClick={() => { setModalOneShow(true); setResetPlayerOne(true); setStartPlayerOne(false); setPausePlayerOne(false); }}>
                                    SET TIMER
                                </Button>
                                <GameConfiguration
                                    showModal={modalOneShow}
                                    onHide={() => setModalOneShow(false)}
                                    settimevalue={setPlayerOneTimer}
                                />
                            </ButtonGroup>
                        </Col>
                        <Col>
                            <Counter counter={whiteCount} />
                        </Col>
                        <Col>
                            <p className="player-label-white">White</p>
                        </Col>
                        <Col>
                            <ButtonGroup size="sm">
                                <Button variant="warning" disabled={turn == 1} onClick={() => { setStartPlayerOne(true); setResetPlayerOne(false); setPausePlayerOne(false) }}>
                                    Start
                                </Button>
                            </ButtonGroup> {' '}
                            <ButtonGroup size="sm">
                                <Button variant="danger" disabled={turn == 1} onClick={() => { setPausePlayerOne(false); setResetPlayerOne(false); setStartPlayerOne(false) }}>
                                    Pause
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    <Row style={{ margin: '20px' }}>
                        {/* <div className="board-area"> */}
                        <Col  >
                            <Button className='animate__bounce' onClick={play}>PLAY</Button>
                        </Col>
                        <Col lg={11}>
                            <Board
                                changeTurn={changeTurn}
                                turn={turn}
                                decWhiteCount={decWhiteCount}
                                decBlackCount={decBlackCount}
                                whiteCount={whiteCount}
                                blackCount={blackCount}
                                pausePlayerOne={pausePlayerOne}
                                pausePlayerTwo={pausePlayerTwo}
                                setWin={setWin} />
                        </Col>
                        {/* </div> */}
                    </Row>
                    <Row>
                        {/* <div className="player" xl={{ span: 6, order: 4, offset: 3 }}>
                            <Container autoFocus={turn == 1}> */}
                        <Row className="player">
                            <Col className='timer' lg={2}>
                                <CountdownTimer className='timer'
                                    CountdownTimestampMs={playerTwoTimer}
                                    startGame={startPlayerTwo}
                                    pauseGame={pausePlayerTwo}
                                    resetGame={resetPlayerTwo}
                                    myCountDownTimer={myCountDownTimer2}
                                    turn={turn}
                                    setWin={setWin}
                                />
                                <ButtonGroup>
                                    <Button variant="primary" onClick={() => { setModalTwoShow(true); setResetPlayerTwo(true); setStartPlayerTwo(false); setPausePlayerTwo(false); }}>
                                        SET TIMER
                                    </Button>
                                    <GameConfiguration
                                        showModal={modalTwoShow}
                                        onHide={() => setModalTwoShow(false)}
                                        settimevalue={setPlayerTwoTimer}
                                    // setStartGame={setStartGame}
                                    // changeTurn={changeTurn}
                                    />
                                </ButtonGroup>
                            </Col>
                            <Col>
                                <Counter counter={blackCount} />
                            </Col>
                            <Col>
                                <p className="player-label-black">Black</p>
                            </Col>
                            <Col>
                                <ButtonGroup size="sm">
                                    <Button variant="warning" disabled={turn == 0} onClick={() => { setStartPlayerTwo(true); setResetPlayerTwo(false); setPausePlayerTwo(false) }}>
                                        Start
                                    </Button>
                                </ButtonGroup> {' '}
                                <ButtonGroup size="sm">
                                    <Button variant="danger" disabled={turn == 0} onClick={() => { setPausePlayerTwo(false); setResetPlayerTwo(false); setStartPlayerTwo(false) }}>
                                        Pause
                                    </Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                        {/* </Container>
            </div> */}
                    </Row>
                </Container >
            </div >
        </div >
    )
}

export default Arena;