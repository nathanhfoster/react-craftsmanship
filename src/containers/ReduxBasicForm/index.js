import React, { useMemo, useCallback } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Form } from "reactstrap"
import { BasicInput, MemoizedComponent } from "components"
import { SELECT_INPUT_OPTIONS } from "redux/Form/utils"
import { handleOnFormChange } from "redux/Form/actions"
import { FormProps } from "redux/Form/propTypes"

const mapStateToProps = ({
  Forms: { form1, randFormFieldTypesMap, shouldMemoizeInputFields },
}) => ({
  form1,
  randFormFieldTypesMap,
  shouldMemoizeInputFields,
})

const mapDispatchToProps = { handleOnFormChange }

const ReduxBasicForm = ({
  form1,
  randFormFieldTypesMap,
  shouldMemoizeInputFields,
  handleOnFormChange,
}) => {
  const handleOnChange = useCallback((e) => handleOnFormChange("form1", e), [])

  // Didn't use useMemo because the dependency array would contain all of the components props
  const renderInputFields =
    // useMemo(
    //   () =>
    Object.entries(form1).map(([key, value]) => {
      const type = randFormFieldTypesMap[key]

      const inputProps = {
        key,
        name: key,
        type,
        options: type === "select" ? SELECT_INPUT_OPTIONS : undefined,
        label: key.toUpperCase(),
        placeholder: `...${key}`,
        value,
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

  //   , [form1, randFormFieldTypesMap, shouldMemoizeInputFields, handleOnChange],
  // );

  return <Form>{renderInputFields}</Form>
}

ReduxBasicForm.propTypes = {
  form1: FormProps,
  randFormFieldTypesMap: PropTypes.objectOf(PropTypes.string),
  shouldMemoizeInputFields: PropTypes.bool.isRequired,
  handleOnFormChange: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxBasicForm)
