import { combineReducers } from 'redux';
import proverbs from './proverbs';
import alert from './alert';
import authreducer from './auth';

export default combineReducers({
  authreducer,
  proverbs,
  alert
});