import React from 'react'
import { Form } from 'reactstrap'
import { ContextBasicInput } from 'components'
import { FormWithUseContextAndReducerContext } from 'context'
import { useSelector } from 'ContextStore'

// useSelector and the equality function if fields are not known.
// we want to implement this because we don't want to rerender when a field in form2 changes
// we only want this component to rerender when the length of the fieldKeys change or we want memoize our input fields
const isEqual = (nextSelection, prevSelection) => {
  const renderInputsAreEqual = prevSelection.length === nextSelection.length
  return renderInputsAreEqual
}

const mapStateToSelector = ({ form2 }) =>
  Object.keys(form2).map(fieldKey => (
    <ContextBasicInput key={fieldKey} reducerKey='form2' fieldKey={fieldKey} />
  ))

const FormWithUseContextAndReducer = () => {
  // similar to the connect function but doesn;t not support memoization out of the box
  // we implement our own equality function to reduce the times renderInputs is computed
  const renderInputs = useSelector(mapStateToSelector, isEqual, FormWithUseContextAndReducerContext)

  return <Form>{renderInputs}</Form>
}

export default FormWithUseContextAndReducer
