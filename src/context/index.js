import { createContext } from 'react'

const FormWithUseContextAndReducerContext = createContext(null)

// we implement areStatePropsEqual to only mount the input fields once to the DOM
const FormWithUseContextAndReducerOptions = {
  context: FormWithUseContextAndReducerContext,
  areStatePropsEqual: (prevState, nextState) => {
    const areEqual = prevState.renderInputs.length === nextState.renderInputs.length

    return areEqual
  },
}

const FormInputWithUseContextAndReducerOptions = {
  context: FormWithUseContextAndReducerContext,
  areStatePropsEqual: (prevState, nextState) => {
    const areEqual = prevState.value === nextState.value

    return areEqual
  },
}

export {
  FormWithUseContextAndReducerContext,
  FormWithUseContextAndReducerOptions,
  FormInputWithUseContextAndReducerOptions,
}
