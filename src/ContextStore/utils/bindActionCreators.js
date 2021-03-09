import isFunction from './isFunction';

/**
   * This function augments actions to dispatch other actions and get the reducer's state
   * @param {Function|Object} action - action that returns (dispatch, getState) or an object
   * @param {Function} dispatch - reducer dispatch API
   * @param {Object} state - reducer state
   * @returns {Function} - an augmented action that can return (dispatch, getState)
   * or is wrapped in the dispatch API
   * */

const bindActionCreator = (action, dispatch, state) => {
    const getState = () => state;
    /**
   * Closure function that allows actions to dispatch other actions and pass (dispatch, getState)
   * @returns {*} - anything the dispached action returns
   */
    function boundAction(...args) {
      try {
        return action.apply(this, args)(dispatch, getState);
      } catch {
        return dispatch(action.apply(this, args));
      }
    }

    return boundAction;
  };

  /**
   * This augments actions to dispatch other actions and passes (dispatch, getState)
   * @param {Object} mapDispatchToProps - actions to be passed as props
   * @param {Function} dispatch - reducer dispatch API
   * @param {Object} state - reducer state
   * @returns {Object} object of augmented actions
   * */

const BindActionCreators = (mapDispatchToProps, dispatch, state) => {
    if (typeof mapDispatchToProps !== 'object' || mapDispatchToProps === null) {
      throw new Error(
        `bindActionCreators expected an object or a function, instead received ${
          mapDispatchToProps === null ? 'null' : typeof mapDispatchToProps
        }.`,
      );
    }

    const boundActionCreators = Object.entries(mapDispatchToProps).reduce((acc, [key, action]) => {
        if (isFunction(action)) {
            acc[key] = bindActionCreator(action, dispatch, state);
          }
          return acc;
    }, {});

    return boundActionCreators;
  };

  export default BindActionCreators;
