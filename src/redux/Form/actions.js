import { FormActionTypes } from './types';

const setNumberOfInputFields = payload => ({
  type: FormActionTypes.FORM_SET_NUMBER_OF_INPUT_FIELDS,
  payload,
});

// Destructure event.target
const handleOnFormChange = (formKey, { target: { name, value, checked } }) => ({
  type: FormActionTypes.FORM_ON_CHANGE,
  formKey,
  fieldKey: name,
  payload: checked || value,
});

export { setNumberOfInputFields, handleOnFormChange };
