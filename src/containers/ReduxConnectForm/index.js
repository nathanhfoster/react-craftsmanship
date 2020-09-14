import React from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'reactstrap';
import { ReduxBasicInput } from 'components';
import { getFormFieldName } from 'redux/Form/utils';
import { getEmptyArrayOfInputs } from 'redux/Form/utils';

// Use if field keys in redux are known
const RENDER_REDUX_BASIC_INPUTS = getEmptyArrayOfInputs().map((type, index) => {
  const fieldKey = getFormFieldName(index);
  return (
    <ReduxBasicInput
      key={`ReduxBasicInput-${index}`}
      reducerKey='form2'
      fieldKey={fieldKey}
    />
  );
});

// useSelector and the equality function if fields are not known.
const isEqual = (nextSelection, prevSelection) => {
  const areEqualLength = prevSelection.length === nextSelection.length;
  return areEqualLength;
};

const ReduxConnectForm = () => {
  const renderInputs = useSelector(
    ({ Forms: { form2 } }) =>
      Object.keys(form2).map(fieldKey => (
        <ReduxBasicInput
          key={fieldKey}
          reducerKey='form2'
          fieldKey={fieldKey}
        />
      )),
    isEqual,
  );

  return <Form>{renderInputs}</Form>;
};

export default ReduxConnectForm;
