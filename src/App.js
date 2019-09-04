/* eslint-disable react/jsx-filename-extension */
/* eslint-disable func-names */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Link } from 'react-router-dom';
import Routes from './Routes';
import reducer from './store/authReducer';
// create redux store
const composeEnhancers =
  process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose; // this will connects our app to the chrome extension, or if it does not succed on that, 'compose' will do the trick!!!
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));


// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
