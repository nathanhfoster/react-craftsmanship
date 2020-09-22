import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BasicInput } from 'components'
import { handleOnFormChange } from 'redux/Form/actions'
import { InputProps } from 'components/BasicInput/propTypes'

// We are mapping into the values on individual input fields for atomicity
const mapStateToProps = ({ Forms }, { reducerKey, fieldKey }) => {
  const form = Forms[reducerKey]
  const inputField = form[fieldKey]
  const { fieldDependencies } = inputField
  const invalid = fieldDependencies.some(fieldKey => {
    const { isInvalid, value } = form[fieldKey]

    return isInvalid(value)
  })

  return {
    ...inputField,
    name: fieldKey,
    invalid,
  }
}

const mapDispatchToProps = { handleOnFormChange }

const ReduxBasicInput = ({ handleOnFormChange, ...inputProps }) => {
  const handleOnChange = useCallback(e => handleOnFormChange('form2', e), [])

  return <BasicInput {...inputProps} onChange={handleOnChange} />
}

ReduxBasicInput.propTypes = {
  reducerKey: PropTypes.string.isRequired,
  fieldKey: PropTypes.string.isRequired,
  ...InputProps,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxBasicInput)
