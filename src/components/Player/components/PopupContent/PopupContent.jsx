import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setArtistAlias } from "Slice/artistPageDataSlice";
import { setHistoryPage } from "app/services";
//import { currentSongSelector } from "selectors/ListSongSelector";

function PopupContent() {
  const dispatch = useDispatch();
  const { isPlaying } = useSelector((state) => state.music);
  const currentSong = useSelector((state) => {
    return state.playSongCurrentInfo.listSong;
  });
  const cdThumbRef = useRef();
  const cdAnimateRef = useRef();

  useEffect(() => {
    cdAnimateRef.current = cdThumbRef.current.animate(
      [{ transform: "rotate(360deg)" }],
      {
        duration: 15000, // 10000 seconds
        iterations: Infinity,
      }
    );
  }, []);

  useEffect(() => {
    if (isPlaying) {
      cdAnimateRef.current.play();
    } else {
      cdAnimateRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <>
      <div className="player__popup-cd-display">
        <div
          className="player__popup-cd-img"
          style={{
            background: `url('${currentSong.thumbnailM}') no-repeat center center / cover`,
          }}
          ref={cdThumbRef}
        ></div>
      </div>
      <div className="player__popup-cd-info">
        <h4>Now playing</h4>
        <h2 className="is-twoline">{currentSong.title}</h2>
        <h3>
          {currentSong.artists?.map((artist, index) => (
            <React.Fragment key={artist.alias}>
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
              {index < currentSong.artists.length - 1 && ", "}
            </React.Fragment>
          ))}
        </h3>
      </div>
    </>
  );
}

export default PopupContent;
