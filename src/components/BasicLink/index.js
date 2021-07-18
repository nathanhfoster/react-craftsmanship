import React from 'react';
import PropTypes from 'prop-types';

const BasicInput = ({ children, ...restOfProps }) => (
  <a {...restOfProps}>{children}</a>
);

BasicInput.propTypes = {
  target: PropTypes.string,
  rel: PropTypes.string
};

BasicInput.defaultProps = {
  target: '_blank',
  rel: 'noopener noreferrer'
};

export default BasicInput;
