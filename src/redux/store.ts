import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import modalReducer from "./slices/modalSlice";
import techModalReducer from "./slices/updateTechSlice";
import commonReducer from "./slices/commonSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    techModal: techModalReducer,
    common: commonReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
