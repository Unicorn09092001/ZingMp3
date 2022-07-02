import { createSlice } from "@reduxjs/toolkit";

const artistPageDataSlice = createSlice({
  name: "artistPageData",
  initialState: {
    alias: "",
    sections: [],
    artistInfo: {
      name: "",
      sortBiography: "",
      thumbnail: "",
      topAlbum: { encodeId: "", title: "" , thumbnail: "", releaseDate: ""},
      totalFollow: 0,
    },
  },
  reducers: {
    setArtistAlias: (state, action) => {
      state.alias = action.payload;
    },
    setArtistSection: (state, action) => {
      state.sections = action.payload;
    },
    setArtistInfo: (state, action) => {
      state.artistInfo = action.payload;
    },
  },
});

const {
  actions: { setArtistAlias, setArtistSection, setArtistInfo },
  reducer,
} = artistPageDataSlice;

export { setArtistAlias, setArtistSection, setArtistInfo };

export default reducer;
