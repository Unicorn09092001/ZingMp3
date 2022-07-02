import clsx from "clsx";
import React, { useMemo, useState } from "react";
import "../SongIconButton.scss";
import {
  getFavoriteSongs,
  updateFavoriteSongs,
  removeFavoriteSong,
  getFavoritePlaylists,
  updateFavoritePlaylists,
  removeFavoritePlaylist,
  getFavoriteAlbums,
  updateFavoriteAlbums,
  removeFavoriteAlbum,
} from "app/services";

function HeartButton({
  primary: isPrimary = false,
  hideOnMobile = false,
  optionalClass = "",
  songInfo,
  playlistInfo,
  albumInfo,
}) {
  const [primary, setPrimary] = useState(isPrimary);
  const heartIcon = useMemo(
    () => (primary ? "bi-heart-fill" : "bi-heart"),
    [primary]
  );

  const handleChangePrimary = () => {
    let isCheckFavoriteSong = false;
    let isCheckFavoritePlaylist = false;
    let isCheckFavoriteAlbum = false;
    setPrimary(!primary);
    if (songInfo) {
      getFavoriteSongs().then((songList) => {
        songList.data.length === 0
          ? updateFavoriteSongs({ ...songInfo })
          : songList.data.forEach((song, index) => {
              if (song.encodeId === songInfo.encodeId) {
                removeFavoriteSong(song.id);
                isCheckFavoriteSong = true;
              } else if (index === songList.data.length - 1) {
                isCheckFavoriteSong
                  ? (isCheckFavoriteSong = false)
                  : updateFavoriteSongs({ ...songInfo });
              }
            });
      });
    }
    if (playlistInfo) {
      getFavoritePlaylists().then((playlists) => {
        playlists.data.length === 0
          ? updateFavoritePlaylists({
              title: playlistInfo.title,
              encodeId: playlistInfo.encodeId,
              thumbnail: playlistInfo.thumbnail,
              thumbnailM: playlistInfo.thumbnailM,
              creator: playlistInfo.userName,
            })
          : playlists.data.forEach((playlist, index) => {
              if (playlist.encodeId === playlistInfo.encodeId) {
                removeFavoritePlaylist(playlist.id);
                isCheckFavoritePlaylist = true;
              } else if (index === playlists.data.length - 1) {
                isCheckFavoritePlaylist
                  ? (isCheckFavoritePlaylist = false)
                  : updateFavoritePlaylists({
                      title: playlistInfo.title,
                      encodeId: playlistInfo.encodeId,
                      thumbnail: playlistInfo.thumbnail,
                      thumbnailM: playlistInfo.thumbnailM,
                      creator: playlistInfo.userName,
                    });
              }
            });
      });
    }
    if (albumInfo) {
      getFavoriteAlbums().then((albums) => {
        albums.data.length === 0
          ? updateFavoriteAlbums({
              title: albumInfo.title,
              encodeId: albumInfo.encodeId,
              thumbnail: albumInfo.thumbnail,
              thumbnailM: albumInfo.thumbnailM,
              creator: albumInfo.userName,
            })
          : albums.data.forEach((album, index) => {
              if (album.encodeId === albumInfo.encodeId) {
                removeFavoriteAlbum(album.id);
                isCheckFavoriteAlbum = true;
              } else if (index === albums.data.length - 1) {
                isCheckFavoriteAlbum
                  ? (isCheckFavoriteAlbum = false)
                  : updateFavoriteAlbums({
                      title: albumInfo.title,
                      encodeId: albumInfo.encodeId,
                      thumbnail: albumInfo.thumbnail,
                      thumbnailM: albumInfo.thumbnailM,
                      creator: albumInfo.userName,
                    });
              }
            });
      });
    }
  };

  return (
    <div
      className={clsx(optionalClass, {
        "hide-on-mobile": hideOnMobile,
      })}
      onClick={handleChangePrimary}
    >
      <i
        className={clsx("btn--icon", "icon--heart", "bi", heartIcon, {
          primary: primary,
        })}
      ></i>
    </div>
  );
}

export default HeartButton;
