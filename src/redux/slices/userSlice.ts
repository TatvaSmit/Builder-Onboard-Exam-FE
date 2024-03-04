import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setLoggedInUserData: (state, action) => {
      return state = action.payload;
    },
    clearUserData: (state) => {
      return state = {};
    },
  },
});
export const { setLoggedInUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
