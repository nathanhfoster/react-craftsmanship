import React, { useCallback, Profiler } from "react"
import PropTypes from "prop-types"
import { connect } from "resurrection"
import { BasicInput } from "components"
import { handleOnFormChange } from "redux/Form/actions"
import { InputProps } from "components/BasicInput/propTypes"
import { FormWithUseContextAndReducerOptions } from "context"

// We are mapping into the values on individual input fields for atomicity
const mapStateToProps = (state, ownProps) => {
  const { reducerKey, fieldKey } = ownProps
  const form = state[reducerKey]
  const inputField = form[fieldKey]
  const { fieldDependencies, ...restOfInputProps } = inputField
  const invalid = fieldDependencies.some((fieldKey) => {
    const { isInvalid, value } = form[fieldKey]

    return isInvalid(value)
  })

  return {
    ...restOfInputProps,
    name: fieldKey,
    invalid,
  }
}

const mapDispatchToProps = {
  handleOnFormChange,
}

const ContextBasicInput = ({
  reducerKey,
  fieldKey,
  handleOnFormChange,
  ...inputProps
}) => {
  const handleOnChange = useCallback((e) => handleOnFormChange("form2", e), [])

  return (
    <BasicInput
      id="ContextBasicInput"
      {...inputProps}
      onChange={handleOnChange}
    />
  )
}

ContextBasicInput.propTypes = {
  reducerKey: PropTypes.string.isRequired,
  fieldKey: PropTypes.string.isRequired,
  handleOnFormChange: PropTypes.func.isRequired,
  ...InputProps,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  FormWithUseContextAndReducerOptions
)(ContextBasicInput)
