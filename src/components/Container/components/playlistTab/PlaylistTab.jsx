import React from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import SongList from "features/PlayMusic/components/SongList/SongList";
import HeartButton from "components/IconButton/HeartButton/HeartButton";
import MicroButton from "components/IconButton/MicroButton/MicroButton";
import "./playlistTab.scss";
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

function PlaylistTab({ isOpen, isClose }) {
  let isFavoriteSong = false;
  const dispatch = useDispatch();
  const { songCurrentList } = useSelector((state) => state.songCurrentData);

  const { isPlaying, enCodeIDSong, isLoading } = useSelector(
    (state) => state.songCurrentData
  );

  const favoriteSongs = useSelector((state) => state.favoriteSongs.songList);

  const handlePlay = (song, songIndex) => {
    dispatch(setIsFavorite(false));
    if (song.encodeId === enCodeIDSong) {
      dispatch(
        getSongDataCurrent({
          songCurrentList: [...songCurrentList],
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
          songCurrentList: [...songCurrentList],
          enCodeIDSong: song.encodeId,
          songIndexOfList: songIndex,
          isPlaying: true,
        })
      );
      getSongById(song.encodeId)
        .then((res) => {
          console.log(res);
          if (res.data.msg === "Success") {
            dispatch(getSongPath(res.data.data[128]));
          } else {
            alert("Bài hát chưa được cập nhật, vui lòng chọn bài khác");
            dispatch(setSongPlaying(false));
          }
          dispatch(songLoading(true));
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };
  return (
    <div
      className={clsx(
        "playlist-tab",
        { "playlist-tab-open": isOpen },
        { "playlist-tab-close": isClose }
      )}
    >
      <div className="playlist-tab-header">Danh Sách Phát</div>
      <div className="playlist-tab-body">
        {/* <SongList listSong={songCurrentList} /> */}
        <div className="playlist__list">
          {songCurrentList.map((song, index) => (
            <div
              className={clsx("playlist__list-song media")}
              data-index="0"
              //ref={songRef}
              //onClick={handleClickSong}
              style={
                song.encodeId === enCodeIDSong
                  ? { background: "var(--bg-content-color)" }
                  : {}
              }
            >
              <div className="playlist__song-info media__left" style={{width: "100%"}}>
                <div
                  className="playlist__song-thumb media__thumb mr-10"
                  style={{
                    background: `url('${song?.thumbnail}') no-repeat center center / cover`,
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
                      style={
                        song.encodeId === enCodeIDSong
                          ? { display: "block" }
                          : {}
                      }
                    >
                      <div className="control-btn btn-toggle-play">
                        <i className="bi bi-play-fill"></i>
                      </div>
                    </div>
                  )}
                </div>
                <div className="playlist__song-body media__info">
                  <span className="playlist__song-title info__title" >
                    {song?.title}
                  </span>
                  <p className="playlist__song-author info__author">
                    {song?.artists?.map((artist, index) => (
                      <React.Fragment key={artist.id}>
                        <NavLink
                          to={"/artist/name=" + artist.alias}
                          className="is-ghost"
                          onClick={() => {
                            dispatch(setArtistAlias(artist.alias));
                            setHistoryPage({
                              alias: artist.alias,
                              page: "artist",
                            });
                          }}
                        >
                          {artist.name}
                        </NavLink>
                        {index < song?.artists.length - 1 && ", "}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
              {/* <div className={clsx("playlist__song-option", "media__right")}>
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
                <div className={clsx("option-btn")}>
                  <i className="btn--icon bi bi-three-dots"></i>
                </div>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlaylistTab;
