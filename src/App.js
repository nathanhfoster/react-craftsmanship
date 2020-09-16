import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import {
  ReduxSetNumberOfFields,
  ReduxBasicForm,
  ShouldMemoizeComponents,
  ReduxConnectForm,
} from 'containers'

const App = () => {
  return (
    <Container tag='main'>
      <Row tag='h1' className='justify-content-center'>
        React Form Memoziation
      </Row>
      <Row>
        <Col tag='h3'>
          Enable the
          <span className='text-info mx-1'>"Highlight updates when components render"</span>
          option in your
          <a
            className='ml-1'
            href='https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en'
            target='_blank'
            rel='noopener noreferrer'
          >
            React Developer Tools
          </a>{' '}
          to visiualize the rerenders of the two forms and their input fields
        </Col>
      </Row>
      <Row tag='h4' className='justify-content-center'>
        Check out the source code on{' '}
        <a
          href='https://github.com/strap8/react-craftsmanship'
          target='_blank'
          rel='noopener noreferrer'
        >
          GitHub
        </a>
      </Row>
      <Row className='justify-content-center'>
        <iframe
          title='Visualize The Power Of Redux and Memoizationi In React'
          width={560}
          height={315}
          src='https://www.youtube.com/embed/KypVn6vGFWg'
          frameborder='0'
          allow='accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture'
          allowfullscreen
        ></iframe>
      </Row>
      <Row className='my-3'>
        <Col>
          <div className='d-inline-flex'>
            <ReduxSetNumberOfFields />
            <label className='ml-1'>Number of input fields</label>
          </div>
          <div className='text-info'>
            Notice how the <span className='text-success'>Form with useState</span> struggles with
            hundreds of fields without memoization
          </div>
        </Col>

        <Col>
          <ShouldMemoizeComponents />
          <span className='text-info'>
            Notice how this helps the <span className='text-success'>Form with useState</span> for
            hundreds of fields but not when there is thousands. It doesn't really effect the{' '}
            <span className='text-success'>Form with redux</span> because each field is atomic and
            isolated from one another
          </span>
        </Col>
      </Row>
      <Row className='border'>
        <Col xs={6}>
          <h2 className='text-center text-success'>Form with useState</h2>
          <h5 className='text-center text-info'>
            Input fields are tightly coupled to the parent's state
          </h5>
          <ReduxBasicForm />
        </Col>
        <Col xs={6}>
          <h2 className='text-center text-success'>Form with redux</h2>
          <h5 className='text-center text-info'>Input fields are atomic and are isolated</h5>
          <ReduxConnectForm />
        </Col>
      </Row>
    </Container>
  )
}

export default App
