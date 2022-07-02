import { configureStore } from "@reduxjs/toolkit";
import songReducer from "features/PlayMusic/listSongSlice";
import musicReducer from "features/PlayerMusic/musicSlice";
import personalPlaylistReducer from "features/Playlist/personalPlaylistSlice";
import personalAlbumReducer from "features/Album/personalAlbumSlice";
import personalMvReducer from "features/Mv/personalMvSlice";
import personalArtistReducer from "features/Artist/personalArtistSlice";
import exploreSlideReducer from "features/ExploreSlide/exploreSlideSlice";
import containerDataReducer from "components/Container/containerDataSlice";
import songRankingReducer from "features/SongRanking/songRankingSlice";
import radioReducer from "features/Radio/RadioSlice";
import postReducer from "features/Post/postSlice";
import themeReducer from "features/ThemeModal/themeSlice";
import toastReducer from "features/Toast/toastSlice";
import configReducer from "configSlice";
import newReleaseReducer from "Slice/newReleaseSlice";
import songCurrentDataReducer from "Slice/songCurrentDataSlice";
import playSongCurrentInfoReducer from "Slice/playSongCurrentInfoSlice";
import playlistTop100Reducer from "Slice/playlistTop100Slice";
import favoriteSongsReducer from "Slice/favoriteSongsSlice";
import playlistCurrentReducer from "Slice/playlistCurrentSlice";
import isLoadingTabReducer from "Slice/isLoadingTabSlice";
import artistPageDataReducer from "Slice/artistPageDataSlice";
import searchKeyWordReducer from "Slice/searchKeyWordSlice"
import mvListReducer from "Slice/mvListSlice"

const rootReducer = {
  listSong: songReducer,
  music: musicReducer,
  personalPlaylist: personalPlaylistReducer,
  personalAlbum: personalAlbumReducer,
  personalMv: personalMvReducer,
  personalArtist: personalArtistReducer,
  exploreSlide: exploreSlideReducer,
  containerData: containerDataReducer,
  songRanking: songRankingReducer,
  radio: radioReducer,
  post: postReducer,
  theme: themeReducer,
  toast: toastReducer,
  config: configReducer,
  //
  newRelease: newReleaseReducer,
  songCurrentData: songCurrentDataReducer,
  playSongCurrentInfo: playSongCurrentInfoReducer,
  playlistTop100: playlistTop100Reducer,
  favoriteSongs: favoriteSongsReducer,
  playlistCurrent: playlistCurrentReducer,
  isLoadingTab: isLoadingTabReducer,
  artistPageData: artistPageDataReducer,
  searchKeyWord: searchKeyWordReducer,
  mvList: mvListReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
