import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: {} as any,
  reducers: {
    setData: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
  },
});
export const { setData } = commonSlice.actions;
export default commonSlice.reducer;
