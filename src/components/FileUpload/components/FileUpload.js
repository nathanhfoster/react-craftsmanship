import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import {
  SetInDropZone as SetInDropZoneAction,
  SetValidatedFiles as SetValidatedFilesAction,
} from '../state/actions';
import FileImages from './FileImages';
import DefaultLabel from './DefaultLabel';
import {
  getStylesFromProps,
  LIGHT_GREY,
  DROP_ZONE_MIN_HEIGHT,
  DROP_ZONE_MAX_HEIGHT,
  preventDefaults,
} from '../utils';
import { connect } from '../../ContextStore';
import { childrenPropTypes } from '../state/propTypes';

const useStyles = makeStyles({
  dropZone: ({
    dropDownClassFromProps,
    inDropZone,
  }) => getStylesFromProps(dropDownClassFromProps, {
    textAlign: 'center',
    listStylePosition: 'inside',
    backgroundColor: inDropZone ? 'rgba(0, 0, 0, 0.06)' : 'transparent',
    minHeight: DROP_ZONE_MIN_HEIGHT,
    maxHeight: DROP_ZONE_MAX_HEIGHT,
  }),
  inputButton: ({
    inputButtonClassFromProps,
  }) => getStylesFromProps(inputButtonClassFromProps, {
    minHeight: DROP_ZONE_MIN_HEIGHT,
    maxHeight: DROP_ZONE_MAX_HEIGHT,
    width: '100%',
    border: `1px solid ${LIGHT_GREY}`,
    display: 'flex',
    flexWrap: 'wrap',
    textTransform: 'initial',
    '& span': { display: 'initial' },
    '&:hover': {
      backgroundColor: 'transparent',
      cursor: 'default',
    },
  }),
  fileImageContainer: ({
    fileImageContainerClassFromProps,
  }) => getStylesFromProps(fileImageContainerClassFromProps, {
    margin: '1rem 0',
    position: 'relative',
    display: 'inline-flex',
    overflowX: 'auto',
    overflowY: 'hidden',
    maxWidth: '100%',
    '&:hover': {
      cursor: 'default',
    },
  }),
  input: ({
    inputClassFromProps,
  }) => getStylesFromProps(inputClassFromProps, {
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    height: 48,
    padding: '0 30px',
  }),
});

const FileUpload = (props) => {
  const {
    forwardedRef: ref,
    showDefaultLabel,
    children,
    accept,
    multiple,
    disabled,
    inDropZone,
    shouldRenderFileImages,
    SetValidatedFiles,
    SetInDropZone,
  } = props;

  const forwardedRef = ref || useRef(null);

  const classes = useStyles(props);
  const shouldPreventDefault = useRef(true);

  const handleOnUploadClick = useCallback((e) => {
    shouldPreventDefault.current = false;
    forwardedRef.current.click(e);
    shouldPreventDefault.current = true;
  }, []);

  const handleOnClick = (e) => {
    if (shouldPreventDefault.current) {
      preventDefaults(e);
    }
  };

  const handleOnChange = ({ target: { files: FileList } }) => {
    const files = [...FileList];
    SetValidatedFiles(files);
  };

  const dropHandler = (e) => {
    preventDefaults(e);
    if (disabled) return;
    const files = [...e.dataTransfer.files];
    SetValidatedFiles(files);
    e.dataTransfer.clearData();
    SetInDropZone(false);
  };

  const handleDragOver = (e) => {
    preventDefaults(e);
    if (disabled) return;
    e.dataTransfer.dropEffect = 'copy';
    SetInDropZone(true);
  };

  const handleDragEnterOrLeave = (e) => {
    preventDefaults(e);
    if (disabled) return;
    const isInDropZone = e.currentTarget.contains(e.relatedTarget);
    if (isInDropZone !== inDropZone) {
      SetInDropZone(isInDropZone);
    }
  };
  return (
    <div
      id="drop-area"
      className={classes.dropZone}
      onDrop={dropHandler}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnterOrLeave}
      onDragLeave={handleDragEnterOrLeave}
    >
      <Button className={classes.inputButton} component="label" disableRipple disabled={disabled}>
        {showDefaultLabel && <DefaultLabel handleOnUploadClick={handleOnUploadClick} />}
        {shouldRenderFileImages && (
          <div aria-hidden="true" className={classes.fileImageContainer}>
            <FileImages />
          </div>
        )}
        {children}
        <input
          ref={forwardedRef}
          type="file"
          accept={accept}
          className={classes.input}
          hidden
          multiple={multiple}
          onClick={handleOnClick}
          onChange={handleOnChange}
          disabled={disabled}
        />
      </Button>
    </div>
  );
};

FileUpload.propTypes = {
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  showDefaultLabel: PropTypes.bool,
  children: childrenPropTypes,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  inDropZone: PropTypes.bool.isRequired,
  shouldRenderFileImages: PropTypes.bool.isRequired,
  SetValidatedFiles: PropTypes.func.isRequired,
  SetInDropZone: PropTypes.func.isRequired,
};

FileUpload.defaultProps = {
  forwardedRef: undefined,
  showDefaultLabel: true,
  children: undefined,
  accept: '',
  multiple: true,
  disabled: false,
};

const mapStateToProps = ({
  classes: {
    dropZone, inputButton, fileImageContainer, input,
  },
  showDefaultLabel,
  accept,
  multiple,
  disabled,
  inDropZone,
  fileList,
}) => ({
  dropDownClassFromProps: dropZone,
  inputButtonClassFromProps: inputButton,
  fileImageContainerClassFromProps: fileImageContainer,
  inputClassFromProps: input,
  showDefaultLabel,
  accept,
  multiple,
  disabled,
  inDropZone,
  shouldRenderFileImages: fileList.length > 0,
});

const mapDispatchToProps = {
  SetInDropZone: SetInDropZoneAction,
  SetValidatedFiles: SetValidatedFilesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
