import { FormActionTypes } from './types';
const NUMBER_OF_INPUT_FIELDS = 50;
const EMPTY_ARRAY_OF_INPUT_FIELDS = new Array(NUMBER_OF_INPUT_FIELDS).fill();

// Object of 50 input fields
const DEFAULT_STATE_FORM = EMPTY_ARRAY_OF_INPUT_FIELDS.reduce(
  (defaultState, field, index) => {
    defaultState[`field-${index}`] = '';
    return defaultState;
  },
  {},
);

const Form = (state = DEFAULT_STATE_FORM, action) => {
  const { type, id, payload } = action;
  switch (type) {
    case FormActionTypes.FORM_ON_CHANGE:
      return {
        ...state,
        [id]: payload,
      };

    default:
      return state;
  }
};

export {
  NUMBER_OF_INPUT_FIELDS,
  EMPTY_ARRAY_OF_INPUT_FIELDS,
  DEFAULT_STATE_FORM,
  Form,
};
