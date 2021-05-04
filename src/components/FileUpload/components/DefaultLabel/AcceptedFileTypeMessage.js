import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  getStylesFromProps,
  LIGHT_GREY,
  GREY,
  getAcceptedFileTypeMessage,
  formatBytes,
} from '../../utils';
import { connect } from '../../../ContextStore';

const useStyles = makeStyles({
  acceptedFileTypeMessage: ({
    acceptedFileTypeMessageClassFromProps,
    disabled,
  }) => getStylesFromProps(
    acceptedFileTypeMessageClassFromProps, {
      color: disabled ? LIGHT_GREY : GREY,
      marginBottom: '0.25rem',
    },
  ),
});

const AcceptedFileTypeMessage = (props) => {
  const { accept, pluralFiles, fileSizeLimit } = props;
  const classes = useStyles(props);

  const acceptedFileTypeMessage = useMemo(() => {
    const message = getAcceptedFileTypeMessage(accept);
    if (message === '*') return '';
    return message;
  }, [accept]);

  const fileSizeLimitMessage = useMemo(
    () => (fileSizeLimit
      ? `${acceptedFileTypeMessage ? ', u' : 'U'}p to ${formatBytes(fileSizeLimit)}${
        pluralFiles ? ' each' : ''
      }`
      : ''),
    [pluralFiles, fileSizeLimit],
  );

  return (
    (acceptedFileTypeMessage || fileSizeLimitMessage) && (
      <div className={classes.acceptedFileTypeMessage}>
        (
        <span>{acceptedFileTypeMessage}</span>
        <span>{fileSizeLimitMessage}</span>
        )
      </div>
    )
  );
};

AcceptedFileTypeMessage.propTypes = {
  pluralFiles: PropTypes.bool.isRequired,
  accept: PropTypes.string,
  fileSizeLimit: PropTypes.number,
};

AcceptedFileTypeMessage.defaultProps = {
  accept: '',
  fileSizeLimit: undefined,
};

const mapStateToProps = ({
  classes: { acceptedFileTypeMessage },
  accept,
  fileLimit,
  fileSizeLimit,
  disabled,
}) => ({
  acceptedFileTypeMessageClassFromProps: acceptedFileTypeMessage,
  pluralFiles: fileLimit === undefined || fileLimit > 1,
  accept,
  fileSizeLimit,
  disabled,
});

export default connect(mapStateToProps)(AcceptedFileTypeMessage);
