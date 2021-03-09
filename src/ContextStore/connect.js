import React, { memo, useContext, useMemo } from 'react';
import { isFunction, bindActionCreators, shallowEquals } from './utils';
import { ContextConsumer } from './provider';
/**
   * This function simulates Redux's connect API
   * @param {Function} mapStateToProps - reducer dispatch API
   * @param {Object|Function} mapDispatchToProps - reducer state
   * @param {Object=} contextConsumer - the context consumer
   * @param {Boolean|Function=} isEqual - a Boolean that determines
   * if the component should be memoized
   * or an equality Function that determines if the Component should rerender
   * @returns {React.FunctionComponent} - a memoized component
   * */

const connect = (
  mapStateToProps,
  mapDispatchToProps = {},
  contextConsumer = ContextConsumer,
  isEqual = shallowEquals,
) => (Component) => {
  // Conditionally Memoize Component
  const MemoizedComponent = isEqual === false ? Component : memo(Component, isEqual);
  return (ownProps) => {
    const { state, dispatch } = useContext(contextConsumer);

    // Memoize stateToProps
    const stateToProps = useMemo(() => {
      if (isFunction(mapStateToProps)) {
        return mapStateToProps(state, ownProps);
      }
      return {};
    }, [state, ownProps]);

    // Memoize globalDispatch
    const dispatchToProps = useMemo(() => {
      if (isFunction(mapDispatchToProps)) {
        return mapDispatchToProps(dispatch, ownProps, state);
      }
      return bindActionCreators(mapDispatchToProps, dispatch, state);
    }, [state, ownProps]);

    return (
      <MemoizedComponent {...ownProps} {...stateToProps} {...dispatchToProps} dispatch={dispatch} />
    );
  };
};

export default connect;
