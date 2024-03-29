import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BasicDropDown } from 'components';
import { setNumberOfInputFields } from '../../redux/Form/actions';
import { NUMBER_OF_INPUT_OPTIONS } from '../../redux/Form/utils';
import { FormWithUseContextAndReducerDispatchContext } from 'context';
import { useDispatch } from 'resurrection';

const OPTIONS = NUMBER_OF_INPUT_OPTIONS.map(o => ({ id: o }));

const ReduxSetNumberOfFields = ({
  numberOfInputFields,
  setNumberOfInputFields
}) => {
  const FormWithUseContextAndReducerDispatch = useDispatch(
    FormWithUseContextAndReducerDispatchContext
  );

  const handleSetNumberOfInputFields = useCallback(value => {
    setNumberOfInputFields(value);
    FormWithUseContextAndReducerDispatch(setNumberOfInputFields(value));
  }, []);

  return (
    <BasicDropDown
      options={OPTIONS}
      onChange={handleSetNumberOfInputFields}
      value={numberOfInputFields}
    />
  );
};

const mapStateToProps = ({ Forms: { numberOfInputFields } }) => ({
  numberOfInputFields
});

const mapDispatchToProps = { setNumberOfInputFields };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxSetNumberOfFields);

ReduxSetNumberOfFields.propTypes = {
  numberOfInputFields: PropTypes.number.isRequired,
  setNumberOfInputFields: PropTypes.func.isRequired
};
