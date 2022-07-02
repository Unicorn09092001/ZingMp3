import { createSlice } from "@reduxjs/toolkit";
//import { RADIO_STORAGE_KEY } from "constants/index";

const radioSlice = createSlice({
  name: "radio",
  initialState: {
    listRadio: [],
  },
  reducers: {
    setListRadio: (state, action) => {
      state.listRadio = action.payload;
    },
  },
});

const {
  actions: { setListRadio },
  reducer,
} = radioSlice;

export { setListRadio };

export default reducer;
