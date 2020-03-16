import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import globalReducer from './global';


export default combineReducers({
  form: formReducer,
  global: globalReducer
});