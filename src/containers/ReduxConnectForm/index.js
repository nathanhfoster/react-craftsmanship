import React from 'react';
import { Form } from 'reactstrap';
import { ReduxBasicInput } from 'components';
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

const ReduxConnectForm = () => <Form>{RENDER_REDUX_BASIC_INPUTS}</Form>;

export default ReduxConnectForm;
