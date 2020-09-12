import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { ReduxBasicForm, ReduxBasicInput } from 'containers';
import { handleOnFormChange } from 'redux/Form/actions';
import { getFormFieldName } from 'redux/Form/utils';
import { EMPTY_ARRAY_OF_INPUT_FIELDS } from 'redux/Form/utils';

const mapStateToProps = ({ Form }) => ({ Form });

const mapDispatchToProps = { handleOnFormChange };

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
        <Col xs={6} className='p-0'>
          <ReduxBasicForm />
        </Col>
        <Col xs={6} className='p-0'>
          {RENDER_REDUX_BASIC_INPUTS}
        </Col>
      </Row>
    </Container>
  );
};

App.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
