import { FormActionTypes } from './types'
import {
  NUMBER_OF_INPUT_FIELDS,
  EMPTY_ARRAY_OF_INPUT_FIELDS,
  getFormFieldName,
} from './utils'

// Object of 50 input fields
const DEFAULT_STATE_FORM = EMPTY_ARRAY_OF_INPUT_FIELDS.reduce(
  (defaultState, field, index) => {
    const name = getFormFieldName(index)
    defaultState[name] = ''
    return defaultState
  },
  {},
)

const Form = (state = DEFAULT_STATE_FORM, action) => {
  const { type, id, payload } = action
  switch (type) {
    case FormActionTypes.FORM_ON_CHANGE:
      return {
        ...state,
        [id]: payload,
      }

    default:
      return state
  }
}

export { DEFAULT_STATE_FORM, Form }
