import { createSlice } from "@reduxjs/toolkit";

const playlistCurrentSlice = createSlice({
  name: "playlistCurrent",
  initialState: {
    encodeId: "",
    playlistData: {
      song: { items: [] },
      description: "",
      thumbnailM: "",
      contentLastUpdate: 0,
      artists: [],
      like: 0,
    },
  },
  reducers: {
    setPlaylistCurrent: (state, action) => {
      state.encodeId = action.payload;
    },
    setPlaylistData: (state, action) => {
      state.playlistData = action.payload;
    },
  },
});

const {
  actions: { setPlaylistCurrent, setPlaylistData },
  reducer,
} = playlistCurrentSlice;

export { setPlaylistCurrent, setPlaylistData };

export default reducer;
