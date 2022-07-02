import clsx from "clsx";
import HeartButton from "components/IconButton/HeartButton/HeartButton";
import MicroButton from "components/IconButton/MicroButton/MicroButton";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { scrollToActiveSong } from "utils";
import "./SongItem.scss";
import { formatAudioTime } from "utils";
import {
  getSongDataCurrent,
  songLoading,
  getSongPath,
  setIsFavorite,
  setSongPlaying,
} from "Slice/songCurrentDataSlice";
import { getPlaySongCurrentInfo } from "Slice/playSongCurrentInfoSlice";
import { setArtistAlias } from "Slice/artistPageDataSlice";
import { getSongById, setHistoryPage } from "app/services";
import { NavLink } from "react-router-dom";

function SongItem({
  song = [],
  songIndex,
  onClick,
  prevPlaylist,
  isSongTab,
  listSongCurrent,
}) {
  let isFavoriteSong = false;
  const dispatch = useDispatch();
  const { title, artists, thumbnail, duration } = song;
  const [checked, setChecked] = useState(false);
  const { songIndex: currentIndex, playlistIndex } = useSelector(
    (state) => state.listSong
  );
  const { firstLoading } = useSelector((state) => state.config);
  const songRef = useRef();

  const handleClickSong = (e) => {
    const checkNode = e.target.closest(".playlist__song-check");
    const optionNode = e.target.closest(".playlist__song-option");

    if (songIndex === currentIndex || optionNode || checkNode) return;
    if (onClick) onClick(songIndex);
  };

  const { isPlaying, enCodeIDSong, isLoading } = useSelector(
    (state) => state.songCurrentData
  );

  const favoriteSongs = useSelector((state) => state.favoriteSongs.songList);

  const handlePlay = (song) => {
    dispatch(setIsFavorite(false));
    if (song.encodeId === enCodeIDSong) {
      dispatch(
        getSongDataCurrent({
          songCurrentList: [...listSongCurrent],
          enCodeIDSong: song.encodeId,
          songIndexOfList: songIndex,
          isPlaying: !isPlaying,
        })
      );
    } else {
      dispatch(songLoading(false));
      dispatch(getPlaySongCurrentInfo(song));
      dispatch(
        getSongDataCurrent({
          songCurrentList: [...listSongCurrent],
          enCodeIDSong: song.encodeId,
          songIndexOfList: songIndex,
          isPlaying: true,
        })
      );
      getSongById(song.encodeId).then((res) => {console.log(res)
        if (res.data.msg === "Success") {
          dispatch(getSongPath(res.data.data[128]));
        } else {
          alert("Bài hát chưa được cập nhật, vui lòng chọn bài khác");
          dispatch(setSongPlaying(false));
        }
        dispatch(songLoading(true));
      }).catch((res) => {console.log(res)});
    }
  };

  useEffect(() => {
    if (prevPlaylist.current !== playlistIndex || firstLoading) {
      const isActiveSong = currentIndex === songIndex;
      isActiveSong && scrollToActiveSong(songRef.current);
    }
    prevPlaylist.current = playlistIndex;
    // eslint-disable-next-line
  }, [playlistIndex]);

  return (
    <div
      className={clsx("playlist__list-song media", {
        // active: currentIndex === songIndex || checked,
        // playing: isPlaying && currentIndex === songIndex,
      })}
      data-index="0"
      ref={songRef}
      onClick={handleClickSong}
      style={
        song.encodeId === enCodeIDSong
          ? { background: "var(--bg-content-color)" }
          : {}
      }
    >
      <div className="playlist__song-info media__left">
        {isSongTab && (
          <>
            <div className="playlist__song-check">
              <input
                value={checked}
                type="checkbox"
                name=""
                onChange={(e) => setChecked(e.target.checked)}
                id={`playlist__check-${songIndex}`}
                className="mr-10"
                style={{ display: "none" }}
              />
              <label htmlFor={`playlist__check-${songIndex}`}></label>
            </div>
            <i className="bi bi-music-note-beamed mr-10"></i>
          </>
        )}
        <div
          className="playlist__song-thumb media__thumb mr-10"
          style={{
            background: `url('${thumbnail}') no-repeat center center / cover`,
          }}
          onClick={() => handlePlay(song)}
        >
          {isPlaying && song.encodeId === enCodeIDSong ? (
            <div className="thumb--animate">
              <div
                className="thumb--animate-img"
                style={
                  isLoading
                    ? {
                        background: `url('/assets/img/SongActiveAnimation/icon-playing.gif') no-repeat 50% / contain`,
                      }
                    : {
                        background: `url('/assets/img/SongActiveAnimation/loadingImg.gif') no-repeat 50% / contain`,
                      }
                }
              ></div>
            </div>
          ) : (
            <div
              className="play-song--actions"
              style={song.encodeId === enCodeIDSong ? { display: "block" } : {}}
            >
              <div className="control-btn btn-toggle-play">
                <i className="bi bi-play-fill"></i>
              </div>
            </div>
          )}
        </div>
        <div className="playlist__song-body media__info">
          <span className="playlist__song-title info__title">{title}</span>
          <p className="playlist__song-author info__author">
            {artists?.map((artist, index) => (
              <React.Fragment key={artist.id}>
                <NavLink
                  to={"/artist/name=" + artist.alias}
                  className="is-ghost"
                  onClick={() => {
                    dispatch(setArtistAlias(artist.alias));
                    setHistoryPage({alias: artist.alias, page: "artist"})
                  }}
                >
                  {artist.name}
                </NavLink>
                {index < artists.length - 1 && ", "}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
      <span className="playlist__song-time media__content">
        {formatAudioTime(duration)}
      </span>
      <div
        className={clsx("playlist__song-option", "media__right", {
          "song--tab": isSongTab,
        })}
      >
        <MicroButton />
        {favoriteSongs.map((favoriteSong, index) => {
          let renderContent = "";
          if (favoriteSong.encodeId === song.encodeId) {
            isFavoriteSong = true;
            renderContent = (
              <HeartButton
                key={favoriteSong.encodeId}
                primary
                hideOnMobile
                optionalClass="option-btn"
                songInfo={song}
              />
            );
          }
          if (index === favoriteSongs.length - 1) {
            if (isFavoriteSong) {
              isFavoriteSong = false;
            } else {
              renderContent = (
                <HeartButton
                  key={favoriteSong.encodeId}
                  hideOnMobile
                  optionalClass="option-btn"
                  songInfo={song}
                />
              );
            }
          }
          return renderContent;
        })}
        <div
          className={clsx("option-btn", {
            "hide-on-tablet": !isSongTab,
          })}
        >
          <i className="btn--icon bi bi-three-dots"></i>
        </div>
      </div>
    </div>
  );
}

export default SongItem;
