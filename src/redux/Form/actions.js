import { FormActionTypes } from './types';

// Destructure event.target
const handleOnFormChange = ({ target: { name, value, checked } }) => ({
  type: FormActionTypes.FORM_ON_CHANGE,
  id: name,
  payload: checked || value,
});

export { handleOnFormChange };
