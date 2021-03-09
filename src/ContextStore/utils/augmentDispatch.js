import isFunction from './isFunction';
/**
   * This allows actions to dispatch other actions and pass (dispatch, getState)
   * @param {Object} dispatch - reducer dispatch API
   * @param {Object} state - reducer state
   * @returns {Function} augmentedDispatch
   */
const augmentDispatch = (dispatch, state) => (input) => {
  const getState = () => state;
  return isFunction(input) ? input(dispatch, getState) : dispatch(input);
};

export default augmentDispatch;
