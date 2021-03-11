import { useCallback, useRef, useState } from 'react'
import { isFunction } from '../utils'
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
 * @param {*} initialState - initialState
 * @param {Function} initializer - initializer
 * @returns {Array.<*, Dispatch>} - the new useReducer hook
 */
const useReducerWithThunk = (reducer, initialState, initializer = state => state) => {
  const [hookState, setHookState] = useState(initializer(initialState))

  // State management
  const state = useRef(hookState)
  const getState = useCallback(() => state.current, [state])
  const setState = useCallback(
    newState => {
      state.current = newState
      setHookState(newState)
    },
    [state, setHookState],
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
