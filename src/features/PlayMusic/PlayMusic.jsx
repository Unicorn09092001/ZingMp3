import ContainerPlayMusicHeader from "components/Container/components/ContainerPlayMusicHeader/ContainerPlayMusicHeader";
import SongSlide from "features/SongSlide/SongSlide";
import React, { useState } from "react";
import { useEffect } from "react";
//import { useSelector } from "react-redux";
//import { currentListSongSelector } from "selectors/ListSongSelector";
import SongList from "./components/SongList/SongList";
import "./PlayMusic.scss";

function PlayMusic({
  playMusicList = [],
  sectionName = "",
  pathName = "",
  isArtistPage = false,
}) {
  //const listSong = useSelector(currentListSongSelector);
  //const favoriteSongs = useSelector((state) => state.favoriteSongs);

  const [device, setDevice] = useState(() => {
    const windowWidth = window.innerWidth;
    let device;
    if (windowWidth < 740) {
      device = "mobile";
    }

    return device;
  });

  useEffect(() => {
    const handleDetectDevice = (e) => {
      const windowWidth = e.target.innerWidth;
      let device;
      if (windowWidth < 740) {
        device = "mobile";
      } else {
        device = "notMobile";
      }
      setDevice(device);
    };

    window.addEventListener("resize", handleDetectDevice);

    return () => window.removeEventListener("resize", handleDetectDevice);
  }, []);

  return (
    <div className="container__control row">
      <div className="col l-12 m-12 c-12 mb-10">
        <ContainerPlayMusicHeader
          sectionName={sectionName}
          navigable
          pathName={pathName}
          isArtistPage={isArtistPage}
        />
      </div>
      <div className="col l-12 m-12 c-12">
        <div className="container__playmusic">
          {device !== "mobile" && <SongSlide listSong={playMusicList} />}
          <div className="container__playlist">
            <SongList listSong={playMusicList} isSongTab />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayMusic;
