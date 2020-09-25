import { createContext } from 'react'
import ContextProvider from './provider'
import connect from './connect'
import { useSelector, useDispatch, usePrevious } from './hooks'

const FormWithUseContextAndReducerContext = createContext({})

export {
  ContextProvider,
  connect,
  useSelector,
  useDispatch,
  usePrevious,
  FormWithUseContextAndReducerContext,
}
