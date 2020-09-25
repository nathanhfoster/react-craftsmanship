import React, { useContext, useState, useLayoutEffect, useMemo } from 'react'
import { usePrevious } from './hooks'
import { shallowEquals } from 'utils'

const getMapStateToProps = (mapStateToProps, state, ownProps) =>
  mapStateToProps ? mapStateToProps(state, ownProps) : null

const connect = (context, mapStateToProps) => Component => ownProps => {
  const { state, dispatch } = useContext(context)

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

  // Memoize the Component's combined props
  const renderComponent = useMemo(() => {
    const combinedComponentProps = {
      ...stateToProps,
      ...ownProps,
      dispatch,
    }
    // Pass all the key value combinedComponentProps to Component
    return <Component {...combinedComponentProps} />
  }, [stateToProps, ownProps])

  return renderComponent
}

export default connect
