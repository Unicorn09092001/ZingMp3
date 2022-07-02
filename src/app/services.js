import axios from "axios";

const API_CHART_PAGE = "http://localhost:3000/api/chart-home";

const API_NEW_RELEASE_PAGE = "http://localhost:3000/api/playlist?id=ZABDOABU";

const API_PATH_SONG = "http://localhost:3000/api/song?id=";

const API_SONG_INFO = "http://localhost:3000/api/info?id=";

const API_ARTIST_PAGE = "http://localhost:3000/api/artist?name=";

const API_EXPLORE_PAGE = "http://localhost:3000/api/home?page=";

//const API_TOP100_PAGE = "http://localhost:3000/api/top100";
const API_TOP100_PAGE = "http://localhost:3000/api/top100";

const API_PLAYLIST_INFO = "http://localhost:3000/api/playlist?id=";
//"http://localhost:3000/api/playlist?id=";

const API_FAVORITE_SONGS =
  "http://6220cd52afd560ea699df17d.mockapi.io/favoriteSongList/";

const API_FAVORITE_PLAYLIST =
  "http://6220cd52afd560ea699df17d.mockapi.io/favoritePlaylist/";

const API_FAVORITE_ARTISTS =
  "http://6220cd52afd560ea699df17d.mockapi.io/airtists/";

const API_FAVORITE_ALBUMS =
  "http://6220cd52afd560ea699df17d.mockapi.io/favoriteAlbum/";

const HISTORY_PAGE = "https://629f0c738b939d3dc28d6fcc.mockapi.io/History_path/1"

const API_SEARCH="http://localhost:3000/api/search?keyword=";

const API_SONG_LYRIC = "http://localhost:3000/api/lyric?id=";

const API_MV_LIST = "http://localhost:3000/api/listMV";

const API_MV = "http://localhost:3000/api//video?id=";

export const getApiMv = (id) => {
  var url = API_MV + id;
  return axios.get(url)
}

export const getApiMvList = (id, page, count) => {
  var url = API_MV_LIST + "?id=" + id + "&page=" + page + "&count=" + count;
  return axios.get(url)
}

export const getApiSongLyric = (songId) => {
  var url = API_SONG_LYRIC + songId
  return axios.get(url)
}

export const getApiSearch = (keyWord) => {
  var url = API_SEARCH + keyWord;
  return axios.get(url)
}

export const getApiChartPage = () => {
  return axios.get(API_CHART_PAGE);
};

export const getApiNewReleasePage = () => {
  return axios.get(API_NEW_RELEASE_PAGE);
};

export const getSongById = (encodeId) => {
  var url = API_PATH_SONG + encodeId;
  return axios.get(url);
};

export const getPlaylistById = (encodeId) => {
  var url = API_PLAYLIST_INFO + encodeId;
  return axios.get(url);
};

export const getSongInfoById = (encodeId) => {
  var url = API_SONG_INFO + encodeId;
  return axios.get(url);
};

export const getApiArtistPage = (alias) => {
  var url = API_ARTIST_PAGE + alias;
  return axios.get(url);
};

export const getApiExplorePage = (id) => {
  var url = API_EXPLORE_PAGE + id;
  return axios.get(url);
};

export const getApiTop100Page = () => {
  return axios.get(API_TOP100_PAGE);
};

export const getFavoriteSongs = () => {
  return axios.get(API_FAVORITE_SONGS);
};

export const updateFavoriteSongs = (obj) => {
  return axios.post(API_FAVORITE_SONGS, obj);
};

export const removeFavoriteSong = (id) => {
  var url = API_FAVORITE_SONGS + id;
  return axios.delete(url);
};

export const getFavoritePlaylists = () => {
  return axios.get(API_FAVORITE_PLAYLIST);
};

export const updateFavoritePlaylists = (obj) => {
  return axios.post(API_FAVORITE_PLAYLIST, obj);
};

export const removeFavoritePlaylist = (id) => {
  var url = API_FAVORITE_PLAYLIST + id;
  return axios.delete(url);
};

export const getFavoriteArtists = () => {
  return axios.get(API_FAVORITE_ARTISTS);
};

export const updateFavoriteArtists = (obj) => {
  return axios.post(API_FAVORITE_ARTISTS, obj);
};

export const removeFavoriteArtist = (id) => {
  var url = API_FAVORITE_ARTISTS + id;
  return axios.delete(url);
};

export const getFavoriteAlbums = () => {
  return axios.get(API_FAVORITE_ALBUMS);
};

export const updateFavoriteAlbums = (obj) => {
  return axios.post(API_FAVORITE_ALBUMS, obj);
};

export const removeFavoriteAlbum = (id) => {
  var url = API_FAVORITE_ALBUMS + id;
  return axios.delete(url);
};

export const getHistoryPage = () => {
  return axios.get(HISTORY_PAGE)
}

export const setHistoryPage = (obj) => {
  return axios.put(HISTORY_PAGE, obj)
}
