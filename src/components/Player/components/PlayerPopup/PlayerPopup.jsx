import { set } from "harmony-reflect";
import { usePlayerStore } from "components/Player/hooks";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { currentThemeSelector } from "selectors/themeSelector";
import PopupContent from "../PopupContent/PopupContent";
import PopupFooter from "../PopupFooter/PopupFooter";
import "./PlayerPopup.scss";
import { getApiSongLyric } from "app/services";

function PlayerPopup({ onClosePopup }) {
  const currentTheme = useSelector(currentThemeSelector);
  const [currentTab, setCurrentTab] = useState(0);
  const [count, setCount] = useState(0);
  const [songLyric, setSongLyric] = useState([]);
  const { currentTime } = usePlayerStore();
  const scrollRef = useRef();

  const songId = useSelector((state) => state.songCurrentData.enCodeIDSong);
  const currentSong = useSelector(
    (state) => state.playSongCurrentInfo.listSong
  );

  useEffect(() => {
    getApiSongLyric(songId).then((res) => {
      setSongLyric(res.data.data?.sentences);
    });
  }, [songId]);

  useEffect(() => {
    // let indexWord = songLyric[count].words.length -1
    // if (
    //   new Date(songLyric[count].words[indexWord].endTime).getSeconds() +
    //     new Date(songLyric[count].words[indexWord].endTime).getMinutes() *
    //       60 <
    //   currentTime
    // ) {
    //   setCount(count+1)
    //   scrollRef.current.scrollTop += 1;
    // }
  }, [currentTime]);

  const handleClosePopup = () => {
    if (onClosePopup) onClosePopup();
  };

  return (
    <div
      className="player__popup"
      style={{
        backgroundImage: currentTheme.image
          ? `url("${currentTheme.image}")`
          : "none",
      }}
    >
      <div className="player__popup-header">
        <div className="player__popup-logo">
          <img
            src="/assets/img/logos/small-logo.svg"
            alt="Logo"
            className="player__logo-img"
          />
        </div>
        <div className="player__popup-container">
          <ul className="player__popup-menu">
            <li
              className={
                currentTab === 0
                  ? "player__popup-item active"
                  : "player__popup-item"
              }
            >
              <div onClick={() => setCurrentTab(0)}>Danh Sách Phát</div>
            </li>
            {/* <li
              className={
                currentTab === 1
                  ? "player__popup-item active"
                  : "player__popup-item"
              }
            >
              <div onClick={() => setCurrentTab(1)}>Karaoke</div>
            </li> */}
            <li
              className={
                currentTab === 2
                  ? "player__popup-item active hide-on-mobile"
                  : "player__popup-item hide-on-mobile"
              }
            >
              <div onClick={() => setCurrentTab(2)}>Lời Bài Hát</div>
            </li>
          </ul>
        </div>
        <div className="player__popup-action">
          <ul className="popup__action-menu">
            <li className="popup__action-btn hide-on-tablet-mobile">
              <i className="bi bi-arrows-angle-expand popup__action-btn-icon"></i>
            </li>
            <li className="popup__action-btn hide-on-tablet-mobile">
              <i className="bi bi-gear popup__action-btn-icon"></i>
            </li>
            <li
              className="popup__action-btn btn--pop-down"
              onClick={handleClosePopup}
            >
              <i className="bi bi-chevron-down popup__action-btn-icon"></i>
            </li>
          </ul>
        </div>
      </div>
      {currentTab === 0 ? (
        <PopupContent />
      ) : currentTab === 1 ? (
        <div>tab2</div>
      ) : currentTab === 2 ? (
        <div className="lyric-wrapper">
          <div className="song-thumbnail">
            <img src={currentSong.thumbnailM} />
          </div>
          <div className="lyric" ref={scrollRef}>
            {songLyric?.map((lyric) => {
              if (
                new Date(lyric.words[0].startTime).getSeconds() +
                  new Date(lyric.words[0].startTime).getMinutes() * 60 <
                  currentTime &&
                new Date(
                  lyric.words[lyric.words.length - 1].endTime
                ).getSeconds() +
                  new Date(
                    lyric.words[lyric.words.length - 1].endTime
                  ).getMinutes() *
                    60 >
                  currentTime
              ) {
                return (
                  <div className={"lyric-line is-active"}>
                    {lyric.words.map((word) => (
                      <span>{word.data} </span>
                    ))}
                  </div>
                );
              } else if (
                new Date(
                  lyric.words[lyric.words.length - 1].startTime
                ).getSeconds() +
                  new Date(
                    lyric.words[lyric.words.length - 1].startTime
                  ).getMinutes() *
                    60 <
                currentTime
              ) {
                return (
                  <div className="lyric-line is-over">
                    {lyric.words.map((word) => (
                      <span>{word.data} </span>
                    ))}
                  </div>
                );
              } else {
                return (
                  <div className="lyric-line">
                    {lyric.words.map((word) => (
                      <span>{word.data} </span>
                    ))}
                  </div>
                );
              }
            })}
          </div>
        </div>
      ) : null}
      <PopupFooter />
    </div>
  );
}

export default PlayerPopup;
