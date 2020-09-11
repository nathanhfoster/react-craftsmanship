import React, { useMemo, memo } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import { BasicForm } from './components'
import {
  SELECT_INPUT_OPTIONS,
  RANDOM_FORM_FIELD_TYPES_MAP,
} from './redux/Form/utils'
import { handleOnFormChange } from './redux/Form/actions'
import { FormProps } from './redux/Form/propTypes'

const mapStateToProps = ({ Form }) => ({ Form })

const mapDispatchToProps = { handleOnFormChange }

const App = ({ Form, handleOnFormChange }) => {
  const basicFormInputs = useMemo(
    () =>
      Object.entries(Form).map(([key, value]) => {
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
      }),
    [Form],
  )

  return (
    <Container tag='main'>
      <Row tag='h1' className='justify-content-center'>
        React Form Memoziation
      </Row>
      <Row>
        <Col xs={12}>
          <BasicForm inputs={basicFormInputs} onChange={handleOnFormChange} />
        </Col>
      </Row>
    </Container>
  )
}

App.propTypes = { Form: FormProps }

export default connect(mapStateToProps, mapDispatchToProps)(memo(App))
