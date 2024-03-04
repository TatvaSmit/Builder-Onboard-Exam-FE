import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  id: number;
  role: string;
}

const userSlice = createSlice({
  name: "user",
  initialState: { id: 1, role: "admin" } as InitialState | null,
  reducers: {
    setLoggedInUserData: (state, action) => {
      return (state = action.payload);
    },
    clearUserData: (state) => {
      state = null;
    },
  },
});
export const { setLoggedInUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
