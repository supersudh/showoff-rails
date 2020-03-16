// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';

// import rootReducer from './reducers';

// export default function configureStore() {
//   const store = createStore(
//     rootReducer,
//     {},
//     composeWithDevTools(
//       applyMiddleware(thunk)
//     )
//   );
//   return store;
// }

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

export default function configureStore(initialState = {}, history) {
  let composeEnhancers = compose;
  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

  const middlewares = [thunk, routerMiddleware(history)];
  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers),
  );

  return store;
}