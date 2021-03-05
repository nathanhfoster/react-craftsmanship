import React, { memo,useMemo } from 'react'
import { useContext } from '../hooks'
import { ContextConsumer } from './'

const bindActionCreator = (actionCreator, dispatch, state) => {
  const getState = () => state
  // Closure function
  function boundAction() {
    try {
      return actionCreator.apply(this, arguments)(dispatch, getState)
    } catch {
      return dispatch(actionCreator.apply(this, arguments))
    } finally {
    }
  }

  return boundAction
}

const bindActionCreators = (actionCreators, dispatch, state) => {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch, state)
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${
        actionCreators === null ? 'null' : typeof actionCreators
      }.`,
    )
  }

  let boundActionCreators = {}

  for (const key in actionCreators) {
    const action = actionCreators[key]
    if (typeof action === 'function') {
      boundActionCreators[key] = bindActionCreator(action, dispatch, state)
    }
  }

  return boundActionCreators
}

const getMapStateToProps = (mapStateToProps, state, ownProps) =>
  mapStateToProps ? mapStateToProps(state, ownProps) : null

const connect = (mapStateToProps, mapDispatchToProps) => Component => {
  const MemoizedComponent = memo(Component)
  return ownProps => {
    const { state, dispatch } = useContext(ContextConsumer)

    // Memoize stateToProps
    const stateToProps = useMemo(() => getMapStateToProps(mapStateToProps, state, ownProps), [
      state,
      ownProps,
    ])

    // Memoize globalDispatch
    const dispatchToProps = useMemo(
      () =>
        !mapDispatchToProps
          ? null
          : mapDispatchToProps instanceof Function || typeof mapDispatchToProps === 'function'
          ? mapDispatchToProps(dispatch, ownProps)
          : bindActionCreators(mapDispatchToProps, dispatch, state),
      [state, ownProps],
    )

    return (
      <MemoizedComponent
        {...stateToProps}
        {...ownProps}
        {...(mapDispatchToProps && {
          ...dispatchToProps,
        })}
      />
    )
  }
}

export default connect
