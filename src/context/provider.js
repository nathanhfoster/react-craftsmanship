import React, { createContext, useMemo, useReducer } from 'react'
import PropTypes from 'prop-types'

const defaultInitializer = state => state

const ContextProvider = ({ context, reducer, initialState, initializer, children }) => {
  // setup useReducer with the returned values of the combineReducers
  const [state, dispatch] = useReducer(reducer, initialState, initializer)

  // make our context object value
  const contextValue = useMemo(() => ({ state, dispatch }), [state])

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
