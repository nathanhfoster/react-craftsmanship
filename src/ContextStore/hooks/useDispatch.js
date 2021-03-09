import { useContext } from 'react';
import { ContextConsumer } from '../provider';

/**
   * This hook simulates Redux's useDispatch hook
   * @param {Object=} contextConsumer - the context consumer
   * @returns {Function} - the context's dispatch API
   * */
const useDispatch = (contextConsumer = ContextConsumer) => useContext(contextConsumer).dispatch;

export default useDispatch;
