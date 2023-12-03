import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';

const Counter = ({ counter }) => {
    // const [counter, setCounter] = useState(9);

    // const handleIncrement = () => {
    //     setCounter(counter + 1)
    // }

    // const handleDecrement = () => {
    //     setCounter(counter - 1)
    // }

    return (
        <Card style={{ fontSize: '1.5rem', color: 'orange', width: '10rem', backgroundImage: 'url(../assets/card.png)', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>
            <Card.Body>
                <center>
                    <Card.Title>Counter</Card.Title>
                    <Card.Text>
                        {counter}
                    </Card.Text>
                    {/* <Button onClick={handleIncrement} variant="primary">Inc</Button>
                    <Button onClick={handleDecrement} variant="secondary">Dec</Button> */}
                </center>
            </Card.Body>
        </Card>
    )
}

export default Counter;