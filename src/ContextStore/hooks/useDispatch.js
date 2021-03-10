import { useContext } from 'react'
import { ContextConsumer } from '../provider'

/**
 * This hook simulates Redux's useDispatch hook
 * @param {Object=} contextConsumer - the context consumer
 * @param {Boolean=} shouldReturnAugment - return the augmented dispatch or the default one
 * @returns {Function} - the context's dispatch API
 * */
const useDispatch = (contextConsumer = ContextConsumer, shouldReturnAugment = true) => {
  const { dispatch, augmentedDispatch } = useContext(contextConsumer)

  return shouldReturnAugment ? augmentedDispatch : dispatch
}

export default useDispatch
