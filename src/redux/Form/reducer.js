import { FormActionTypes } from './types';
import { getRandomFields } from './utils';

const formFields = getRandomFields()

// Object of 50 input fields
const DEFAULT_STATE_FORMS = {
  form1: formFields,
  form2: formFields,
};

const Forms = (state = DEFAULT_STATE_FORMS, action) => {
  const { type, formKey, fieldKey, payload } = action;
  switch (type) {
    case FormActionTypes.FORM_ON_CHANGE:
      return {
        ...state,
        [formKey]: {
          ...state[formKey],
          [fieldKey]: payload,
        },
      };

    default:
      return state;
  }
};

export { DEFAULT_STATE_FORMS, Forms };
