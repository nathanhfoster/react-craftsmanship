import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BasicInput } from 'components';
import { SELECT_INPUT_OPTIONS } from 'redux/Form/utils';
import { handleOnFormChange } from 'redux/Form/actions';
import { InputProps } from 'components/BasicInput/propTypes';

// We are mapping into the values on individual input fields for atomicity
const mapStateToProps = ({ Forms }, { reducerKey, fieldKey, arrayOfInputFieldDepencies }) => {
  const type = Forms.randFormFieldTypesMap[fieldKey];
  const value = Forms[reducerKey][fieldKey];
  return {
    name: fieldKey,
    type,
    options: type === 'select' ? SELECT_INPUT_OPTIONS : undefined,
    label: fieldKey.toUpperCase(),
    placeholder: `...${fieldKey}`,
    value,
  };
};

const mapDispatchToProps = { handleOnFormChange };

const ReduxBasicInput = ({ handleOnFormChange, ...inputProps }) => {
  console.log('ReduxBasicInput rendered');
  const handleOnChange = useCallback(e => handleOnFormChange('form2', e), []);

  return <BasicInput {...inputProps} onChange={handleOnChange} />;
};

ReduxBasicInput.propTypes = {
  reducerKey: PropTypes.string.isRequired,
  fieldKey: PropTypes.string.isRequired,
  ...InputProps,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxBasicInput);
