import React from "react";
import "./SearchHistoryList.scss";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchKeyWord } from "Slice/searchKeyWordSlice";

function SearchHistoryList({ searchList = [], handleSearch }) {
  const dispatch = useDispatch()
  const handleClickSearchHistory = (e) => {
    e.preventDefault();
  };
  return (
    <div
      className="header__search-history"
      onMouseDown={handleClickSearchHistory}
    >
      <ul className="header__search-list">
        {searchList.map((searchItem) => (
          <li
            className="header__search-item"
            key={searchItem.id}
            onClick={() => {
              dispatch(setSearchKeyWord(searchItem.title))
              handleSearch(searchItem.title);
            }}
          >
            <i className="bi bi-search header__item-icon"></i>
            <NavLink
              to={"/tim-kiem/tat-ca/key=" + encodeURI(searchItem.title)}
              className="header__item-link"
            >
              {searchItem.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchHistoryList;
