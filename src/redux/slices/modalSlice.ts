import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    open: false,
    description: null,
    type: "",
    title: "",
    dialogContent: null,
    onSubmit: () => {},
    onCancel: () => {},
  },
  reducers: {
    openModal: (state, action) => {
      const { type, title, description, onCancel, onSubmit, dialogContent } =
        action.payload;
      state.open = true;
      state.type = type;
      state.description = description;
      state.title = title;
      state.dialogContent = dialogContent;
      state.onCancel = onCancel;
      state.onSubmit = onSubmit;
    },
    closeModal: (state) => {
      state.open = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
