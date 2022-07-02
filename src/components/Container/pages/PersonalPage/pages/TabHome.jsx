import Album from "features/Album/Album";
import Artist from "features/Artist/Artist";
import Mv from "features/Mv/Mv";
import Playlist from "features/Playlist/Playlist";
import PlayMusic from "features/PlayMusic/PlayMusic";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteArtists } from "app/services";
import { setPersonalArtist } from "features/Artist/personalArtistSlice";

function TabHome() {
  const dispatch = useDispatch();
  const playlistList = useSelector((state) => state.personalPlaylist.list);
  const artistList = useSelector((state) => state.personalArtist.list);
  const favoriteSongs = useSelector((state) => state.favoriteSongs.songList);
  const favoriteAlbums = useSelector((state) => state.personalAlbum.list);
  const mvList = useSelector((state) => state.personalMv.list);

  useEffect(() => {
    getFavoriteArtists().then((res) => {
      dispatch(setPersonalArtist(res.data));
    });
  }, []);

  return (
    <div className="grid container__tab tab-home">
      <PlayMusic
        playMusicList={favoriteSongs}
        sectionName="Bài Hát"
        navigable
        pathName="songs"
      />

      <Playlist
        playlistList={playlistList}
        hasCreateItem
        noWrap={playlistList.length > 5 ? true : false}
        sectionName="Playlist"
        navigable
        pathName="playlists"
      />

      <Album
        optionalClass={"mt-50"}
        noWrap={favoriteAlbums.length > 5 ? true : false}
        sectionName="Album"
        navigable
        pathName="albums"
        albumList={favoriteAlbums}
      />

      <Mv
        optionalClass={"mt-50"}
        noWrap={mvList.length > 5 ? true : false}
        sectionName="MV"
        navigable
        pathName="mvs"
        mvList={mvList}
      />

      <Artist
        optionalClass={"mt-30"}
        noWrap={artistList.length > 5 ? true : false}
        sectionName="Artist"
        navigable
        artistList={artistList}
        pathName="artists"
      />
    </div>
  );
}

export default TabHome;
