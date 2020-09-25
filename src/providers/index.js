import React from 'react'
import { ContextProvider, FormWithUseContextAndReducerContext } from 'context'
import { Forms, DEFAULT_STATE_FORMS } from 'redux/Form/reducer'

const FormWithUseContextAndReducerProvider = ({ children }) => (
  <ContextProvider
    context={FormWithUseContextAndReducerContext}
    reducer={Forms}
    initialState={DEFAULT_STATE_FORMS}
  >
    {children}
  </ContextProvider>
)

export { FormWithUseContextAndReducerProvider }
