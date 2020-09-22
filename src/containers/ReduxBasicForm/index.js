import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'reactstrap'
import { BasicInput, MemoizedComponent } from 'components'
import { SELECT_INPUT_OPTIONS } from 'redux/Form/utils'
import { handleOnFormChange } from 'redux/Form/actions'
import { FormProps } from 'redux/Form/propTypes'

const mapStateToProps = ({ Forms: { form1, shouldMemoizeInputFields } }) => ({
  form1,
  shouldMemoizeInputFields,
})

const mapDispatchToProps = { handleOnFormChange }

const ReduxBasicForm = ({
  form1,

  shouldMemoizeInputFields,
  handleOnFormChange,
}) => {
  const handleOnChange = useCallback(e => handleOnFormChange('form1', e), [])

  // Didn't use useMemo because the dependency array would contain all of the components props
  const renderInputFields = Object.entries(form1).map(([key, input]) => {
    const inputProps = {
      ...input,
      name: key,
      key,
      onChange: handleOnChange,
      // propReferenceInequality: () =>
      //   console.log(
      //     'This returns a new function reference in memory every time which breaks prop inequality',
      //   ),
    }

    return shouldMemoizeInputFields ? (
      <MemoizedComponent Component={BasicInput} {...inputProps} />
    ) : (
      <BasicInput {...inputProps} />
    )
  })

  return <Form>{renderInputFields}</Form>
}

ReduxBasicForm.propTypes = {
  form1: FormProps,
  shouldMemoizeInputFields: PropTypes.bool.isRequired,
  handleOnFormChange: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxBasicForm)
