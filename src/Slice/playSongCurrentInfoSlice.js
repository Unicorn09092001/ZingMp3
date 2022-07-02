import { createSlice } from "@reduxjs/toolkit";

const playSongCurrentInfoSlice = createSlice({
  name: "playSongCurrentInfo",
  initialState: {
    listSong: {
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
          totalFollow: 39751,
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
          totalFollow: 37305,
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
      indicators: [],
      isIndie: false,
      streamingStatus: 1,
      allowAudioAds: true,
      hasLyric: true,
      userid: 309,
      genres: [
        {
          id: "IWZ9Z08I",
          name: "Việt Nam",
          title: "Việt Nam",
          alias: "viet-nam",
          link: "/the-loai-album/Viet-Nam/IWZ9Z08I.html",
        },
        {
          id: "IWZ97FCD",
          name: "V-Pop",
          title: "V-Pop",
          alias: "v-pop",
          link: "/the-loai-album/V-Pop/IWZ97FCD.html",
        },
      ],
      composers: [
        {
          id: "IW68I90F",
          name: "Long Họ Huỳnh",
          link: "/nghe-si/Long-Ho-Huynh",
          spotlight: false,
          alias: "Long-Ho-Huynh",
          cover:
            "https://zmp3-static.zmdcdn.me/skins/zmp3-v5.2/images/default_cover.png",
          thumbnail:
            "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/5/5/9/7/5597e20bd41c574b33ca0aac7cce3444.jpg",
          totalFollow: 28,
        },
      ],
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
            totalFollow: 39751,
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
            totalFollow: 37305,
          },
        ],
        artistsNames: "Hồng Thanh, DJ Mie",
      },
      isRBT: true,
      like: 1194068,
      listen: 35007946,
      liked: false,
      comment: 6229,
    },
  },
  reducers: {
    getPlaySongCurrentInfo: (state, action) => {
      state.listSong = action.payload;
    },
  },
});

const {
  actions: { getPlaySongCurrentInfo },
  reducer,
} = playSongCurrentInfoSlice;

export { getPlaySongCurrentInfo };

export default reducer;
