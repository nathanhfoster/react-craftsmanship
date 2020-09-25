import {
  useContext as reactUseContext,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useMemo,
} from 'react'
import { ContextConsumer } from '../provider'
import { shallowEquals } from '../utils'

const useContext = (context = ContextConsumer) => reactUseContext(context)

const usePrevious = value => {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  })

  return ref.current
}

const defaultIsEqual = (nextSelector, previousSelector) =>
  shallowEquals(previousSelector, nextSelector)

const useSelector = (context, mapStateToSelector, isEqual = defaultIsEqual) => {
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

const useDispatch = (context = ContextConsumer) => {
  const { dispatch } = useContext(context)
  const memoizedDispatch = useMemo(() => dispatch, [dispatch])

  return memoizedDispatch
}

export { useSelector, useDispatch, useContext, usePrevious }
