import React from 'react';
import { MemoizedContextProvider } from 'resurrection';
import { FormWithUseContextAndReducerContext } from 'context';
import { Forms } from 'redux/Form/reducer';

const FormWithUseContextAndReducerProvider = ({ children }) => (
  <MemoizedContextProvider
    name='formWithUseContextAndUseReducer'
    context={FormWithUseContextAndReducerContext}
    reducers={Forms}
  >
    {children}
  </MemoizedContextProvider>
);

export { FormWithUseContextAndReducerProvider };
