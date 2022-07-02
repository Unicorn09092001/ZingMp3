import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatAudioTime } from "utils";
import HeartButton from "components/IconButton/HeartButton/HeartButton";
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


function SongRankingItem({ song = {}, songIndex, listSongCurrent }) {
  let isFavoriteSong = false;
  const { thumbnail, title, artists, duration } = song;
  const dispatch = useDispatch();

  const { isPlaying, enCodeIDSong, isLoading } = useSelector(
    (state) => state.songCurrentData
  );

  const favoriteSongs = useSelector((state) => state.favoriteSongs.songList);

  const handlePlay = (song, songIndex) => {
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

  return (
    <div
      className="playlist__list-song media"
      style={
        song.encodeId === enCodeIDSong
          ? { background: "var(--bg-content-color)" }
          : {}
      }
    >
      <div className="playlist__song-info media__left">
        <div className="playlist__song-rank">
          <div
            className={clsx("playlist__rank-number", {
              "is-outline--blue": songIndex === 1,
              "is-outline--green": songIndex === 2,
              "is-outline--red": songIndex === 3,
              "is-outline--text": songIndex > 3,
            })}
          >
            {songIndex}
          </div>
          <div className="playlist__rank-icon">
            <i className="bi bi-dash-lg"></i>
          </div>
        </div>
        <div
          className="playlist__song-thumb media__thumb mr-10"
          style={{
            background: `url('${thumbnail}') no-repeat center center / cover`,
          }}
          onClick={() => handlePlay(song, songIndex - 1)}
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
            {artists.map((artist, index) => (
              <React.Fragment key={index}>
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
      <div className="playlist__song-option song--tab media__right hide-on-mobile">
        <div className="playlist__song-btn btn--mic option-btn">
          <i className="btn--icon song__icon bi bi-mic-fill"></i>
        </div>
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
        <div className="playlist__song-btn option-btn">
          <i className="btn--icon bi bi-three-dots"></i>
        </div>
      </div>
    </div>
  );
}

export default SongRankingItem;
