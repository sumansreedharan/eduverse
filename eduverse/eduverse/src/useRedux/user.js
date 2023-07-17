import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null
}

const logginUser = createSlice({
    name : "loggedUser",
    initialState,
    reducers : {
        setLoggoedUser : (state,action) => {
            state.currentUser = action.payload;
        }
    }
})

export const { setLoggoedUser } = logginUser.actions;
export default logginUser.reducer;
