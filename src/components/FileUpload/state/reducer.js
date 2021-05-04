import {
  SET_IN_DROP_ZONE,
  ADD_VALIDATED_FILE_LIST,
  DELETE_FILE_FROM_LIST,
  SET_ERROR,
} from './types';

export const initialState = {
  inDropZone: false,
  fileList: [],
  error: {
    errorMessages: [],
    fileLimitExceeded: false,
    hasInvalidFileExtension: false,
    filesWithWrongExtensions: [],
    fileSizeLimitExceeded: false,
    filesTooLarge: [],
  },
};

export const getInitialState = (props) => {
  const { multiple, fileLimit } = props;
  return {
    ...initialState,
    ...props,
    fileLimit: multiple === false ? 1 : fileLimit,
  };
};

export const FileUploadReducer = (state, action) => {
  const { type, payload } = action;
  let nextItems = [];

  switch (type) {
    case SET_IN_DROP_ZONE:
      return { ...state, inDropZone: payload };
    case ADD_VALIDATED_FILE_LIST:
      return {
        ...state,
        fileList: state.fileList.concat(payload),
        error: initialState.error,
      };
    case DELETE_FILE_FROM_LIST:
      nextItems = state.fileList.filter((file, i) => i !== payload);
      return {
        ...state,
        fileList: nextItems,
        error: nextItems.length === 0 ? initialState.error : state.error,
      };
    case SET_ERROR:
      return {
        ...state,
        error: payload || initialState.error,
      };
    default:
      return state;
  }
};
