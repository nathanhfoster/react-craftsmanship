import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { BasicForm } from 'components'
import {
  SELECT_INPUT_OPTIONS,
  RANDOM_FORM_FIELD_TYPES_MAP,
} from 'redux/Form/utils'
import { handleOnFormChange } from 'redux/Form/actions'
import { FormProps } from 'redux/Form/propTypes'

const mapStateToProps = ({ Forms: { form1 } }) => ({ form1 })

const mapDispatchToProps = { handleOnFormChange }

const ReduxBasicForm = ({ form1, handleOnFormChange }) => {
  const handleOnChange = useCallback(e => handleOnFormChange('form1', e), [])
  const basicFormInputs = Object.entries(form1).map(([key, value]) => {
    return {
      name: key,
      type: RANDOM_FORM_FIELD_TYPES_MAP[key],
      options: SELECT_INPUT_OPTIONS,
      label: key.toUpperCase(),
      placeholder: `...${key}`,
      value,
      // propReferenceInequality: () =>
      //   console.log(
      //     'This returns a new function reference in memory every time which breaks prop inequality',
      //   ),
    }
  })

  return (
    <BasicForm
      title='BasicForm'
      inputs={basicFormInputs}
      onChange={handleOnChange}
    />
  )
}

ReduxBasicForm.propTypes = { form1: FormProps }

export default connect(mapStateToProps, mapDispatchToProps)(ReduxBasicForm)
