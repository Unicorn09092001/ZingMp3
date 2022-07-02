import { createSlice } from "@reduxjs/toolkit";

const newReleaseSlice = createSlice({
  name: "newRelease",
  initialState: {
    listSong: [],
  },
  reducers: {
    getNewRelease: (state, action) => {
      state.listSong = action.payload;
    },
  },
});

const {
  actions: { getNewRelease },
  reducer,
} = newReleaseSlice;

export { getNewRelease };

export default reducer;
