import React, { createContext, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { combineReducers, shallowEquals } from './utils'
import useReducerWithThunk from './hooks/useReducerWithThunk'

const storeFactory = () => ({
  isReady: false,
  dispatch: () => {
    console.error('Store is NOT ready!')
  },
  getState: () => {
    console.error('Store is NOT ready!')
  },
})
// Use this only if you want to use a global reducer for your whole app
const store = storeFactory()

const StateProvider = createContext(null)

const defaultInitializer = state => state

/**
 * Context Store Factory that simulates Redux's createStore API
 * @param {Object} props - ContextStore props
 * @returns {React.ContextProvider} - a React Context with the store as it's value
 */
const ContextStore = ({
  context: Context,
  reducers,
  initialState,
  props,
  initializer,
  children,
}) => {
  // call the function to get initial state and global reducer
  const [mainState, mainReducer] = useMemo(
    () => combineReducers(reducers, initialState || props),
    [],
  )

  // setup useReducer with the returned values of the combineReducers
  const [state, dispatch] = useReducerWithThunk(mainReducer, mainState, initializer)

  // Update store object to potentially access it outside of a component
  useEffect(() => {
    if (!store.isReady) {
      store.isReady = true
      store.dispatch = dispatch
      store.getState = () => state
      // Object.freeze(store) // don't freeze the object, or store.isReady can't be re-assigned
    }
    return () => {
      store.isReady = false
    }
  }, [state, dispatch])

  /* Overwriting the reducer state with props allows this component
   * to be both controlled if props are passed
   * or uncontrolled by default */
  // make our context object value
  const contextValue = useMemo(
    () => ({
      state: {
        ...state,
        ...(props && {
          ...props,
        }),
      },
      dispatch,
    }),
    [state, props, dispatch],
  )

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}

ContextStore.propTypes = {
  context: PropTypes.shape({}),
  reducers: PropTypes.oneOfType([PropTypes.func, PropTypes.objectOf(PropTypes.func)]).isRequired,
  initialState: PropTypes.shape({}),
  props: PropTypes.shape({}),
  initializer: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node,
    PropTypes.func,
    PropTypes.symbol,
    PropTypes.object,
    PropTypes.elementType,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.arrayOf(PropTypes.func),
    PropTypes.arrayOf(PropTypes.symbol),
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.arrayOf(PropTypes.elementType),
  ]).isRequired,
}

ContextStore.defaultProps = {
  context: StateProvider,
  initializer: defaultInitializer,
  initialState: undefined,
  props: undefined,
}

const MemoizedContextProvider = React.memo(ContextStore, shallowEquals)

export {
  StateProvider as ContextConsumer,
  ContextStore as ContextProvider,
  MemoizedContextProvider,
  store,
}
