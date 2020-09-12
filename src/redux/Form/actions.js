import { FormActionTypes } from './types';

// Destructure event.target
const handleOnFormChange = (formKey, { target: { name, value, checked } }) => ({
  type: FormActionTypes.FORM_ON_CHANGE,
  formKey,
  fieldKey: name,
  payload: checked || value,
});

export { handleOnFormChange };
