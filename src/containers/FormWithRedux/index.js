import React from 'react'
import { useSelector } from 'react-redux'
import { Form } from 'reactstrap'
import { ReduxBasicInput, MemoizedComponent } from 'components'

// useSelector and the equality function if fields are not known.
// we want to implement this because we don't want to rerender when a field in form3 changes
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

const mapStateToProps = ({ Forms: { form3, shouldMemoizeInputFields } }) => ({
  shouldMemoizeInputFields,
  renderInputs: Object.keys(form3).map(fieldKey =>
    shouldMemoizeInputFields ? (
      <MemoizedComponent
        Component={ReduxBasicInput}
        key={fieldKey}
        reducerKey='form3'
        fieldKey={fieldKey}
      />
    ) : (
      <ReduxBasicInput key={fieldKey} reducerKey='form3' fieldKey={fieldKey} />
    ),
  ),
})

const FormWithRedux = () => {
  // similar to the connect function but doesn;t not support memoization out of the box
  // we implement our own equality function to reduce the times renderInputs is computed
  const { renderInputs } = useSelector(mapStateToProps, isEqual)

  return <Form>{renderInputs}</Form>
}

export default FormWithRedux
