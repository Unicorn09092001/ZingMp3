import { editConfig } from "configSlice";
import {
  toggleLoadingSlideAndSong,
  toggleLoadingSong,
  //togglePlaySong,
} from "features/PlayerMusic/musicSlice";
import { getNewIndex, getRandomIndex } from "features/PlayerMusic/utils";
//import { nextSong } from "features/PlayMusic/listSongSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   currentListSongSelector,
//   currentSongSelector,
// } from "selectors/ListSongSelector";
import PlayerContext from "./PlayerContext";
import {
  setSongPlaying,
  changePlaySong,
  songLoading,
  getSongPath,
} from "Slice/songCurrentDataSlice";
import { getSongById } from "app/services";
import { getPlaySongCurrentInfo } from "Slice/playSongCurrentInfoSlice";

function PlayerProvider({ children }) {
  const dispatch = useDispatch();

  const {
    isRandom,
    isRepeat,
    volume: volumePercent,
  } = useSelector((state) => state.music);
  const { isLoading, isPlaying, songPath, songIndexOfList, songCurrentList } =
    useSelector((state) => state.songCurrentData);
  const songCurrentData = useSelector((state) => state.songCurrentData);
  //const { firstLoading } = useSelector((state) => state.config);
  const { songIndex, playlistIndex } = useSelector((state) => state.listSong);
  //const listSong = useSelector(currentListSongSelector);
  //const currentSong = useSelector(currentSongSelector);
  const { config } = useSelector((state) => state.config);
  const [currentTime, setCurrentTime] = useState(0);

  const randomIndexArray = useRef([]);

  const audioRef = useRef();
  const handlePlayMusic = () => {
    if (!isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
    dispatch(setSongPlaying(!isPlaying));
  };

  const handleChangeSong = (direction) => {
    dispatch(songLoading(false));
    if (isPlaying) {
      dispatch(toggleLoadingSong(true));
    }

    let newSongIndex;
    if (isRandom) {
      newSongIndex = getRandomIndex(
        songCurrentList,
        songIndexOfList,
        randomIndexArray
      );
    } else {
      newSongIndex = getNewIndex(songCurrentList, songIndexOfList, direction);
    }
    //dispatch(nextSong(newSongIndex));
    dispatch(getPlaySongCurrentInfo(songCurrentList[newSongIndex]));
    dispatch(
      changePlaySong({
        songIndexOfList: newSongIndex,
        enCodeIDSong: songCurrentList[newSongIndex].encodeId,
      })
    );
    getSongById(songCurrentList[newSongIndex].encodeId).then((res) => {
      console.log(res)
      if (res.data.msg === "Success") {
        dispatch(getSongPath(res.data.data[128]));
        
      } else {
        alert("Bài hát chưa được cập nhật, vui lòng chọn bài khác");
        dispatch(setSongPlaying(false));
      }
      dispatch(songLoading(true));
    }).catch((res) => {console.log(res)});
    dispatch(setSongPlaying(true));
  };

  const handleEndSong = () => {
    isRepeat ? audioRef.current.play() : handleChangeSong("next");
  };

  const handleHideLoading = () => {
    if (audioRef.current.duration) {
      dispatch(toggleLoadingSlideAndSong(false));
    }
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleChangeTime = (currentTime) => {
    audioRef.current.currentTime = currentTime;
  };

  // useEffect(() => {
  //   //Prevent auto play in the first loading
  //   if (firstLoading) return;

  //   // Play song when dependencies change
  //   if (isPlaying) {
  //     dispatch(setSongPlaying(true));
  //     audioRef.current.play();
  //   }

  //   // eslint-disable-next-line
  // }, [songIndex, isLoading, playlistIndex]);

  useEffect(() => {
    const volumeValue = volumePercent / 100;
    audioRef.current.volume = volumeValue;
  }, [volumePercent]);

  // Save config
  useEffect(() => {
    console.log(songCurrentList)
    const newConfig = { ...config };
    newConfig["songIndex"] = songIndex;
    newConfig["playlistIndex"] = playlistIndex;
    newConfig["isRandom"] = isRandom;
    newConfig["isRepeat"] = isRepeat;
    newConfig["volume"] = volumePercent;

    dispatch(editConfig(newConfig));
    // eslint-disable-next-line
  }, [songIndex, playlistIndex, isRandom, isRepeat, volumePercent]);

  useEffect(() => {
    isLoading && isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [songCurrentData, isLoading, isPlaying]);

  const providerValue = {
    handleChangeSong,
    handlePlayMusic,
    currentTime,
    audioRef,
    handleChangeTime,
  };
  return (
    <PlayerContext.Provider value={providerValue}>
      {children}
      <audio
        ref={audioRef}
        id="audio"
        src={songPath}
        onTimeUpdate={handleHideLoading}
        onEnded={handleEndSong}
      ></audio>
    </PlayerContext.Provider>
  );
}

export default PlayerProvider;
