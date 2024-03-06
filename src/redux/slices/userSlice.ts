import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

interface InitialState {
  id: number | null;
  role: string | null;
  name: string | null;
  email: string | null;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    role: "",
    name: "",
    email: "",
  } as InitialState,
  reducers: {
    setLoggedInUserData: (state, action) => {
      state.id = _.get(action, "payload.id", null);
      state.role = _.get(action, "payload.role", null);
      state.name = `${_.get(action, "payload.first_name", null)}
      ${_.get(action, "payload.last_name", null)}`;
      state.email = _.get(action, "payload.email", null);
    },
    clearUserData: (state) => {
      state = { id: null, role: "", name: "", email: "" };
    },
  },
});
export const { setLoggedInUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
