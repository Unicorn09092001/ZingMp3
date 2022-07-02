import { createSlice } from "@reduxjs/toolkit";

var songCurrentList = [
  {
    encodeId: "ZZ8FBUW9",
    title: "Đám Cưới Nha?",
    alias: "Dam-Cuoi-Nha-Hong-Thanh-DJ-Mie",
    isOffical: true,
    username: "",
    artistsNames: "Hồng Thanh, DJ Mie",
    artists: [
      {
        id: "IW67C6FD",
        name: "Hồng Thanh",
        link: "/Hong-Thanh",
        spotlight: false,
        alias: "Hong-Thanh",
        thumbnail:
          "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/a/4/1/b/a41b468005ea5347213a5ada872096ba.jpg",
        thumbnailM:
          "https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/a/4/1/b/a41b468005ea5347213a5ada872096ba.jpg",
        isOA: true,
        isOABrand: false,
      },
      {
        id: "IWZD6FED",
        name: "DJ Mie",
        link: "/DJ-Mie",
        spotlight: false,
        alias: "DJ-Mie",
        thumbnail:
          "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/e/c/1/f/ec1fcdefabbc8fea32a2eb23301837d3.jpg",
        thumbnailM:
          "https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/e/c/1/f/ec1fcdefabbc8fea32a2eb23301837d3.jpg",
        isOA: true,
        isOABrand: false,
        playlistId: "Z6BOEEWC",
      },
    ],
    isWorldWide: true,
    thumbnailM:
      "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/5/b/8/b/5b8b7cd3d1434afa3b2b9854efdc8756.jpg",
    link: "/bai-hat/Dam-Cuoi-Nha-Hong-Thanh-DJ-Mie/ZZ8FBUW9.html",
    thumbnail:
      "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/5/b/8/b/5b8b7cd3d1434afa3b2b9854efdc8756.jpg",
    duration: 175,
    zingChoice: false,
    isPrivate: false,
    preRelease: false,
    releaseDate: 1647777600,
    genreIds: ["IWZ9Z08I", "IWZ97FCD"],
    album: {
      encodeId: "6BIFUZ9E",
      title: "Đám Cưới Nha? (Single)",
      thumbnail:
        "https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/e/e/1/c/ee1c0fbea45998492524c8f3b5992ab4.jpg",
      isoffical: true,
      link: "/album/Dam-Cuoi-Nha-Single-Hong-Thanh-DJ-Mie/6BIFUZ9E.html",
      isIndie: false,
      releaseDate: "20/03/2022",
      sortDescription: "",
      PR: false,
      artists: [
        {
          id: "IW67C6FD",
          name: "Hồng Thanh",
          link: "/Hong-Thanh",
          spotlight: false,
          alias: "Hong-Thanh",
          thumbnail:
            "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/a/4/1/b/a41b468005ea5347213a5ada872096ba.jpg",
          thumbnailM:
            "https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/a/4/1/b/a41b468005ea5347213a5ada872096ba.jpg",
          isOA: true,
          isOABrand: false,
          totalFollow: 35344,
        },
        {
          id: "IWZD6FED",
          name: "DJ Mie",
          link: "/DJ-Mie",
          spotlight: false,
          alias: "DJ-Mie",
          thumbnail:
            "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/e/c/1/f/ec1fcdefabbc8fea32a2eb23301837d3.jpg",
          thumbnailM:
            "https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/e/c/1/f/ec1fcdefabbc8fea32a2eb23301837d3.jpg",
          isOA: true,
          isOABrand: false,
          playlistId: "Z6BOEEWC",
          totalFollow: 34738,
        },
      ],
      artistsNames: "Hồng Thanh, DJ Mie",
    },
    indicators: [],
    isIndie: false,
    streamingStatus: 1,
    allowAudioAds: true,
    hasLyric: true,
  },
];

const songCurrentDataSlice = createSlice({
  name: "songCurrentData",
  initialState: {
    songCurrentList: [...songCurrentList],
    enCodeIDSong: "ZZ8FBUW9",
    songIndexOfList: null,
    songPath: null,
    isPlaying: false,
    isLoading: true,
    isFavorite: false,
  },
  reducers: {
    getSongDataCurrent: (state, action) => {
      state.songCurrentList = action.payload.songCurrentList;
      state.enCodeIDSong = action.payload.enCodeIDSong;
      state.songIndexOfList = action.payload.songIndexOfList;
      state.isPlaying = action.payload.isPlaying;
    },
    changePlaySong: (state, action) => {
      state.songIndexOfList = action.payload.songIndexOfList;
      state.enCodeIDSong = action.payload.enCodeIDSong;
    },
    setSongPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    getSongPath: (state, action) => {
      state.songPath = action.payload;
    },
    songLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsFavorite: (state, action) => {
      state.isFavorite = action.payload;
    },
  },
});

const {
  actions: {
    getSongDataCurrent,
    changePlaySong,
    setSongPlaying,
    getSongPath,
    songLoading,
    setIsFavorite,
  },
  reducer,
} = songCurrentDataSlice;

export {
  getSongDataCurrent,
  changePlaySong,
  setSongPlaying,
  songLoading,
  getSongPath,
  setIsFavorite,
};

export default reducer;
