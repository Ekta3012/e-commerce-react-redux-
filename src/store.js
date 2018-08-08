import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import addDataToView from './components/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  const store = createStore(
    addDataToView,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk),
    ),
  );

  return store;
}