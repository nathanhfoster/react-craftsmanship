import React from 'react'
import { Form } from 'reactstrap'
import { ContextBasicInput, MemoizedComponent } from 'components'
import { FormWithUseContextAndReducerContext } from 'context'
import { useSelector } from 'context'

// useSelector and the equality function if fields are not known.
// we want to implement this because we don't want to rerender when a field in form2 changes
// we only want this component to rerender when the length of the fieldKeys change or we want memoize our input fields
const isEqual = (nextSelection, prevSelection) => {
  const {
    shouldMemoizeInputFields: prevShouldMemoizeInputFields,
    renderInputs: prevRenderInputs,
  } = prevSelection

  const {
    shouldMemoizeInputFields: nextShouldMemoizeInputFields,
    renderInputs: nextRenderInputs,
  } = nextSelection

  const shouldMemoizeInputFieldsAreEqual =
    prevShouldMemoizeInputFields === nextShouldMemoizeInputFields

  const renderInputsAreEqual = prevRenderInputs.length === nextRenderInputs.length

  const isEqual = shouldMemoizeInputFieldsAreEqual && renderInputsAreEqual

  return isEqual
}

const mapStateToProps = ({ form2, shouldMemoizeInputFields }) => ({
  shouldMemoizeInputFields,
  renderInputs: Object.keys(form2).map(fieldKey =>
    shouldMemoizeInputFields ? (
      <MemoizedComponent
        Component={ContextBasicInput}
        key={fieldKey}
        reducerKey='form2'
        fieldKey={fieldKey}
      />
    ) : (
      <ContextBasicInput key={fieldKey} reducerKey='form2' fieldKey={fieldKey} />
    ),
  ),
})

const FormWithUseContextAndReducer = () => {
  // similar to the connect function but doesn;t not support memoization out of the box
  // we implement our own equality function to reduce the times renderInputs is computed
  const { renderInputs } = useSelector(
    FormWithUseContextAndReducerContext,
    mapStateToProps,
    isEqual,
  )

  return <Form>{renderInputs}</Form>
}

export default FormWithUseContextAndReducer
