import PropTypes from 'prop-types';

const FormProps = PropTypes.objectOf(
  PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
);

export { FormProps };
