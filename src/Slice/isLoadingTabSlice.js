import { createSlice } from "@reduxjs/toolkit";

const isLoadingTabSlice = createSlice({
  name: "isLoadingTab",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setIsLoadingTab: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

const {
  actions: { setIsLoadingTab },
  reducer,
} = isLoadingTabSlice;

export { setIsLoadingTab };

export default reducer;
