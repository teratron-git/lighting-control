import { combineReducers } from 'redux';
import { authReducer } from './auth/reducers';
import { dataReducer } from './data/reducers';

export default combineReducers({
  auth: authReducer,
  data: dataReducer,
});
