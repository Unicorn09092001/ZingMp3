import { createSlice } from "@reduxjs/toolkit";
import { ARTIST_STORAGE_KEY } from "constants/index";

const personalArtistSlice = createSlice({
  name: "personalArtist",
  initialState: {
    list: JSON.parse(localStorage.getItem(ARTIST_STORAGE_KEY)) || [],
  },
  reducers: {
    setPersonalArtist: (state, action) => {
      state.list = action.payload;
    },
  },
});

const {
  actions: { setPersonalArtist },
  reducer,
} = personalArtistSlice;

export { setPersonalArtist };

export default reducer;
