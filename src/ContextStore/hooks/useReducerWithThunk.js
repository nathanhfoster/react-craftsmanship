import { useCallback, useEffect, useReducer, useRef } from 'react'
import { isFunction, getDerivedStateFromProps, defaultInitializer } from '../utils'
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
 * Mimics React.Component this.setState
 * @param {Object} prevState - the reducer's previous state
 * @param {Object} nextState - the state to overwrite
 * @returns {Object} - the next state for the reducer
 */
const setStateHookReducer = (prevState, nextState) => ({ ...prevState, ...nextState })

/**
 * Augments React's useReducer() hook so that the action dispatcher supports thunks.
 * @param {Function} reducer - reducer
 * @param {Object=} initialState - initialState
 * @param {Function=} initializer - initializer
 * @param {Object=} props - props to make the state controlled from a HOC
 * @returns {Array.<*, Dispatch>} - the new useReducer hook
 */
const useReducerWithThunk = (reducer, initialState, initializer = defaultInitializer, props) => {
  const [hookState, setHookState] = useReducer(
    setStateHookReducer,
    getDerivedStateFromProps(initialState, props),
    initializer,
  )

  // State management
  const state = useRef(hookState)

  const getState = useCallback(() => state.current, [state])

  const setState = useCallback(
    newState => {
      const nextState = getDerivedStateFromProps(newState, props)
      state.current = nextState
      setHookState(nextState)
    },
    [props, setHookState],
  )

  useEffect(() => {
    if (state.current) {
      state.current = getDerivedStateFromProps(state.current, props)
      setHookState(props)
    }
  }, [props])

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
