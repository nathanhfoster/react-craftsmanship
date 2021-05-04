import { isFunction } from 'lodash';
import { FileUploadReducer, initialState, getInitialState } from '../reducer';
import {
  SET_IN_DROP_ZONE,
  ADD_VALIDATED_FILE_LIST,
  DELETE_FILE_FROM_LIST,
  SET_ERROR,
} from '../types';

const defualtProps = { multiple: false };
const mockFileName = 'test';
const mockFileList = [{ name: mockFileName }];
const tests = [
  {
    props: defualtProps,
    action: { type: 'RETURNING_INITIAL_STATE' },
    expectedState: {
      ...initialState,
      ...defualtProps,
      fileLimit: 1,
    },
  },
  {
    action: { type: SET_IN_DROP_ZONE, payload: true },
    expectedState: {
      ...initialState,
      inDropZone: true,
    },
  },
  {
    state: {
      ...initialState,
      fileList: mockFileList,
      error: {
        ...initialState.error,
        fileLimitExceeded: true,
      },
    },
    action: { type: ADD_VALIDATED_FILE_LIST, payload: mockFileList },
    expectedState: {
      ...initialState,
      fileList: mockFileList.concat(mockFileList),
    },
  },
  {
    state: {
      ...initialState,
      fileList: mockFileList,
      error: { ...initialState.error, fileLimitExceeded: true },
    },
    action: { type: DELETE_FILE_FROM_LIST, payload: 0 },
    expectedState: {
      ...initialState,
      fileList: [],
      error: initialState.error,
    },
  },
  {
    action: {
      type: SET_ERROR,
      payload: {
        errorMessages: mockFileList,
        fileLimitExceeded: false,
        hasInvalidFileExtension: false,
        filesWithWrongExtensions: mockFileList,
        fileSizeLimitExceeded: false,
        filesTooLarge: mockFileList,
      },
    },
    expectedState: {
      ...initialState,
      error: {
        ...initialState.error,
        errorMessages: mockFileList,
        filesWithWrongExtensions: mockFileList,
        filesTooLarge: mockFileList,
      },
    },
  },
  {
    name: 'SET_ERROR resets error when payload is null',
    action: {
      type: SET_ERROR,
      payload: null,
    },
  },
];

describe('FileUploadReducer', () => {
  const runTest = (
    {
      name, props = {}, state = getInitialState(props), action, expectedState,
    },
    testNumber,
  ) => {
    const testNamePrefix = `Test ${testNumber}`;
    return it(
      name
        ? `${testNamePrefix} ${name} reducer`
        : `${testNamePrefix} should handle ${action.type} action type`,
      () => {
        const resolvedAction = isFunction(action) ? action(state) : action;
        const returnedState = FileUploadReducer(state, resolvedAction);

        // expectedState by default is initialState
        const resolvedExpectedState = isFunction(expectedState)
          ? expectedState(state, resolvedAction)
          : expectedState || initialState;

        expect(returnedState).toEqual(resolvedExpectedState);
      },
    );
  };

  tests.forEach((test, i) => runTest(test, i));
});
