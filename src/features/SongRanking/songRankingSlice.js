import { createSlice } from "@reduxjs/toolkit";
//import { SONG_CHARTS_STORAGE_KEY } from "constants/index";

const chartDataSlice = createSlice({
  name: "chartData",
  initialState: {
    listSong: [],
  },
  reducers: {
    getChartData: (state, action) => {
      state.listSong = action.payload;
    },
  },
});

const {
  actions: { getChartData },
  reducer,
} = chartDataSlice;

export { getChartData };

export default reducer;
