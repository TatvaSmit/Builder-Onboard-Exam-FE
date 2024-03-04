import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import modalReducer from "./slices/modalSlice";
import techModalReducer from "./slices/updateTechSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    techModal: techModalReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
