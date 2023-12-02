import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import IncDecCounter from './timer-selection';

const GameConfiguration = ({ settimevalue, onHide, showModal }) => {
    function choosetimer(value) {
        console.log('choosetimer: ' + value);
        settimevalue(value);
    }

    return (
        <div>
            <Modal
                show={showModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h3>Configuration</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='timer-selection'>
                        <span>Timer</span>
                        <IncDecCounter choosetimer={choosetimer} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>Start</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default GameConfiguration;