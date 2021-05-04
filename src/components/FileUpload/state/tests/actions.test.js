import {
  SET_IN_DROP_ZONE,
  ADD_VALIDATED_FILE_LIST,
  DELETE_FILE_FROM_LIST,
  SET_ERROR,
} from '../types';
import {
  SetInDropZone,
  AddValidatedFileList,
  DeleteFileFromList,
  SetErrorMessage,
  SetValidatedFiles,
} from '../actions';

const mockFile = new File([''], 'testFile', { type: 'text/html' });

describe('actions', () => {
  it('SetInDropZone should return the right action', () => {
    const payload = true;
    const result = SetInDropZone(payload);
    const expected = { type: SET_IN_DROP_ZONE, payload };
    expect(result).toMatchObject(expected);
  });

  it('AddValidatedFileList should return the right action', () => {
    const payload = [mockFile];
    const result = AddValidatedFileList(payload);
    const expected = { type: ADD_VALIDATED_FILE_LIST, payload };
    expect(result).toMatchObject(expected);
  });

  it('DeleteFileFromList should return the right action', () => {
    const payload = 1;
    const result = DeleteFileFromList(payload);
    const expected = { type: DELETE_FILE_FROM_LIST, payload };
    expect(result).toMatchObject(expected);
  });

  it('SetErrorMessage should return the right action', () => {
    const payload = {
      errorMessages: [],
      hasInvalidFileCount: true,
      hasInvalidFileExtension: true,
      hasInvalidFileSize: true,
    };
    const result = SetErrorMessage(payload);
    const expected = { type: SET_ERROR, payload };
    expect(result).toMatchObject(expected);
  });

  it('SetValidatedFiles should dispatch AddValidatedFileList when there are no errors', () => {
    const mockDispatch = jest.fn();
    const files = [mockFile];
    const getState = () => ({
      accept: 'application/pdf',
      fileList: [],
      fileLimit: undefined,
      fileSizeLimit: undefined,
    });
    SetValidatedFiles(files)(mockDispatch, getState);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it('SetValidatedFiles should dispatch SetErrorMessage when there are errors', () => {
    const mockDispatch = jest.fn();
    const files = [mockFile, mockFile];
    const getState = () => ({
      accept: 'application/pdf',
      fileList: [],
      fileLimit: 1,
      fileSizeLimit: undefined,
      dispatch: mockDispatch,
    });
    SetValidatedFiles(files)(mockDispatch, getState);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
