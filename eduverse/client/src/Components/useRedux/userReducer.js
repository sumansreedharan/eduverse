
import { createReducer } from '@reduxjs/toolkit';
import { setLoginDetails } from './userActions';

const initialState = {
  userInfo: {},
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(setLoginDetails, (state, action) => {
    state.userInfo =  action.payload
  });
});

export default userReducer;


