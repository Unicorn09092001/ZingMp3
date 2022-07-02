import { createSlice } from "@reduxjs/toolkit";
import { PLAYLIST_STORAGE_KEY } from "constants/index";

const personalPlaylistSlice = createSlice({
  name: "personalPlaylist",
  initialState: {
    list: JSON.parse(localStorage.getItem(PLAYLIST_STORAGE_KEY)) || [],
  },
  reducers: {
    setPersonalPlaylist: (state, action) => {
      state.list = action.payload;
    },
  },
});

const {
  actions: { setPersonalPlaylist },
  reducer,
} = personalPlaylistSlice;

export { setPersonalPlaylist };

export default reducer;
