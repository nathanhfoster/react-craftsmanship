import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import 'index.css'
import { FormWithUseContextAndReducerProvider } from 'providers'
import App from 'App'
import { LoadingScreen } from 'components'
import storeFactory from './redux'
import { reducers } from './redux/reducers'
import { Provider } from 'react-redux'
import { ContextProvider } from 'ContextStore'
import * as serviceWorker from './serviceWorker'

const store = storeFactory()

ReactDOM.render(
  <Provider store={store}>
    {/* <ContextProvider reducers={reducers}> */}
    <Suspense fallback={<LoadingScreen />}>
      <FormWithUseContextAndReducerProvider>
        <App />
      </FormWithUseContextAndReducerProvider>
    </Suspense>
    {/* </ContextProvider>, */}
  </Provider>,
  document.getElementById('root'),
)

serviceWorker.register(serviceWorker.serviceWorkerConfig(store))
