import {
  SET_IN_DROP_ZONE,
  ADD_VALIDATED_FILE_LIST,
  DELETE_FILE_FROM_LIST,
  SET_ERROR,
} from './types';

import {
  FILE_EXTENSION_IS_WRONG,
  FILE_LIMIT_EXCEEDED,
  FILE_SIZE_LIMIT_EXCEEDED,
  formatBytes,
  getAcceptedFileTypeMessage,
  validFileExtension,
} from '../utils';

export const SetInDropZone = payload => ({ type: SET_IN_DROP_ZONE, payload });
export const AddValidatedFileList = payload => ({ type: ADD_VALIDATED_FILE_LIST, payload });
export const DeleteFileFromList = payload => ({ type: DELETE_FILE_FROM_LIST, payload });

export const SetErrorMessage = payload => ({
  type: SET_ERROR,
  payload,
});

export const SetValidatedFiles = filesNotValidatedYet => (dispatch, getState) => {
  const {
    accept, fileList, fileLimit, fileSizeLimit, onChange, onError,
  } = getState();
  const allFiles = fileList.concat(filesNotValidatedYet);
  const errorMessages = [];
  let hasInvalidFileCount = false;

  let hasInvalidFileSize = false;

  let hasInvalidFileExtension = false;

  const [filesTooLarge, filesWithWrongExtensions, validatedFiles] = filesNotValidatedYet.reduce(
    (acc, file, i) => {
      const index = i + 1;
      const fileIndexExceedsFileLimit = index > fileLimit;
      const fileTooLarge = file.size > fileSizeLimit;
      const fileNotValid = !validFileExtension(file, accept);
      if (fileIndexExceedsFileLimit) {
        hasInvalidFileCount = true;
      }
      if (fileTooLarge) {
        hasInvalidFileSize = true;
        acc[0].push(file);
      }
      if (fileNotValid) {
        hasInvalidFileExtension = true;
        acc[1].push(file);
      }
      if (!(fileIndexExceedsFileLimit || fileTooLarge || fileNotValid)) {
        acc[2].push(file);
      }
      return acc;
    },
    [[], [], []],
  );

  if (hasInvalidFileCount || hasInvalidFileSize || hasInvalidFileExtension) {
    if (hasInvalidFileCount) {
      const inValidFileLimit = fileLimit === undefined;
      const validFileLimit = inValidFileLimit ? 1 : fileLimit;
      const sliceStartIndex = inValidFileLimit ? fileList.length : validFileLimit;
      const sliceEndIndex = allFiles.length;
      const fileLimitExceededMessage = `File count limit of ${validFileLimit} exceeded`;
      const filesThatExceededLimit = allFiles.slice(sliceStartIndex, sliceEndIndex);
      errorMessages.push({
        id: FILE_LIMIT_EXCEEDED,
        message: fileLimitExceededMessage,
        files: filesThatExceededLimit,
      });
    }
    if (hasInvalidFileSize) {
      const fileSizeLimitExceededMessage = `File size limit exceeded (files must be smaller than ${formatBytes(
        fileSizeLimit,
      )})`;

      errorMessages.push({
        id: FILE_SIZE_LIMIT_EXCEEDED,
        message: fileSizeLimitExceededMessage,
        files: filesTooLarge,
      });
    }
    if (hasInvalidFileExtension) {
      const fileExtensionIsWrongMessage = `File extension did not match the supported type (files must be saved as ${getAcceptedFileTypeMessage(
        accept,
      )})`;
      errorMessages.push({
        id: FILE_EXTENSION_IS_WRONG,
        message: fileExtensionIsWrongMessage,
        files: filesWithWrongExtensions,
      });
    }
  }

  const validatedFilesWithCorrectLength = validatedFiles.slice(
    0,
    hasInvalidFileCount ? fileLimit : validatedFiles.length,
  );

  if (validatedFilesWithCorrectLength.length > 0) {
    dispatch(AddValidatedFileList(validatedFilesWithCorrectLength));
    if (onChange) {
      onChange(validatedFilesWithCorrectLength);
    }
  }
  if (hasInvalidFileCount || hasInvalidFileExtension || hasInvalidFileSize) {
    const errorPayload = {
      errorMessages,
      hasInvalidFileCount,
      hasInvalidFileExtension,
      hasInvalidFileSize,
    };
    dispatch(SetErrorMessage(errorPayload));
    if (onError) {
      onError(errorPayload);
    }
  }
};
