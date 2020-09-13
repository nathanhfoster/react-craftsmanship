import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BasicInput } from 'components';
import {
  SELECT_INPUT_OPTIONS,
  RANDOM_FORM_FIELD_TYPES_MAP,
} from 'redux/Form/utils';
import { handleOnFormChange } from 'redux/Form/actions';
import { InputProps } from 'components/BasicInput/propTypes';

const mapStateToProps = (state, { reducerKey, fieldKey }) => ({
  name: fieldKey,
  type: RANDOM_FORM_FIELD_TYPES_MAP[fieldKey],
  options: SELECT_INPUT_OPTIONS,
  label: fieldKey.toUpperCase(),
  placeholder: `...${fieldKey}`,
  value: state.Forms[reducerKey][fieldKey],
});

const mapDispatchToProps = { handleOnFormChange };

const ReduxBasicInput = ({ handleOnFormChange, ...inputProps }) => {
  const handleOnChange = useCallback(e => handleOnFormChange('form2', e), []);
  return <BasicInput {...inputProps} onChange={handleOnChange} />;
};

ReduxBasicInput.propTypes = {
  reducerKey: PropTypes.string.isRequired,
  fieldKey: PropTypes.string.isRequired,
  ...InputProps,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxBasicInput);
