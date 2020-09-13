import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'App';
import storeFactory from './redux';
import { reducers } from './redux/reducers';
import { Provider } from 'react-redux';
import { ContextProvider } from 'store';
import * as serviceWorker from './serviceWorker';

const store = storeFactory();

ReactDOM.render(
  <Provider store={store}>
    {/* <ContextProvider reducers={reducers}> */}
      <App />
    {/* </ContextProvider>, */}
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.register(serviceWorker.serviceWorkerConfig(store));
