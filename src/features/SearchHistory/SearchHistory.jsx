import React, { useEffect, useRef, useState } from "react";
import SearchHistoryList from "./components/SearchHistoryList/SearchHistoryList";
import "./SearchHistory.scss";
import { setSearchKeyWord, setSearchData, setSearchPath } from "Slice/searchKeyWordSlice";
import { useDispatch, useSelector } from "react-redux";
import { getApiSearch } from "app/services";
import { NavLink, useHistory, useNavigate } from "react-router-dom";
import { setIsLoadingTab } from "Slice/isLoadingTabSlice";



function SearchHistory() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [searchList, setSearchList] = useState([]);
  const [searchPath, setPath] = useState("")
  const { keyWord, searchData } = useSelector((state) => state.searchKeyWord);
  const inputRef = useRef();

  useEffect(() => {
    //Call API to get SearchList
    const searchList = [
      {
        id: 1,
        title: "Tình bạn diệu kì",
      },
      {
        id: 2,
        title: "Gác lại âu lo",
      },
      {
        id: 3,
        title: "Hongkong1",
      },
      {
        id: 4,
        title: "#zingchart",
      },
      {
        id: 5,
        title: "Cheating on You",
      },
      {
        id: 6,
        title: "BlackJack",
      },
    ];
    setSearchList(searchList);
  }, []);

  useEffect(() => {
    setPath("/tim-kiem/tat-ca/key=" + encodeURI(keyWord))
  }, [keyWord])

  const handleSearch = (keyWord) => {
    dispatch(setIsLoadingTab(true));
    dispatch(setSearchPath(keyWord))
    getApiSearch(keyWord).then((res) => {
      dispatch(setSearchData(res.data.data));
      dispatch(setIsLoadingTab(false));
      inputRef.current.blur()
    });
  };

  const handleChange = (e) => {
    if (e.key === "Enter") {
      dispatch(setIsLoadingTab(true));
      dispatch(setSearchPath(keyWord))
      getApiSearch(inputRef.current.value).then((res) => {
        dispatch(setSearchData(res.data.data));
        dispatch(setIsLoadingTab(false));
        inputRef.current.blur()
        navigate(searchPath);
      });
    }
  };

  return (
    <div className="header__search">
      <input
        ref={inputRef}
        value={keyWord}
        type="text"
        placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..."
        className="header__search-input"
        onChange={(e) => dispatch(setSearchKeyWord(e.target.value))}
        onKeyDown={(e) => handleChange(e)}
      />
      <NavLink
        to={searchPath}
        className="header__search-btn"
        onClick={() => handleSearch(keyWord)}
      >
        <i className="bi bi-search header__search-icon"></i>
      </NavLink>
      <SearchHistoryList searchList={searchList} handleSearch={handleSearch}/>
    </div>
  );
}

export default SearchHistory;
