import HeartButton from "components/IconButton/HeartButton/HeartButton";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import PlaylistItemInfo from "../PlaylistItemInfo/PlaylistItemInfo";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setPlaylistCurrent } from "Slice/playlistCurrentSlice";
import { setIsLoadingTab } from "Slice/isLoadingTabSlice";
import { setHistoryPage } from "app/services";

function PlaylistItem({ playlist, playlistIndex, onChangePlaylist }, ref) {
  const dispatch = useDispatch();
  const { thumbnail } = playlist;
  const itemRef = useRef();
  let isFavoritePlaylist = false;

  const favoritePlaylists = useSelector((state) => state.personalPlaylist.list);

  const handleChangePlaylist = () => {
    dispatch(setIsLoadingTab(true));
    dispatch(setPlaylistCurrent(playlist.encodeId));
    setHistoryPage({encodeId: playlist.encodeId, page: "playlist"})
    if (onChangePlaylist) onChangePlaylist(playlistIndex);
  };

  useImperativeHandle(ref, () => ({
    getWidth() {
      return itemRef.current?.getBoundingClientRect().width;
    },
  }));

  return (
    <div className="row__item item--playlist" ref={itemRef}>
      <div className="row__item-container flex--top-left">
        <div className="row__item-display br-5">
          <div
            className="row__item-img img--square"
            style={{
              background: `url('${thumbnail}') no-repeat center center / cover`,
            }}
          ></div>
          <div className="row__item-actions">
            {/* <HeartButton primary optionalClass="action-btn" /> */}
            {favoritePlaylists.map((favoritePlaylist, index) => {
              let renderContent = "";
              if (favoritePlaylist.encodeId === playlist.encodeId) {
                isFavoritePlaylist = true;
                renderContent = (
                  <HeartButton
                    key={favoritePlaylist.encodeId}
                    primary
                    hideOnMobile
                    optionalClass="option-btn"
                    playlistInfo={playlist}
                  />
                );
              }
              if (index === favoritePlaylists.length - 1) {
                if (isFavoritePlaylist) {
                  isFavoritePlaylist = false;
                } else {
                  renderContent = (
                    <HeartButton
                      key={favoritePlaylist.encodeId}
                      hideOnMobile
                      optionalClass="option-btn"
                      playlistInfo={playlist}
                    />
                  );
                }
              }
              return renderContent;
            })}
            <div className="btn--play-playlist" onClick={handleChangePlaylist}>
              <NavLink
                to={"/playlist/id=" + playlist.encodeId}
                className="control-btn btn-toggle-play"
              >
                <i className="bi bi-play-fill"></i>
              </NavLink>
            </div>
            <div className="action-btn">
              <i className="btn--icon bi bi-three-dots"></i>
            </div>
          </div>
          <div className="overlay"></div>
        </div>
        <PlaylistItemInfo playlist={playlist} />
      </div>
    </div>
  );
}

export default forwardRef(PlaylistItem);
