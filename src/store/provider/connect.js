import React, { useState, useLayoutEffect, useMemo } from 'react'
import { usePrevious, useContext } from '../hooks'
import { ContextConsumer } from './'
import { shallowEquals } from '../utils'

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

const connect = (mapStateToProps, mapDispatchToProps) => Component => ownProps => {
  const { state, dispatch } = useContext(ContextConsumer)

  // Memoize stateToProps
  const [stateToProps, setStateProps] = useState(
    getMapStateToProps(mapStateToProps, state, ownProps),
  )

  const prevStateToProps = usePrevious(stateToProps)

  // Check if Component should rerender
  useLayoutEffect(() => {
    if (prevStateToProps) {
      const nextStateToProps = getMapStateToProps(mapStateToProps, state, ownProps)
      if (!shallowEquals(prevStateToProps, nextStateToProps)) {
        setStateProps(nextStateToProps)
      }
    }
  }, [state])

  // Memoize globalDispatch
  const dispatchToProps = useMemo(
    () =>
      !mapDispatchToProps
        ? null
        : mapDispatchToProps instanceof Function || typeof mapDispatchToProps === 'function'
        ? mapDispatchToProps(dispatch, ownProps)
        : bindActionCreators(mapDispatchToProps, dispatch, state),
    [stateToProps],
  )

  // Memoize the Component's combined props
  const renderComponent = useMemo(() => {
    const combinedComponentProps = {
      ...stateToProps,
      ...ownProps,
      // not all components need to dispatch actions so its optional
      ...(mapDispatchToProps && {
        ...dispatchToProps,
      }),
    }
    // Pass all the key value combinedComponentProps to Component
    return <Component {...combinedComponentProps} />
  }, [stateToProps, ownProps])

  return renderComponent
}

export default connect
