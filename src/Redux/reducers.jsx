import { combineReducers } from 'redux';
import accountReducer from './accountReducer'; // your account reducer
import planerReducer from './planerReducer'; // your planer reducer

const rootReducer = combineReducers({
  Account: accountReducer,
  Planer: planerReducer
});

export default rootReducer;