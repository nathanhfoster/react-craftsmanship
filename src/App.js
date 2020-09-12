import React from 'react';
import { Container, Row, Col, Form } from 'reactstrap';
import { ReduxBasicForm, ReduxBasicInput } from 'containers';
import { getFormFieldName } from 'redux/Form/utils';
import { EMPTY_ARRAY_OF_INPUT_FIELDS } from 'redux/Form/utils';

const RENDER_REDUX_BASIC_INPUTS = EMPTY_ARRAY_OF_INPUT_FIELDS.map(
  (type, index) => {
    const fieldKey = getFormFieldName(index);
    return (
      <ReduxBasicInput
        key={`ReduxBasicInput-${index}`}
        reducerKey='form2'
        fieldKey={fieldKey}
      />
    );
  },
);

const App = () => {
  return (
    <Container tag='main'>
      <Row tag='h1' className='justify-content-center'>
        React Form Memoziation
      </Row>
      <Row>
        <Col xs={6}>
          <ReduxBasicForm />
        </Col>
        <Col xs={6}>
          <h2 className="text-center">Redux</h2>
          <Form>{RENDER_REDUX_BASIC_INPUTS}</Form>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
