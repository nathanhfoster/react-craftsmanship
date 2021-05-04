import React, { forwardRef } from 'react';
import { FileUploadReducer, getInitialState } from './state/reducer';
import FileUpload from './components/FileUpload';
import { FileUploadPropTypes, FileUploadDefualtProps } from './state/propTypes';
import { ContextProvider } from '../ContextStore';

const FileUploadContainer = forwardRef((props, ref) => {
  const { children, ...restOfProps } = props;
  return (
    <ContextProvider
      name="FileUploadContainer"
      reducers={FileUploadReducer}
      props={restOfProps}
      initializer={getInitialState}
    >
      <FileUpload forwardedRef={ref}>{children}</FileUpload>
    </ContextProvider>
  );
});

FileUploadContainer.propTypes = FileUploadPropTypes;

FileUploadContainer.defaultProps = FileUploadDefualtProps;

export default FileUploadContainer;
