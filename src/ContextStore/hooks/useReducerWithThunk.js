import { useCallback, useEffect, useRef, useState } from 'react'
import { isFunction, getNextStateControlledFromProps } from '../utils'
/**
 * @function Thunk
 * @param {Dispatch} dispatch
 * @param {Function} getState
 * @returns {void|*}
 */

/**
 * @function Dispatch
 * @param {Object|Thunk} action
 * @returns {void|*}
 */

/**
 * Augments React's useReducer() hook so that the action
 * dispatcher supports thunks.
 * @param {Function} reducer - reducer
 * @param {Object=} initialState - initialState
 * @param {Function=} initializer - initializer
 * @param {Object=} props - props to make the state controlled from a HOC
 * @returns {Array.<*, Dispatch>} - the new useReducer hook
 */
const useReducerWithThunk = (reducer, initialState, initializer = state => state, props) => {
  const [hookState, setHookState] = useState(() =>
    initializer({
      ...(initialState && {
        ...initialState,
      }),
      ...(props && {
        ...props,
      }),
    }),
  )

  // State management
  const state = useRef(hookState)

  useEffect(() => {
    if (state.current) {
      state.current = getNextStateControlledFromProps(state.current, props)
    }
  }, [props])

  const getState = useCallback(() => state.current, [state])

  const setState = useCallback(
    newState => {
      state.current = getNextStateControlledFromProps(newState, props)
      setHookState(newState)
    },
    [state, props, setHookState],
  )

  // Reducer
  const reduce = useCallback(action => reducer(getState(), action), [reducer, getState])

  // Augmented dispatcher
  const dispatch = useCallback(
    action => {
      if (isFunction(action)) {
        return action(dispatch, getState)
      }
      return setState(reduce(action))
    },
    [getState, setState, reduce],
  )

  return [hookState, dispatch]
}

export default useReducerWithThunk
