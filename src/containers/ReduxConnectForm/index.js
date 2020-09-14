import React from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'reactstrap';
import { ReduxBasicInput } from 'components';
import { getFormFieldName } from 'redux/Form/utils';
import { getEmptyArrayOfInputs } from 'redux/Form/utils';

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
