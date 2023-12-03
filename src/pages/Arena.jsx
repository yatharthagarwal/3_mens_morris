import { React, useState } from 'react';
import Board from "./Board";
import CountdownTimer from "./CountdownTimer/CountdownTimer"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import GameConfiguration from './game-config';

const Arena = (props) => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="arena">
            <div>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Configure Game Settings
                </Button>
                <GameConfiguration
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
            <div className="comps">
                <div className="player">
                    <p className="player-label">Player 1</p>
                    <CountdownTimer className='timer'
                    CountdownTimestampMs={1709999999999}/>
                </div>
                <div className="board-area">
                    <Board />
                </div>
                <div className="player">
                    <p className="player-label">Player 2</p>
                    <CountdownTimer className='timer'
                    CountdownTimestampMs={1709999999999}/>
                </div>
            </div>
        </div>
    )
}

export default Arena;