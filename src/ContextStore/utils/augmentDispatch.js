import isFunction from './isFunction'
/**
 * This allows actions to dispatch other actions and pass (dispatch, getState)
 * @param {Object} dispatch - reducer dispatch API
 * @param {Object} state - reducer state
 * @param {Function|Promise} action - a reducer action
 * @param {Array.<*>} args - arguments of the action
 * @returns {Promise|Function|undefined}
 * an augmented action that can return (dispatch, getState)
 * or is wrapped in the dispatch API
 */
const augmentDispatch = (dispatch, state) => action => (...args) => {
  let result
  // console.log('action: ', action)
  // console.log('args: ', args)
  const getState = () => state
  if (typeof action === 'object') {
    result = dispatch(action)
  }

  /**
   * Closure function that allows actions to dispatch other actions and pass (dispatch, getState)
   * @returns {*} - anything the dispached action returns
   */
  if (action instanceof Promise) {
    try {
      /**
       * Function that returns antoher Funnction or void
       * const action = data => async (dispatch, getState) => {
       * const payload = data.concat(getState().someKey)
       * dispatch({ type: 'SOME_ACTION_TYPE', payload })
       * }
       * */
      result = action.apply(this, args).then(dispatch, getState)
    } catch {
      /**
       * Function that returns object
       * const action = payload => ({ type: 'SOME_ACTION_TYPE', payload })
       * */
      result = dispatch(action.apply(this, args))
    }
  }
  if (isFunction(action)) {
    try {
      /**
       * Function that returns antoher Funnction or void
       * const action = data => (dispatch, getState) => {
       * const payload = data.concat(getState().someKey)
       * dispatch({ type: 'SOME_ACTION_TYPE', payload })
       * }
       * */
      result = action.apply(this, args)(dispatch, getState)
    } catch (e) {
      /**
       * Function that returns object
       * const action = payload => ({ type: 'SOME_ACTION_TYPE', payload })
       * */
      result = dispatch(action.apply(this, args))
    }
  }
  return result
}

export default augmentDispatch
