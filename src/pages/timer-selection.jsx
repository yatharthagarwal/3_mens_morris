import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

function IncDecCounter({ choosetimer }) {
  let [num, setNum] = useState(0);
  const incNum = () => {
    setNum(Number(num) + 1);
    choosetimer(Number(num) + 1);
  };
  const decNum = () => {
    if (num > 0) {
      setNum(num - 1);
      choosetimer(num - 1);
    }
  }
  const handleChange = (e) => {
    setNum(e.target.value);
    choosetimer(e.target.value);
  }

  return (
    <>
      <div className="d-grid gap-1">
        <Button size="lg" variant="primary" onClick={decNum} style={{ borderRadius: '5px' }}>-</Button>
        <input type="text" className="" value={num} onChange={handleChange} />
        <Button size="lg" variant="primary" onClick={incNum} style={{ borderRadius: '5px' }}>+</Button>

        {/* <Container fluid>
          <Row>
            <Col md={4}>
              <Button size="lg" variant="primary" onClick={decNum} style={{ borderRadius: '5px' }}>-</Button>
            </Col>
            <Col lg={4}>
              <input type="text" className="form-control" value={num} onChange={handleChange} />
            </Col>
            <Col lg={4}>
              <Button size="lg" variant="primary" onClick={incNum} style={{ borderRadius: '5px' }}>+</Button>
            </Col>
          </Row>
        </Container> */}
        {/* <div className="input-group">
          <div className="input-group-prepend">
            <button className="btn btn-primary" type="button" onClick={decNum} style={{ borderRadius: '50%' }}>-</button>
          </div> {' '}
          <input type="text" className="form-control" value={num} onChange={handleChange} />
          <div className="input-group-prepend">
            <button className="btn btn-primary" type="button" onClick={incNum} style={{ borderRadius: '50%' }}>+</button>
          </div>
        </div> */}
      </div >
    </>
  );
}

export default IncDecCounter;