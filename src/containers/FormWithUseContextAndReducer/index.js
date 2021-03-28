import React from 'react'
import { Form } from 'reactstrap'
import { ContextBasicInput } from 'components'
import { FormWithUseContextAndReducerOptions } from 'context'
import { connect } from 'resurrection'

const FormWithUseContextAndReducer = ({ renderInputs }) => {
  return <Form>{renderInputs}</Form>
}

const mapStateToProps = ({ form2 }) => ({
  renderInputs: Object.keys(form2).map(fieldKey => (
    <ContextBasicInput key={fieldKey} reducerKey='form2' fieldKey={fieldKey} />
  )),
})

export default connect(
  mapStateToProps,
  null,
  null,
  FormWithUseContextAndReducerOptions,
)(FormWithUseContextAndReducer)
