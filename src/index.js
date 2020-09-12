import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import storeFactory from './redux';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

const store = storeFactory();

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root'),
);

serviceWorker.register();
