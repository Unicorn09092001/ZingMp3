import { createSlice } from "@reduxjs/toolkit";
import { ALBUM_STORAGE_KEY } from "constants/index";

const personalAlbumSlice = createSlice({
  name: "personalAlbum",
  initialState: {
    list: JSON.parse(localStorage.getItem(ALBUM_STORAGE_KEY)) || [],
  },
  reducers: {
    setPersonalAlbum: (state, action) => {
      state.list = action.payload;
    },
  },
});

const {
  actions: { setPersonalAlbum },
  reducer,
} = personalAlbumSlice;

export { setPersonalAlbum };

export default reducer;
