import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Manual = (props) => {
    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton style={{background: 'rgb(255, 220, 177)'}}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h2 className="manualheading">Manual</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{background: 'rgb(255, 220, 177)'}}>
                    <div className='manual'>
                        <div>
                            <p id="sub-heading" className="common">Objectives</p>
                            <p id="description" className="common">
                                The basic aim of Nine Mens Morris is to make "mills" - vertical or horizontal lines of three in a row. Every time this is achieved, an opponent's piece is removed, the overall objective being to reduce the number of opponent's pieces to less than three or to render the opponent unable to play. To begin with the board is empty.
                            </p>
                            <p id="sub-heading" className="common">Basic Play</p>
                            <p id="description" className="common">
                                White plays first. Play is in two phases. To begin with, players take turns to play a piece of their own colour on any unoccupied point until all eighteen pieces have been played. After that, play continues alternately but each turn consists of a player moving one piece along a line to an adjacent point. During both of these phases, whenever a player achieves a mill, that player immediately removes from the board one piece belonging to the opponent that does not form part of a mill. If all the opponents pieces form mills then an exception is made and the player is allowed to remove any piece. It is only upon the formation of a mill that a piece is captured but a player will often break a mill by moving a piece out of it and then, in a subsequent turn, play the piece back again, thus forming a new mill and capturing another piece. Captured pieces are never replayed onto the board and remain captured for the remainder of the game. The game is finished when a player loses either by being reduced to two pieces or by being unable to move.
                            </p>
                            <p id="sub-heading" className="common">Betting</p>
                            <p id="description" className="common">
                                Players choose to place bets on their time. If a player's time exhausts before defeating the opponent, the player loses. While lower time bets are exciting, it is fair to be cautious when making bets.
                            </p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{background: 'rgb(255, 220, 177)'}}>
                    <Button onClick={props.onHide}>Done</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Manual;