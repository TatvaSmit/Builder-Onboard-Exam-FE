import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { id: 1, role: "admin" },
  reducers: {
    setLoggedInUserData: (state, action) => {},
  },
});
export const { setLoggedInUserData } = userSlice.actions;
export default userSlice.reducer;
