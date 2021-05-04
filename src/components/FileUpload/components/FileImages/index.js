import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  AttachFile, Audiotrack, Description, Videocam,
} from '@material-ui/icons';
import FileImage from './FileImage';
import {
  getStylesFromProps, FILE_IMAGE_WIDTH, BLUE, OPAQUE, isImage, isPdf,
} from '../../utils';
import { fileListPropType } from '../../state/propTypes';
import { connect } from '../../../ContextStore';

const useStyles = makeStyles({
  fileImageItem: ({
    hasADisabledOnDelete,
    fileImageItemClassFromProps,
  }) => getStylesFromProps(fileImageItemClassFromProps, {
    margin: '0 4px',
    display: 'flex',
    opacity: 1,
    transition: 'all 0.2s ease-in-out',
    '&:hover': hasADisabledOnDelete
      ? {}
      : {
        background: 'rgba(0, 0, 0, .75)',
        color: 'white',
        '& $fileImage, iframe': {
          opacity: OPAQUE,
        },
        // deleteIcon
        '& svg': {
          opacity: 1,
          cursor: 'pointer',
        },
      },
  }),
  file: ({ fileClassFromProps }) => getStylesFromProps(fileClassFromProps, {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    height: 'auto',
    width: 'auto',
    maxHeight: '100%',
    maxWidth: '100%',
    '& svg': {
      fontSize: 52,
      color: BLUE,
      flexBasis: '100%',
    },
    '& div': {
      flexBasis: '100%',
    },
  }),
  fileName: ({ fileNameClassFromProps }) => getStylesFromProps(fileNameClassFromProps, {
    overflow: 'hidden',
    maxWidth: FILE_IMAGE_WIDTH,
    textOverflow: 'ellipsis',
  }),
  fileImage: ({ fileImageClassFromProps }) => getStylesFromProps(fileImageClassFromProps, {
    height: '100%',
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backfaceVisibility: 'hidden',
    pointerEvents: 'none',
    border: 0,
    objectFit: 'cover',
  }),
});

const FileImages = (props) => {
  const { fileList, showFileNames } = props;
  const classes = useStyles(props);
  const renderPreviewImageWithIcon = useCallback(
    (file, Icon) => (
      <div className={classes.file}>
        <Icon />
        {file.name && showFileNames && <div className={classes.fileName}>{file.name}</div>}
      </div>
    ),
    [classes.file, classes.fileName, showFileNames],
  );
  return fileList.map((file, i) => {
    let src = file.url;
    if (!src && file instanceof File) {
      src = URL.createObjectURL(file);
    }
    let previewImage = renderPreviewImageWithIcon(file, AttachFile);

    if (isImage(file) && src) {
      previewImage = (
        <img
          className={classes.fileImage}
          title={file.name}
          name={file.name}
          alt={file.name}
          src={src}
        />
      );
    } else if (isPdf(file) && src) {
      previewImage = (
        <iframe
          className={classes.fileImage}
          name={file.name}
          title={file.name}
          // src={`${src}#page=1&zoom=0&toolbar=0&navpanes=0&statusbar=0&scrollbar=0`}
          src={src}
          scrolling="no"
          allowFullScreen={false}
          loading="eager"
          referrerPolicy="no-referrer"
          frameBorder={0}
        />
      );
    } else if (RegExp('video/*').test(file.type)) {
      previewImage = renderPreviewImageWithIcon(file, Videocam);
    } else if (RegExp('audio/*').test(file.type)) {
      previewImage = renderPreviewImageWithIcon(file, Audiotrack);
    } else if (RegExp('text/*').test(file.type)) {
      previewImage = renderPreviewImageWithIcon(file, Description);
    }

    return (
      <div
        key={file.key || file.name}
        title={file.key || file.name}
        aria-hidden="true"
        className={classes.fileImageItem}
      >
        <FileImage fileIndex={i} previewImage={previewImage} />
      </div>
    );
  });
};

FileImages.propTypes = {
  fileList: fileListPropType.isRequired,
  showFileNames: PropTypes.bool.isRequired,
};

const mapStateToProps = ({
  classes: {
    fileImageItem, file, fileName, fileImage,
  },
  fileList,
  onDelete,
  showFileNames,
}) => ({
  fileImageItemClassFromProps: fileImageItem,
  fileClassFromProps: file,
  fileNameClassFromProps: fileName,
  fileImageClassFromProps: fileImage,
  fileList,
  hasADisabledOnDelete: onDelete === false,
  showFileNames,
});

export default connect(mapStateToProps)(FileImages);
