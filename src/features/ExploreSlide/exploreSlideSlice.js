import { createSlice } from "@reduxjs/toolkit";
import { EXPLORE_SLIDE_STORAGE_KEY } from "constants/index";

const exploreSlideSlice = createSlice({
  name: "exploreSlide",
  initialState: {
    listSlide:
      JSON.parse(localStorage.getItem(EXPLORE_SLIDE_STORAGE_KEY)) || [],
  },
  reducers: {
    setListSlide: (state, action) => {
      state.listSlide = action.payload;
    },
  },
});

const {
  actions: { setListSlide },
  reducer,
} = exploreSlideSlice;

export { setListSlide };

export default reducer;
