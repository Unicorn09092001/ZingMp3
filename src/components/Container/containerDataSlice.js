import { createSlice } from "@reduxjs/toolkit";
import {
  NORMAL_PLAYLIST_STORAGE_KEY,
  SPECIAL_PLAYLIST_STORAGE_KEY,
  LABEL_STORAGE_KEY,
  SINGER_SLIDE_STORAGE_KEY,
  BRAND_STORAGE_KEY,
} from "constants/index";

const containerDataSlice = createSlice({
  name: "containerData",
  initialState: {
    normalPlaylist: [],
    specialPlaylist:
      JSON.parse(localStorage.getItem(SPECIAL_PLAYLIST_STORAGE_KEY)) || [],
    labelList: JSON.parse(localStorage.getItem(LABEL_STORAGE_KEY)) || [],
    singerSlideList:
      JSON.parse(localStorage.getItem(SINGER_SLIDE_STORAGE_KEY)) || [],
    eventList: [],
    newReleaseList: [],
    favoriteArtistList: [],
    brandList: JSON.parse(localStorage.getItem(BRAND_STORAGE_KEY)) || [],
    explorePlaylist: {},
    top100: [],
    exploreAlbum: [],
  },
  reducers: {
    setNormalPlaylist: (state, action) => {
      state.normalPlaylist = action.payload;
    },
    setExplorePlaylist: (state, action) => {
      state.explorePlaylist = action.payload;
    },
    setLabelList: (state, action) => {
      state.labelList = action.payload;
    },
    setTop100: (state, action) => {
      state.top100 = action.payload;
    },
    setEventList: (state, action) => {
      state.eventList = action.payload;
    },
    setNewReleaseList: (state, action) => {
      state.newReleaseList = action.payload;
    },
    setFavoriteArtistList: (state, action) => {
      state.favoriteArtistList = action.payload;
    },
    setExploreAlbum: (state, action) => {
      state.exploreAlbum = action.payload;
    },
  },
});

const {
  actions: {
    setNormalPlaylist,
    setExplorePlaylist,
    setLabelList,
    setTop100,
    setEventList,
    setNewReleaseList,
    setFavoriteArtistList,
    setExploreAlbum,
  },
  reducer,
} = containerDataSlice;

export {
  setNormalPlaylist,
  setExplorePlaylist,
  setLabelList,
  setTop100,
  setEventList,
  setNewReleaseList,
  setFavoriteArtistList,
  setExploreAlbum,
};

export default reducer;
