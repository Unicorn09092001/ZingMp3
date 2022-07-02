import { createSlice } from "@reduxjs/toolkit";


const searchKeyWordSlice = createSlice({
  name: "searchKeyWord",
  initialState: {
    keyWord: "",
    searchData: {},
    searchPath: ""
  },
  reducers: {
    setSearchKeyWord: (state, action) => {
      state.keyWord = action.payload;
    },  
    setSearchData: (state, action) => {
        state.searchData = action.payload
    },
    setSearchPath: (state, action) => {
        state.searchPath = action.payload
    }
  },
});

const {
  actions: { setSearchKeyWord , setSearchData, setSearchPath},
  reducer,
} = searchKeyWordSlice;

export { setSearchKeyWord , setSearchData, setSearchPath};

export default reducer;
