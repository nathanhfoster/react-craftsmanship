import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { DeleteForever } from '@material-ui/icons';
import {
  getStylesFromProps,
  RED,
  FILE_IMAGE_HEIGHT,
  FILE_IMAGE_WIDTH,
  LIGHT_GREY,
  preventDefaults,
} from '../../utils';
import { filePropType } from '../../state/propTypes';
import { connect } from '../../../ContextStore';
import { DeleteFileFromList as DeleteFileFromListAction } from '../../state/actions';

const useStyles = makeStyles({
  fileWrapper: ({
    file,
    fileWrapperClassFromProps,
  }) => getStylesFromProps(fileWrapperClassFromProps, {
    display: 'flex',
    justifyContent: 'center',
    color: 'inherit',
    textDecoration: file.href ? 'none' : 'initial',
    cursor: file.href || file.onClick ? 'pointer' : 'initial',
    border: `1px solid ${LIGHT_GREY}`,
    height: FILE_IMAGE_HEIGHT,
    minWidth: FILE_IMAGE_HEIGHT,
    maxWidth: FILE_IMAGE_WIDTH,
  }),
  deleteIcon: ({ deleteIconClassFromProps }) => getStylesFromProps(deleteIconClassFromProps, {
    fill: 'white',
    color: 'white',
    position: 'absolute',
    textAlign: 'center',
    opacity: 0,
    zIndex: 1,
    '&:hover': {
      fill: RED,
    },
  }),
});

const FileImage = (props) => {
  const {
    file, fileIndex, previewImage, cantDeleteFile, onDelete, DeleteFileFromList,
  } = props;
  const classes = useStyles(props);

  const handleOnClickFile = (e) => {
    preventDefaults(e);
    if (file.onClick) {
      file.onClick(file);
    }
  };

  const handleDeleteFile = (e) => {
    preventDefaults(e);
    if (onDelete) {
      onDelete(file, fileIndex);
    }
    DeleteFileFromList(fileIndex);
  };

  const testId = file.key || file.name;

  return (
    <Fragment>
      {!cantDeleteFile && (
        <DeleteForever
          data-testid={`deleteIcon-${testId}`}
          className={classes.deleteIcon}
          onClick={handleDeleteFile}
        />
      )}
      {file.href ? (
        <a
          className={classes.fileWrapper}
          href={file.url}
          target="_blank"
          rel="noreferrer noopener"
        >
          {previewImage}
        </a>
      ) : (
        <div
          data-testid={`fileWrapper-${testId}`}
          className={classes.fileWrapper}
          aria-hidden="true"
          onClick={handleOnClickFile}
        >
          {previewImage}
        </div>
      )}
    </Fragment>
  );
};

FileImage.propTypes = {
  file: filePropType.isRequired,
  fileIndex: PropTypes.number.isRequired,
  previewImage: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
  cantDeleteFile: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  DeleteFileFromList: PropTypes.func.isRequired,
};

const mapStateToProps = (
  { fileList, classes: { fileWrapper, deleteIcon }, onDelete },
  { fileIndex },
) => {
  const file = fileList[fileIndex];
  return {
    file,
    fileWrapperClassFromProps: fileWrapper,
    deleteIconClassFromProps: deleteIcon,
    cantDeleteFile: onDelete === false,
    onDelete,
  };
};

const mapDispatchToProps = {
  DeleteFileFromList: DeleteFileFromListAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(FileImage);
