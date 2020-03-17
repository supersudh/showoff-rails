import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import history from '../utils/history';

import globalReducer from './global';
import widgetReducer from './widget';


export default combineReducers({
  form: formReducer,
  router: connectRouter(history),
  global: globalReducer,
  widget: widgetReducer
});