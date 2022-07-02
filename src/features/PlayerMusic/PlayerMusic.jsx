import React from "react";
import PlayerControl from "./components/PlayerControl/PlayerControl";
import PlayerSongInfo from "./components/PlayerSongInfo/PlayerSongInfo";
import PlayerOption from "./components/PlayerOption/PlayerOption";
import "./PlayerMusic.scss";
import { useSelector } from "react-redux";

function PlayerMusic() {
  //const currentSong = useSelector(currentSongSelector);

  const currentSong = useSelector((state) => {
    return state.playSongCurrentInfo.listSong;
  });

  return (
    <div className="player__container">
      <PlayerSongInfo currentSong={currentSong} />
      <PlayerControl />
      <PlayerOption />
    </div>
  );
}

export default PlayerMusic;
