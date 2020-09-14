import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BasicDropDown } from 'components';
import { setNumberOfInputFields } from '../../redux/Form/actions';

const NUMBER_OF_INPUT_OPTIONS = [
  5,
  15,
  25,
  50,
  75,
  100,
  150,
  200,
  250,
  350,
  500,
  1000,
].map(o => ({ id: o }));

const mapStateToProps = ({ Forms: { numberOfInputFields } }) => ({
  numberOfInputFields,
});

const mapDispatchToProps = { setNumberOfInputFields };

const ReduxSetNumberOfFields = ({
  numberOfInputFields,
  setNumberOfInputFields,
}) => {
  const handleSetNumberOfInputFields = useCallback(
    value => setNumberOfInputFields(value),
    [],
  );

  return (
    <BasicDropDown
      options={NUMBER_OF_INPUT_OPTIONS}
      onChange={handleSetNumberOfInputFields}
      value={numberOfInputFields}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxSetNumberOfFields);

ReduxSetNumberOfFields.propTypes = {
  numberOfInputFields: PropTypes.number.isRequired,
  setNumberOfInputFields: PropTypes.func.isRequired,
};
