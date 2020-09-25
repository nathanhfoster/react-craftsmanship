import { useContext, useState, useRef, useEffect, useLayoutEffect, useMemo } from 'react'

const usePrevious = value => {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  })

  return ref.current
}

const useSelector = (context, mapStateToSelector, isEqual) => {
  const { state } = useContext(context)

  const [selector, setSelector] = useState(mapStateToSelector(state))

  const previousSelector = usePrevious(selector)

  useLayoutEffect(() => {
    if (previousSelector) {
      const nextSelector = mapStateToSelector(state)
      const shouldUpdate = !isEqual(nextSelector, previousSelector)
      if (shouldUpdate) {
        setSelector(nextSelector)
      }
    }
  }, [state])

  return selector
}

const useDispatch = context => {
  const { dispatch } = useContext(context)

  const memoizedDispatch = useMemo(() => dispatch, [dispatch])

  return memoizedDispatch
}

export { useSelector, useDispatch, usePrevious }
