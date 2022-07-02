import { createSlice } from "@reduxjs/toolkit";

const playlistTop100Slice = createSlice({
  name: "playlistTop100",
  initialState: {
    playlists: [],
  },
  reducers: {
    getPlaylistTop100: (state, action) => {
      state.playlists = action.payload;
    },
  },
});

const {
  actions: { getPlaylistTop100 },
  reducer,
} = playlistTop100Slice;

export { getPlaylistTop100 };

export default reducer;
