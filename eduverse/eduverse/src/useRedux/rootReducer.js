import { combineReducers } from 'redux';
// import userReducer from './userReducer';
import loggedUser from './user';

const rootReducer = combineReducers({
  // user: userReducer,
  loggedUser: loggedUser,
});



export default rootReducer;
