import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BasicDropDown } from 'components';
import { setNumberOfInputFields } from '../../redux/Form/actions';
import { NUMBER_OF_INPUT_OPTIONS } from '../../redux/Form/utils';
import { FormWithUseContextAndReducerContext } from 'context';
import { useDispatch } from 'resurrection';

const OPTIONS = NUMBER_OF_INPUT_OPTIONS.map(o => ({ id: o }));

const mapStateToProps = ({ Forms: { numberOfInputFields } }) => ({
  numberOfInputFields
});

const mapDispatchToProps = { setNumberOfInputFields };

const ReduxSetNumberOfFields = ({
  numberOfInputFields,
  setNumberOfInputFields
}) => {
  const FormWithUseContextAndReducerDispatch = useDispatch(
    FormWithUseContextAndReducerContext
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxSetNumberOfFields);

ReduxSetNumberOfFields.propTypes = {
  numberOfInputFields: PropTypes.number.isRequired,
  setNumberOfInputFields: PropTypes.func.isRequired
};
