import HeartButton from "components/IconButton/HeartButton/HeartButton";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setIsLoadingTab } from "Slice/isLoadingTabSlice";
import { setPlaylistCurrent } from "Slice/playlistCurrentSlice";
import { setHistoryPage } from "app/services";

function AlbumItem({ album }, ref) {
  const { title, thumbnail, releaseDateText } = album;
  const itemRef = useRef();
  const dispatch = useDispatch();

  let isFavoritePlaylist = false;

  const favoritePlaylists = useSelector((state) => state.personalPlaylist.list);

  useImperativeHandle(ref, () => ({
    getWidth() {
      return itemRef.current?.getBoundingClientRect().width;
    },
  }));

  return (
    <div className="row__item item--album" ref={itemRef}>
      <div className="row__item-container flex--top-left">
        <div className="row__item-display br-5">
          <div
            className="row__item-img img--square"
            style={{
              background: `url('${thumbnail}') no-repeat center center / cover`,
            }}
          ></div>
          <div className="row__item-actions">
            {favoritePlaylists.map((favoriteSong, index) => {
              let renderContent = "";
              if (favoriteSong.encodeId === album.encodeId) {
                isFavoritePlaylist = true;
                renderContent = (
                  <HeartButton
                    key={favoriteSong.encodeId}
                    primary
                    hideOnMobile
                    optionalClass="option-btn"
                    albumInfo={album}
                  />
                );
              }
              if (index === favoritePlaylists.length - 1) {
                if (isFavoritePlaylist) {
                  isFavoritePlaylist = false;
                } else {
                  renderContent = (
                    <HeartButton
                      key={favoriteSong.encodeId}
                      hideOnMobile
                      optionalClass="option-btn"
                      albumInfo={album}
                    />
                  );
                }
              }
              return renderContent;
            })}
            <div
              className="btn--play-playlist"
              onClick={() => {
                dispatch(setIsLoadingTab(true));
                dispatch(setPlaylistCurrent(album.encodeId));
                setHistoryPage({encodeId: album.encodeId, page: "playlist"})
              }}
            >
              <NavLink
                to={"/playlist/id=" + album.encodeId}
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
        <div className="row__item-info">
          <a href="/" className="row__info-name is-twoline">
            {title}
          </a>
          {releaseDateText?.length > 0 && (
            <h3 className="row__info-creator" style={{ fontSize: "1.4rem" }}>
              {releaseDateText}
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default forwardRef(AlbumItem);
