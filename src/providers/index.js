import React from "react"
import { MemoizedContextProvider } from "resurrection"
import { FormWithUseContextAndReducerContext } from "context"
import { Forms, DEFAULT_STATE_FORMS } from "redux/Form/reducer"

const FormWithUseContextAndReducerProvider = ({ children }) => (
  <MemoizedContextProvider
    name="Form with useContext and useReducer"
    context={FormWithUseContextAndReducerContext}
    reducers={Forms}
    initialState={DEFAULT_STATE_FORMS}
  >
    {children}
  </MemoizedContextProvider>
)

export { FormWithUseContextAndReducerProvider }
