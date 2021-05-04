import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { getStylesFromProps, getErrorListItemDetail } from '../../utils';
import { connect } from '../../../ContextStore';
import { errorMessagesPropType } from '../../state/propTypes';

const useStyles = makeStyles({
  errorMessagesListContainer: ({ errorMessagesListContainerClassFromProps }) => getStylesFromProps(
    errorMessagesListContainerClassFromProps, {
      maxWidth: '100%',
      '& h4': {
        marginBottom: 0,
      },
    },
  ),
  errorMessageHeader: ({ errorMessageHeaderClassFromProps }) => getStylesFromProps(
    errorMessageHeaderClassFromProps, {
      marginTop: 0,
    },
  ),
  errorMessagesList: ({ errorMessagesListClassFromProps }) => getStylesFromProps(
    errorMessagesListClassFromProps, {
      '& ol': {
        marginBlock: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      '& li': {
        listStyle: 'outside',
        fontSize: '1rem',
      },
    },
  ),
});

const ErrorMessages = (props) => {
  let errorMessageFilesLength = 0;
  const { errorMessages, customErrorMessage } = props;
  const classes = useStyles(props);

  const renderListOfFiles = (errorMessage) => {
    const { id: errorId, message, files } = errorMessage;
    errorMessageFilesLength += files.length;

    const renderListItems = files.map((file) => {
      const detail = getErrorListItemDetail(errorMessage, file);
      return (
        <li key={file.name}>
          {detail && (
            <b style={{ marginRight: '0.25rem' }}>
              (
              {detail}
              ):
            </b>
          )}
          <span>{file.name}</span>
        </li>
      );
    });
    return (
      <div key={errorId} className={classes.errorMessagesListContainer}>
        <h4 classes={classes.errorMessageHeader}>
          {message}
          :
        </h4>
        <div className={classes.errorMessagesList}>
          <ol>{renderListItems}</ol>
        </div>
      </div>
    );
  };

  const renderErrors = errorMessages.map(errorMessage => renderListOfFiles(errorMessage));

  const someFilesAddedString = errorMessageFilesLength > 1 ? 'Some' : '';
  const pluralFileCharacter = errorMessageFilesLength > 1 ? 's' : '';
  const errorPrefix = `${
    someFilesAddedString ? `${someFilesAddedString} f` : ' F'
  }ile${pluralFileCharacter} not added for the following reason${pluralFileCharacter}:`;

  return (
    customErrorMessage || (
    <Fragment>
      <h4 className={classes.errorMessageHeader}>{errorPrefix}</h4>
      {renderErrors}
    </Fragment>
    )
  );
};

ErrorMessages.propTypes = {
  errorMessages: errorMessagesPropType.isRequired,
  customErrorMessage: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.string]),
};

ErrorMessages.defaultProps = {
  customErrorMessage: '',
};

const mapStateToProps = ({
  classes: { errorMessagesListContainer, errorMessageHeader, errorMessagesList },
  error: { errorMessages },
  customErrorMessage,
}) => ({
  errorMessagesListContainerClassFromProps: errorMessagesListContainer,
  errorMessageHeaderClassFromProps: errorMessageHeader,
  errorMessagesListClassFromProps: errorMessagesList,
  errorMessages,
  customErrorMessage,
});

export default connect(mapStateToProps)(ErrorMessages);
