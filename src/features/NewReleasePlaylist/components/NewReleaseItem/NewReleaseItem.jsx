import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setArtistAlias } from "Slice/artistPageDataSlice";
import {
  getSongDataCurrent,
  songLoading,
  getSongPath,
  setIsFavorite,
  setSongPlaying,
} from "Slice/songCurrentDataSlice";
import { getPlaySongCurrentInfo } from "Slice/playSongCurrentInfoSlice";
import { getSongById ,setHistoryPage} from "app/services";

function NewReleaseItem(
  { newReleasePlaylist = {}, itemIndex, listSongCurrent },
  ref
) {
  const { thumbnailM, title, artists } = newReleasePlaylist;
  const itemRef = useRef();
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    getWidth() {
      return itemRef.current?.getBoundingClientRect().width;
    },
  }));

  const { isPlaying, enCodeIDSong, isLoading } = useSelector(
    (state) => state.songCurrentData
  );

  const handlePlay = (song) => {
    dispatch(setIsFavorite(false));
    if (song.encodeId === enCodeIDSong) {
      dispatch(
        getSongDataCurrent({
          songCurrentList: [...listSongCurrent],
          enCodeIDSong: song.encodeId,
          songIndexOfList: itemIndex,
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
          songIndexOfList: itemIndex,
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
    <div className="row__item item--new-playlist" ref={itemRef}>
      <div className="row__item-container flex--top-left">
        <div className="row__item-display br-5">
          <div
            className="row__item-img img--square"
            style={{
              background: `url('${thumbnailM}') no-repeat center center / cover`,
            }}
          ></div>
          <div
            className="row__item-actions"
            onClick={() => handlePlay(newReleasePlaylist)}
          >
            {isPlaying && newReleasePlaylist.encodeId === enCodeIDSong ? (
              <div className="thumb--animate" style={{ visibility: "initial" }}>
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
              <div className="btn--play-new-playlist">
                <div className="control-btn btn-toggle-play">
                  <i className="bi bi-play-fill"></i>
                </div>
              </div>
            )}
            {/* <div className="btn--play-new-playlist">
              <div className="control-btn btn-toggle-play">
                <i className="bi bi-play-fill"></i>
              </div>
            </div> */}
          </div>
          <div className="overlay"></div>
        </div>
        <div className="row__item-info new-playlist--info">
          <span className="row__info-name is-twoline">{title}</span>
          <h3 className="row__info-creator">
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
                {index < artists.length - 1 && ","}
              </React.Fragment>
            ))}
          </h3>
          <div className="row__item-detail">
            <div className="info__detail-order">#{itemIndex + 1}</div>
            <div className="info__detail-time">
              {newReleasePlaylist?.album
                ? newReleasePlaylist.album.releaseDate.replaceAll("/", ".")
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(NewReleaseItem);
