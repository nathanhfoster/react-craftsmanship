import React from 'react';
import { MemoizedContextProvider } from 'resurrection';
import {
  FormWithUseContextAndReducerStateContext,
  FormWithUseContextAndReducerDispatchContext
} from 'context';
import { Forms } from 'redux/Form/reducer';

const FormWithUseContextAndReducerProvider = ({ children }) => (
  <MemoizedContextProvider
    stateContext={FormWithUseContextAndReducerStateContext}
    dispatchContext={FormWithUseContextAndReducerDispatchContext}
    reducers={Forms}
  >
    {children}
  </MemoizedContextProvider>
);

export { FormWithUseContextAndReducerProvider };
