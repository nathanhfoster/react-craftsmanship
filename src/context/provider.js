import React, { createContext, useMemo, useReducer } from 'react'
import PropTypes from 'prop-types'
import { isAFunction } from './utils'

const defaultInitializer = state => state

// This allows actions to dispatch other actions and pass (dispatch, getState)
const augmentDispatch = (dispatch, state) => input => {
  const getState = () => state
  return isAFunction(input) ? input(dispatch, getState) : dispatch(input)
}

const ContextProvider = ({ context, reducer, initialState, initializer, children }) => {

  // setup useReducer with the returned values of the combineReducers
  const [state, dispatch] = useReducer(reducer, initialState, initializer)

  // dispatch doesn't need to be a dependency because the reference is always the same
  const augmentedDispatch = useMemo(() => augmentDispatch(dispatch, state), [])

  // make our context object value
  const contextValue = useMemo(() => ({ state, dispatch: augmentedDispatch }), [
    state,
    augmentedDispatch,
  ])

  return <context.Provider value={contextValue}>{children}</context.Provider>
}

ContextProvider.propTypes = {
  reducer: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.func.isRequired), PropTypes.func])
    .isRequired,
  initialState: PropTypes.object.isRequired,
  initializer: PropTypes.func,
  persistKey: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
}

ContextProvider.defaultProps = {
  context: createContext(),
  initialState: {},
  initializer: defaultInitializer,
}

export default ContextProvider
