import React, { useMemo, memo } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { BasicForm } from './components';
import { EMPTY_ARRAY_OF_INPUT_FIELDS } from './redux/Form/reducer';
import { handleOnFormChange } from './redux/Form/actions';
import { FormProps } from './redux/Form/propTypes';
import { inputTypes } from './components/BasicInput/propTypes';
import { getRandomInt } from './utils';

const SELECT_INPUT_OPTIONS = EMPTY_ARRAY_OF_INPUT_FIELDS.map((field, i) => ({ name: i }));

const mapStateToProps = ({ Form }) => ({ Form });

const mapDispatchToProps = { handleOnFormChange };

const App = ({ Form, handleOnFormChange }) => {

  const initialFormFieldTypesMap = useMemo(
    () =>
      Object.keys(Form).reduce((typeMap, key) => {
        const randomTypeIndex = getRandomInt(0, inputTypes.length);
        const randomType = inputTypes[randomTypeIndex];
        typeMap[key] = randomType;

        return typeMap;
      }, {}),
    [],
  );

  const basicFormInputs = useMemo(
    () =>
      Object.entries(Form).map(([key, value]) => {
        return {
          name: key,
          type: initialFormFieldTypesMap[key],
          options: SELECT_INPUT_OPTIONS,
          // label: key.toUpperCase(),
          placeholder: `...${key}`,
          value,
          // propReferenceInequality: () =>
          //   console.log(
          //     'This returns a new function reference in memory every time which breaks prop inequality',
          //   ),
        };
      }),
    [Form],
  );

  return (
    <Container tag='main'>
      <Row tag='h1' className='justify-content-center'>
        React Form Memoziation
      </Row>
      <Row>
        <Col xs={12}>
          <BasicForm inputs={basicFormInputs} onChange={handleOnFormChange} />
        </Col>
      </Row>
    </Container>
  );
};

App.propTypes = { Form: FormProps };

export default connect(mapStateToProps, mapDispatchToProps)(memo(App));
