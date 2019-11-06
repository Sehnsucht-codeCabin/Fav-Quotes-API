/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Provider } from 'react-redux';
import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import authReducer from './store/authReducer';
import favQuotesReducer from './store/favQuotesReducer';
// combine reducers
const reducers = combineReducers({
  authReducer,
  favQuotesReducer,
});
const store = createStore(reducers, applyMiddleware(thunk));

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
);

export default App;
