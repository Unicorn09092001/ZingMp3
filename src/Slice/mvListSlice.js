import { createSlice } from "@reduxjs/toolkit";

const mvListSlice = createSlice({
  name: "mvList",
  initialState: {
    list: [],
    link: "viet-nam",
    code: "IWZ9Z08I",
    page: 1,
    count: 30,
    videoInfo: {},
    videoId: "",
    isOpenModalMv: false
  },
  reducers: {
    setPathMv: (state, action) => {
      state.link = action.payload.link;
      state.code = action.payload.code;
    },
    setMvList: (state, action) => {
      state.list = action.payload;
    },
    setMvInfo: (state, action) => {
      state.videoInfo = action.payload;
    },
    setMvId: (state, action) => {
      state.videoId = action.payload.videoId;
      state.isOpenModalMv = action.payload.isOpenModalMv
    },
  },
});

const {
  actions: { setPathMv, setMvList, setMvInfo, setMvId },
  reducer,
} = mvListSlice;

export { setPathMv, setMvList, setMvInfo, setMvId };

export default reducer;
