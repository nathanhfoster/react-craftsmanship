import Form from "reactstrap/lib/Form";
import { FormActionTypes } from './types';
import {
  DEFAULT_NUMBER_OF_INPUT_FIELDS,
  getRandomFields,
  getRandFormFieldTypesMap,
} from './utils';

const formFields = getRandomFields();
const randFormFieldTypesMap = getRandFormFieldTypesMap(formFields);

// Object of 50 input fields
const DEFAULT_STATE_FORMS = {
  numberOfInputFields: DEFAULT_NUMBER_OF_INPUT_FIELDS,
  form1: formFields,
  form2: formFields,
  randFormFieldTypesMap,
  shouldMemoizeInputFields: false
};

const Forms = (state = DEFAULT_STATE_FORMS, action) => {
  const { type, formKey, fieldKey, payload } = action;
  switch (type) {
    case FormActionTypes.FORM_SET_NUMBER_OF_INPUT_FIELDS:
      const newFormFields = getRandomFields(payload);
      const newRandFormFieldTypesMap = getRandFormFieldTypesMap(newFormFields);
      return {
        ...state,
        numberOfInputFields: payload,
        form1: newFormFields,
        form2: newFormFields,
        randFormFieldTypesMap: newRandFormFieldTypesMap,
      };

      case FormActionTypes.FORM_TOGGLE_SHOW_MEMOIZED_COMPONENTS:
        return {
          ...state, 
          shouldMemoizeInputFields: !state.shouldMemoizeInputFields
        }

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
