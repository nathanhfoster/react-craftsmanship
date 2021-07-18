import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BasicInput } from 'components';
import { toggleShouldMemoizeInputFields } from '../../redux/Form/actions';

const mapStateToProps = ({ Forms: { shouldMemoizeInputFields } }) => ({
  shouldMemoizeInputFields
});

const mapDispatchToProps = { toggleShouldMemoizeInputFields };

const ShouldMemoizeComponents = ({
  shouldMemoizeInputFields,
  toggleShouldMemoizeInputFields
}) => {
  const handleSetNumberOfInputFields = useCallback(() => {
    toggleShouldMemoizeInputFields();
  }, []);

  const renderCheckBox = useMemo(
    () => (
      <BasicInput
        id='ShouldMemoizeComponents'
        type='checkbox'
        label='Memoize Input Fields'
        name='shouldMemoizeInputFields'
        onChange={handleSetNumberOfInputFields}
        value={shouldMemoizeInputFields}
      />
    ),
    [shouldMemoizeInputFields]
  );

  return renderCheckBox;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShouldMemoizeComponents);

ShouldMemoizeComponents.propTypes = {
  shouldMemoizeInputFields: PropTypes.bool.isRequired,
  toggleShouldMemoizeInputFields: PropTypes.func.isRequired
};
