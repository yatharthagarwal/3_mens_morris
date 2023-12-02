import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';

function TimerSelection() {
  return (

    <>
      <Form.Label>Range</Form.Label>
      <Form.Range />
    </>

    // <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
    //   <Row>
    //     <Col>
    //       <ListGroup>
    //         <ListGroup.Item action href="#three">
    //           3
    //         </ListGroup.Item>
    //         <ListGroup.Item action href="#five">
    //           5
    //         </ListGroup.Item>
    //         <ListGroup.Item action href="#ten">
    //           10
    //         </ListGroup.Item>
    //       </ListGroup>
    //     </Col>
    //     <Col>
    //       <Tab.Content>
    //         <Tab.Pane eventKey="#three">3 Minutes</Tab.Pane>
    //         <Tab.Pane eventKey="#five">5 Minutes</Tab.Pane>
    //         <Tab.Pane eventKey="#ten">10 Minutes</Tab.Pane>
    //       </Tab.Content>
    //     </Col>
    //   </Row>
    // </Tab.Container>
  );
}

export default TimerSelection;