import clsx from "clsx";
import PlayerMusic from "features/PlayerMusic/PlayerMusic";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentThemeSelector } from "selectors/themeSelector";
import PlayerPopup from "./components/PlayerPopup/PlayerPopup";
import "./Player.scss";
import { PlayerProvider } from "./PlayerStore";
import { setIsFavorite } from "Slice/songCurrentDataSlice";

Player.propTypes = {};

function Player() {
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const { isPlaying, enCodeIDSong } = useSelector(
    (state) => state.songCurrentData
  );
  const currentTheme = useSelector(currentThemeSelector);
  const favoriteSongList = useSelector((state) => state.favoriteSongs.songList);

  useEffect(() => {
    favoriteSongList.forEach((favoriteSong) => {
      if (favoriteSong.encodeId === enCodeIDSong) {
        dispatch(setIsFavorite(true));
      }
    });
  }, [enCodeIDSong]);

  const handleOpenPopup = (e) => {
    const authorNode = e.target.closest(
      ".player__container .player__song-info.media .player__song-author.info__author"
    );
    const actionNode = e.target.closest(
      ".player__container .player__song-info.media .media__right"
    );
    const controlNode = e.target.closest(
      ".player__container .player__control-btn"
    );
    const progressNode = e.target.closest(".player__container .progress-block");
    const optionNode = e.target.closest(
      ".player__container .player__options-container"
    );
    const popUpNode = e.target.closest(".player .player__popup");
    if (
      !actionNode &&
      !authorNode &&
      !controlNode &&
      !progressNode &&
      !optionNode &&
      !popUpNode
    ) {
      setOpenPopup(true);
    }
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  return (
    <div
      className={clsx("player", "grid", {
        playing: isPlaying,
        "open-popup": openPopup,
      })}
      style={{
        backgroundImage: currentTheme.playerImage
          ? `url(${currentTheme.playerImage})`
          : "none",
      }}
      onDoubleClick={handleOpenPopup}
    >
      <PlayerProvider>
        <PlayerMusic />
        <PlayerPopup onClosePopup={handleClosePopup} />
      </PlayerProvider>
    </div>
  );
}

export default Player;
