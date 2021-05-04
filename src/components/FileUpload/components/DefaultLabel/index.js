import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { CloudUpload } from '@material-ui/icons';
import {
  getStylesFromProps, RED, LIGHT_BLUE, BLUE, LIGHT_GREY,
} from '../../utils';
import AcceptedFileTypeMessage from './AcceptedFileTypeMessage';
import ErrorMessages from './ErrorMessages';
import LabelMessage from './LabelMessage';
import { connect } from '../../../ContextStore';

const useStyles = makeStyles({
  labelContainer: ({ labelContainerClassFromProps }) => getStylesFromProps(
    labelContainerClassFromProps, {
      margin: 'auto',
    },
  ),
  label: ({ labelClassFromProps, errorsExist }) => getStylesFromProps(
    labelClassFromProps, {
      display: errorsExist ? 'block' : 'flex',
      alignItems: errorsExist ? 'initial' : 'center',
      justifyContent: errorsExist ? 'initial' : 'center',
      fontSize: '1rem',
      lineHeight: '1.25rem',
      color: errorsExist ? RED : 'inherit',
      textAlign: errorsExist ? 'start' : 'inherit',
    },
  ),
  uploadIcon: ({ uploadIconClassFromProps, disabled }) => getStylesFromProps(
    uploadIconClassFromProps, {
      marginRight: '0.25rem',
      fill: disabled ? LIGHT_GREY : LIGHT_BLUE,
      lineHeight: '1rem',
      fontSize: 52,
      '&:hover': {
        cursor: 'pointer',
        fill: BLUE,
      },
    },
  ),
  subLabels: ({ subLabelsClassFromProps }) => getStylesFromProps(
    subLabelsClassFromProps, {
      '& em': {
        display: 'block',
      },
    },
  ),
});

const DefaultLabel = (props) => {
  const { errorsExist, handleOnUploadClick } = props;
  const classes = useStyles(props);
  return (
    <div className={classes.labelContainer}>
      <CloudUpload className={classes.uploadIcon} onClick={handleOnUploadClick} />
      <div className={classes.label}>{errorsExist ? <ErrorMessages /> : <LabelMessage />}</div>
      {!errorsExist && (
        <div className={classes.subLabels}>
          <AcceptedFileTypeMessage />
        </div>
      )}
    </div>
  );
};

DefaultLabel.propTypes = {
  handleOnUploadClick: PropTypes.func.isRequired,
  errorsExist: PropTypes.bool.isRequired,
};

const mapStateToProps = ({
  classes: {
    labelContainer, label, uploadIcon, subLabels,
  },
  customErrorMessage,
  error: { errorMessages },
  disabled,
}) => ({
  labelContainerClassFromProps: labelContainer,
  labelClassFromProps: label,
  uploadIconClassFromProps: uploadIcon,
  subLabelsClassFromProps: subLabels,
  errorsExist: !!customErrorMessage || errorMessages.length > 0,
  disabled,
});

export default connect(mapStateToProps)(DefaultLabel);
