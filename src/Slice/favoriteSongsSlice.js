import { createSlice } from "@reduxjs/toolkit";

const favoriteSongsSlice = createSlice({
  name: "favoriteSongs",
  initialState: {
    songList: [],
  },
  reducers: {
    getFavoriteSongList: (state, action) => {
      state.songList = action.payload;
    },
  },
});

const {
  actions: { getFavoriteSongList },
  reducer,
} = favoriteSongsSlice;

export { getFavoriteSongList };

export default reducer;
