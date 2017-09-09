import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logger, crashReporter } from './dispatchMiddleware';
import REDUCERS from './reducerRegistry';

export default function store() {
  const reducers = combineReducers(REDUCERS);

  return (createStore(reducers, applyMiddleware(logger, crashReporter)));
}
