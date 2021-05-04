import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from '../../../ContextStore';
import { getStylesFromProps } from '../../utils';

const useStyles = makeStyles({
  labelMessage: ({ labelMessageClassFromProps }) => getStylesFromProps(labelMessageClassFromProps),
});

const LabelMessage = (props) => {
  const { fileLimit, pluralFiles } = props;
  const classes = useStyles(props);
  return (
    <span className={classes.labelMessage}>
      {`Drag and drop or select ${pluralFiles && fileLimit ? fileLimit : ''} file${
        pluralFiles ? 's' : ''
      } here`}
    </span>
  );
};

LabelMessage.propTypes = {
  fileLimit: PropTypes.number,
  pluralFiles: PropTypes.bool.isRequired,
};

LabelMessage.defaultProps = {
  fileLimit: undefined,
};

const mapStateToProps = ({ classes: { labelMessage }, fileLimit }) => ({
  labelMessageClassFromProps: labelMessage,
  fileLimit,
  pluralFiles: fileLimit === undefined || fileLimit > 1,
});
export default connect(mapStateToProps)(LabelMessage);
