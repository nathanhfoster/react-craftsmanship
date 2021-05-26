import React, { createContext } from 'react';

const FormWithUseContextAndReducerContext = createContext(null);

// we implement areMergedPropsEqual to only mount the input fields once to the DOM
const FormWithUseContextAndReducerOptions = {
  context: FormWithUseContextAndReducerContext,
  areMergedPropsEqual: (prevState, nextState) => {
    const areEqual = prevState.renderInputs.length === nextState.renderInputs.length;
    console.log(
      FormWithUseContextAndReducerContext,
      FormWithUseContextAndReducerContext.__proto__.isPrototypeOf(
        FormWithUseContextAndReducerContext,
      ),
      FormWithUseContextAndReducerContext.$$typeof == 'Symbol(react.context)',
    );
    return areEqual;
  },
};

const FormInputWithUseContextAndReducerOptions = {
  context: FormWithUseContextAndReducerContext,
  areMergedPropsEqual: (prevState, nextState) => {
    const areEqual = prevState.value === nextState.value && prevState.type === nextState.type;

    return areEqual;
  },
};

export {
  FormWithUseContextAndReducerContext,
  FormWithUseContextAndReducerOptions,
  FormInputWithUseContextAndReducerOptions,
};
