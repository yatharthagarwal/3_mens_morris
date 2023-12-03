// import Col from 'react-bootstrap/Col';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Row from 'react-bootstrap/Row';
// import Tab from 'react-bootstrap/Tab';
// import Form from 'react-bootstrap/Form';

// function TimerSelection() {
//   return (

//     <>
//       <Form.Label>Range</Form.Label>
//       <Form.Range />
//     </>

//     // <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
//     //   <Row>
//     //     <Col>
//     //       <ListGroup>
//     //         <ListGroup.Item action href="#three">
//     //           3
//     //         </ListGroup.Item>
//     //         <ListGroup.Item action href="#five">
//     //           5
//     //         </ListGroup.Item>
//     //         <ListGroup.Item action href="#ten">
//     //           10
//     //         </ListGroup.Item>
//     //       </ListGroup>
//     //     </Col>
//     //     <Col>
//     //       <Tab.Content>
//     //         <Tab.Pane eventKey="#three">3 Minutes</Tab.Pane>
//     //         <Tab.Pane eventKey="#five">5 Minutes</Tab.Pane>
//     //         <Tab.Pane eventKey="#ten">10 Minutes</Tab.Pane>
//     //       </Tab.Content>
//     //     </Col>
//     //   </Row>
//     // </Tab.Container>
//   );
// }

// export default TimerSelection;

import { useState } from "react";

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
      <div className="col-xl-2">
        <div className="input-group">
          <div className="input-group-prepend">
            <button className="btn btn-primary" type="button" onClick={decNum}>-</button>
          </div>
          <input type="text" className="form-control" value={num} onChange={handleChange} />
          <div className="input-group-prepend">
            <button className="btn btn-primary" type="button" onClick={incNum}>+</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default IncDecCounter;