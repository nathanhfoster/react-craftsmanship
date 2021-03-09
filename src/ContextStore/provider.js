import React, { createContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import { combineReducers, shallowEquals } from './utils';

const StateProvider = createContext({});

const defaultInitializer = state => state;

/**
   * Context Store Factory that simulates Redux's createStore API
   * @param {Object} props - ContextStore props
   * @returns {React.Context} - a React Context with the store as it's value
   */
const ContextStore = ({
 reducers,
 initialState,
 props,
 initializer,
 context: Context,
 children,
}) => {
  // call the function to get initial state and global reducer
  const [mainState, mainReducer] = useMemo(
    () => combineReducers(reducers, initialState || props),
    [],
  );

  // setup useReducer with the returned values of the combineReducers
  const [state, dispatch] = useReducer(mainReducer, mainState, initializer);

  /* Overwriting the reducer state with props allows this component
   * to be both controlled if props are passed
   * or uncontrolled by default */
  // make our context object value
  const contextValue = useMemo(
    () => ({ state: { ...state, ...props }, dispatch }),
    [state, props],
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

ContextStore.propTypes = {
  reducers: PropTypes.oneOfType([PropTypes.func, PropTypes.objectOf(PropTypes.func)]).isRequired,
  initialState: PropTypes.shape({}),
  props: PropTypes.shape({}),
  initializer: PropTypes.func,
  context: PropTypes.shape({}),
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
};

ContextStore.defaultProps = {
  initializer: defaultInitializer,
  initialState: {},
  props: {},
  context: StateProvider,
};

const MemoizedContextProvider = React.memo(ContextStore, shallowEquals);

export {
  StateProvider as ContextConsumer,
  ContextStore as ContextProvider,
  MemoizedContextProvider,
};
