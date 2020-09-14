import { FormActionTypes } from './types';
import { DEFAULT_NUMBER_OF_INPUT_FIELDS, getRandomFields } from './utils';

const formFields = getRandomFields();

// Object of 50 input fields
const DEFAULT_STATE_FORMS = {
  numberOfInputFields: DEFAULT_NUMBER_OF_INPUT_FIELDS,
  form1: formFields,
  form2: formFields,
};

const Forms = (state = DEFAULT_STATE_FORMS, action) => {
  const { type, formKey, fieldKey, payload } = action;
  switch (type) {
    case FormActionTypes.FORM_SET_NUMBER_OF_INPUT_FIELDS:
      const newFormFields = getRandomFields(payload);
      return {
        ...state,
        numberOfInputFields: payload,
        form1: newFormFields,
        form2: newFormFields,
      };

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
