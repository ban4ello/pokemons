import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './components/App.js';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import allReducers from './redux/reducers';
import { Provider } from 'react-redux';

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// import { Router, Route, IndexRoute, browserHistory } from 'react-router'
//
// render(
//   <Router history={browserHistory}>
//     <Route path='/' component={App}>
//       <IndexRoute component={Home} />
//       <Route path='admin' component={Admin} />
//       <Route path='genre' component={Genre} />
//     </Route>
//   </Router>,
//   document.getElementById('root')
// )
