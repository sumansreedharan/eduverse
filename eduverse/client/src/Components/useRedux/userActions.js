 
import { createAction } from '@reduxjs/toolkit';

export const setLoginDetails = createAction('user/setLoginDetails', (user) => {
  console.log('setlogin details:', user);
  return {
    payload: { user },
  };
});
