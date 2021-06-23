import { combineReducers } from 'redux';
import todos from './todos';
import remaining from './remaining';
import visibility from './visibility';

export default combineReducers({ todos, remaining, visibility });
