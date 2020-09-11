import { reducers } from './reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const RootReducer = combineReducers(reducers);

const { NODE_ENV } = process.env;

const storeFactory = () => {
  const inDevelopmentMode = NODE_ENV == 'development';

  const middleWares = inDevelopmentMode
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk);

  const store = createStore(RootReducer, middleWares);

  return store;
};

export default storeFactory;
