import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BasicForm } from 'components';
import { SELECT_INPUT_OPTIONS } from 'redux/Form/utils';
import { handleOnFormChange } from 'redux/Form/actions';
import { FormProps } from 'redux/Form/propTypes';

const mapStateToProps = ({
  Forms: { form1, randFormFieldTypesMap, shouldMemoizeInputFields },
}) => ({
  form1,
  randFormFieldTypesMap,
  shouldMemoizeInputFields,
});

const mapDispatchToProps = { handleOnFormChange };

const ReduxBasicForm = ({
  form1,
  randFormFieldTypesMap,
  shouldMemoizeInputFields,
  handleOnFormChange,
}) => {
  const handleOnChange = useCallback(e => handleOnFormChange('form1', e), []);

  // Didn't use useMemo because there aren't that many props passed into my component
  const basicFormInputs = Object.entries(form1).map(([key, value]) => {
    const type = randFormFieldTypesMap[key];
    return {
      name: key,
      type,
      options: type === 'select' ? SELECT_INPUT_OPTIONS : undefined,
      label: key.toUpperCase(),
      placeholder: `...${key}`,
      value,
      // propReferenceInequality: () =>
      //   console.log(
      //     'This returns a new function reference in memory every time which breaks prop inequality',
      //   ),
    };
  });

  return (
    <BasicForm
      shouldMemoizeInputFields={shouldMemoizeInputFields}
      inputs={basicFormInputs}
      onChange={handleOnChange}
    />
  );
};

ReduxBasicForm.propTypes = {
  form1: FormProps,
  randFormFieldTypesMap: PropTypes.objectOf(PropTypes.string),
  shouldMemoizeInputFields: PropTypes.bool.isRequired,
  handleOnFormChange: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxBasicForm);
