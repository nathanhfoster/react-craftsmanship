import { createContext } from 'react';
import { DEFAULT_STATE_FORMS } from 'redux/Form/reducer';

const FormWithUseContextAndReducerStateContext =
  createContext(DEFAULT_STATE_FORMS);
FormWithUseContextAndReducerStateContext.displayName =
  'FormWithUseContextAndReducerStateContext';
const FormWithUseContextAndReducerDispatchContext = createContext(null);
FormWithUseContextAndReducerDispatchContext.displayName =
  'FormWithUseContextAndReducerDispatchContext';

// we implement areMergedPropsEqual to only mount the input fields once to the DOM
const FormWithUseContextAndReducerOptions = {
  stateContext: FormWithUseContextAndReducerStateContext,
  dispatchContext: FormWithUseContextAndReducerDispatchContext,
  areMergedPropsEqual: (prevState, nextState) => {
    const areEqual =
      prevState.renderInputs.length === nextState.renderInputs.length;
    return areEqual;
  }
};

const FormInputWithUseContextAndReducerOptions = {
  stateContext: FormWithUseContextAndReducerStateContext,
  dispatchContext: FormWithUseContextAndReducerDispatchContext,
  areMergedPropsEqual: (prevState, nextState) => {
    const areEqual =
      prevState.value === nextState.value && prevState.type === nextState.type;

    return areEqual;
  }
};

export {
  FormWithUseContextAndReducerStateContext,
  FormWithUseContextAndReducerDispatchContext,
  FormWithUseContextAndReducerOptions,
  FormInputWithUseContextAndReducerOptions
};
