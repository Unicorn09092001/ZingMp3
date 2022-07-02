import ContentNavBar from "components/Container/components/ContentNavBar/ContentNavBar";
import { toggleThickenHeader } from "configSlice";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import AppHeader from "../../components/AppHeader/AppHeader";
import { getFavoriteSongList } from "Slice/favoriteSongsSlice";
import { setPersonalPlaylist } from "features/Playlist/personalPlaylistSlice";
import { setPersonalAlbum } from "features/Album/personalAlbumSlice";
import {
  getFavoriteSongs,
  getFavoritePlaylists,
  getFavoriteAlbums,
} from "app/services";
import { setIsLoadingTab } from "Slice/isLoadingTabSlice";
import LoadingAnimate from "components/Container/components/LoadingAnimate/LoadingAnimate";

function PersonalPage() {
  const dispatch = useDispatch();
  const containerRef = useRef();
  const isLoading = useSelector((state) => state.isLoadingTab.isLoading);

  useEffect(() => {
    dispatch(setIsLoadingTab(true));
    getFavoriteSongs().then((res) => {
      dispatch(getFavoriteSongList(res.data));
      dispatch(setIsLoadingTab(false));
    });
    getFavoritePlaylists().then((res) => {
      dispatch(setPersonalPlaylist(res.data));
    });
    getFavoriteAlbums().then((res) => {
      dispatch(setPersonalAlbum(res.data));
    });
  }, []);

  useEffect(() => {
    const containerElement = containerRef.current;
    const handleScrollContainer = (e) => {
      const scrollTop = e.target.scrollTop;

      dispatch(toggleThickenHeader(scrollTop > 10));
    };

    containerElement.addEventListener("scroll", handleScrollContainer);

    return () =>
      containerElement.removeEventListener("scroll", handleScrollContainer);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="app__container tab--personal" ref={containerRef}>
      {isLoading ? (
        <LoadingAnimate />
      ) : (
        <>
          <AppHeader />
          <div className="content">
            <ContentNavBar />
            <div className="content__container">
              <Outlet />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PersonalPage;
