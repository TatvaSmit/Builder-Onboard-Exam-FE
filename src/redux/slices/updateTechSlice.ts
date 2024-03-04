import { createSlice } from "@reduxjs/toolkit";

interface TechUpdateFormData {
  technology: string | null;
  duration: number | null;
  noOfQuestions: number | null;
  errors: {
    technology: string | null;
    duration: string | null;
    noOfQuestions: string | null;
  };
}
interface InitialState {
  techUpdateFormData: TechUpdateFormData;
}

const updateTechSlice = createSlice({
  name: "updateTechnology",
  initialState: {
    techUpdateFormData: {
      technology: null,
      duration: null,
      noOfQuestions: null,
      errors: {
        technology: null,
        duration: null,
        noOfQuestions: null,
      },
    },
  } as InitialState,
  reducers: {
    techFormOnChange: (state, action) => {
      const { name, value } = action.payload;
      const { techUpdateFormData } = state;
      state.techUpdateFormData = {
        ...techUpdateFormData,
        [name]: value,
        errors: {
          ...techUpdateFormData.errors,
          [name]: value ? null : `${name} is required!`,
        },
      };
    },
    setErrors: (state) => {
      state.techUpdateFormData = {
        ...state.techUpdateFormData,
        errors: {
          ...state.techUpdateFormData.errors,
          technology: state.techUpdateFormData.technology
            ? null
            : "technology required!",
          duration: state.techUpdateFormData.duration
            ? null
            : "duration required!",
          noOfQuestions: state.techUpdateFormData.noOfQuestions
            ? null
            : "no of questions required!",
        },
      };
    },
    resetForm: (state) => {
      state.techUpdateFormData = {
        technology: null,
        duration: null,
        noOfQuestions: null,
        errors: {
          technology: null,
          duration: null,
          noOfQuestions: null,
        },
      };
    },
  },
});
export const { techFormOnChange, setErrors, resetForm } =
  updateTechSlice.actions;
export default updateTechSlice.reducer;
