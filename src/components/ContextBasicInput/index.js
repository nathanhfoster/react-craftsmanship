import React, { useCallback , Profiler } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'ContextStore'
import { BasicInput } from 'components'
import { handleOnFormChange } from 'redux/Form/actions'
import { InputProps } from 'components/BasicInput/propTypes'
import { FormWithUseContextAndReducerContext } from 'context'

// We are mapping into the values on individual input fields for atomicity
const mapStateToProps = (state, ownProps) => {
  const { reducerKey, fieldKey } = ownProps
  const form = state[reducerKey]
  const inputField = form[fieldKey]
  const { fieldDependencies, ...restOfInputProps } = inputField
  const invalid = fieldDependencies.some(fieldKey => {
    const { isInvalid, value } = form[fieldKey]

    return isInvalid(value)
  })

  return {
    ...restOfInputProps,
    name: fieldKey,
    invalid,
  }
}

const ContextBasicInput = ({ reducerKey, fieldKey, dispatch, ...inputProps }) => {
  const handleOnChange = useCallback(e => dispatch(handleOnFormChange('form2', e)), [])

  return <BasicInput {...inputProps} onChange={handleOnChange} />
}

ContextBasicInput.propTypes = {
  reducerKey: PropTypes.string.isRequired,
  fieldKey: PropTypes.string.isRequired,
  ...InputProps,
}

export default connect(mapStateToProps, undefined, FormWithUseContextAndReducerContext)(ContextBasicInput)
