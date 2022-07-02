import React from "react";
import SongRankingItem from "../SongRankingItem/SongRankingItem";

function SongRankingList({ listSong = [] }) {
  return (
    <div className="container__playlist">
      <div className="playlist__list-charts overflow-visible">
        {listSong.map((song, index) => (
          <SongRankingItem
            key={song.encodeId}
            song={song}
            songIndex={index + 1}
            listSongCurrent={listSong}
          />
        ))}
      </div>
    </div>
  );
}

export default SongRankingList;
