
/* eslint-disable no-undef */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

//v5.0
import createHistory from 'history/createHashHistory';
// user BrowserHistory
// import createHistory from 'history/createBrowserHistory';

//v4.0.8
// import {
//   browserHistory, hashHistory,
// } from 'react-router-dom';

import { routerMiddleware, ConnectedRouter } from 'react-router-redux';

import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';


import App from './main/index';
import appReducer from './redux/reducer/index';
import rootSaga from './redux/sagas/index';
import './app.less';



//https://www.npmjs.com/package/react-router-redux/v/5.0.0-alpha.8

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
//const middleware = routerMiddleware(history);

const sagaMiddleware = createSagaMiddleware();
//react-router-redux 2/4, put into middleware
const middlewares = [routerMiddleware(history), sagaMiddleware, logger];

const store = createStore(appReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);



////react-router-redux 3/4, add ConnectedRoute with history
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'),
);
