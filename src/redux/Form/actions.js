import { FormActionTypes } from './types';

const setNumberOfInputFields = payload => ({
  type: FormActionTypes.FORM_SET_NUMBER_OF_INPUT_FIELDS,
  payload
});

const toggleShouldMemoizeInputFields = () => ({
  type: FormActionTypes.FORM_TOGGLE_SHOW_MEMOIZED_COMPONENTS
});

// Destructure event.target
const handleOnFormChange = (
  formKey,
  { target: { id, name, value, type, checked, files } }
) => {
  let payload = value;
  if (type === 'checkbox' || type === 'radio') {
    payload = checked;
  }
  return {
    type: FormActionTypes.FORM_ON_CHANGE,
    formKey,
    fieldKey: name,
    payload
  };
};

export {
  setNumberOfInputFields,
  toggleShouldMemoizeInputFields,
  handleOnFormChange
};
