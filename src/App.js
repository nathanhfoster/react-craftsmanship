import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import {
  ReduxSetNumberOfFields,
  ReduxBasicForm,
  ReduxConnectForm,
} from 'containers';

const App = () => {
  return (
    <Container tag='main'>
      <Row tag='h1' className='justify-content-center'>
        React Form Memoziation
      </Row>
      <Row className='my-3'>
        <Col tag='h3'>Number of input fields</Col>
        <Col>
          <ReduxSetNumberOfFields />
        </Col>
      </Row>
      <Row className='border'>
        <Col xs={6}>
          <ReduxBasicForm />
        </Col>
        <Col xs={6}>
          <h2 className='text-center'>Redux connect</h2>
          <ReduxConnectForm />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
