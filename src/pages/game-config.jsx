import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TimerSelection from './timer-selection';

const GameConfiguration = (props) => {
   return (
    <div>
        <Modal
            {...props}
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
                    <h4 id="timer-label">Timer</h4>
                    <TimerSelection />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Done</Button>
            </Modal.Footer>
        </Modal>
    </div>
   )
}

export default GameConfiguration;