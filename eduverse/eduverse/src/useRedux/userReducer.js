
// import { createReducer } from '@reduxjs/toolkit';
// import { setLoginDetails } from './userActions';

// const initialState = {
//   user: {},
//   mentor: {},
//   admin: {},
// };

// const userReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(setLoginDetails, (state, action) => {
//       const { user, role } = action.payload;
//       console.log('DetailsRedux:', user,role);
//       console.log('Current state:', state);
//       if (role === 'user') {
//         state.user = user;
//       } else if (role === 'mentor') {
//         state.mentor = user;
//       } else if (role === 'admin') {
//         state.admin = user;
//       }
//       console.log('Updated state:', state);
//     });
// });

// export default userReducer;



// import { createReducer } from '@reduxjs/toolkit';
// import { setLoginDetails } from './userActions';
// import { produce } from 'immer';

// const initialState = {
//   user: {},
//   mentor: {},
//   admin: {},
// };

// const userReducer = createReducer(initialState, (builder) => {
//   builder.addCase(setLoginDetails, (state, action) => {
//     const { user, role } = action.payload;
//     return produce(state, (draftState) => {
//       console.log('DetailsRedux:', user, role);
//       console.log('Current state:', state);
//       if (role === 'user') {
//         draftState.user = user;
//       } else if (role === 'mentor') {
//         draftState.mentor = user;
//       } else if (role === 'admin') {
//         draftState.admin = user;
//       }
//       console.log('Updated state:', draftState);
//     });
//   });
// });

// export default userReducer;



import { createReducer } from '@reduxjs/toolkit';
import { setLoginDetails } from './userActions';

const initialState = {
  userInfo: {},
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(setLoginDetails, (state, action) => {
    state.userInfo =  action.payload
    // const { user, role } = action.payload;
    // console.log('DetailsRedux:', user, role);
    // console.log('Current state:', state);
    // console.log('Updated state:', { ...state, [role]: user });
    // return { ...state};
  });
});

export default userReducer;


