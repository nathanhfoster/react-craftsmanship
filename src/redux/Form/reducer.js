import { FormActionTypes } from './types'
import { DEFAULT_NUMBER_OF_INPUT_FIELDS, getRandomFields } from './utils'

const formFields = getRandomFields()

const DEFAULT_STATE_FORMS = {
  numberOfInputFields: DEFAULT_NUMBER_OF_INPUT_FIELDS,
  form1: formFields,
  form2: formFields,
  form3: formFields,
  shouldMemoizeInputFields: false,
}

const Forms = (state = DEFAULT_STATE_FORMS, action) => {
  const { type, formKey, fieldKey, payload } = action
  switch (type) {
    case FormActionTypes.FORM_SET_NUMBER_OF_INPUT_FIELDS:
      const newFormFields = getRandomFields(payload)
      return {
        ...state,
        numberOfInputFields: payload,
        form1: newFormFields,
        form2: newFormFields,
        form3: newFormFields,
      }

    case FormActionTypes.FORM_TOGGLE_SHOW_MEMOIZED_COMPONENTS:
      return {
        ...state,
        shouldMemoizeInputFields: !state.shouldMemoizeInputFields,
      }

    case FormActionTypes.FORM_ON_CHANGE:
      const currentForm = state[formKey]
      const currentInputField = state[formKey][fieldKey]

      return {
        ...state,
        [formKey]: {
          ...currentForm,
          [fieldKey]: { ...currentInputField, value: payload },
        },
      }

    default:
      return state
  }
}

export { DEFAULT_STATE_FORMS, Forms }
