import clsx from "clsx";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setIsLoadingTab } from "Slice/isLoadingTabSlice";
import { setPlaylistCurrent } from "Slice/playlistCurrentSlice";
import { setArtistAlias } from "Slice/artistPageDataSlice";
import { setHistoryPage } from "app/services";

function PlaylistItemInfo({ playlist }) {
  const {
    title = "",
    creator = "",
    artists = [],
    description = "",
    type = "",
  } = playlist;

  const dispatch = useDispatch();

  return (
    <div
      className={clsx("row__item-info", {
        "explore-playlist--info": artists.length > 0 || description.length > 0,
      })}
    >
      {!!title && (
        <NavLink
          to={"/playlist/id=" + playlist.encodeId}
          className={clsx("row__info-name", {
            "is-oneline": artists.length > 0 || description.length > 0,
            "is-twoline":
              creator.length > 0 || type === "BXH" || type === "podcast",
          })}
          onClick={() => {
            dispatch(setIsLoadingTab(true));
            dispatch(setPlaylistCurrent(playlist.encodeId));
            setHistoryPage({encodeId: playlist.encodeId, page: "playlist"})
          }}
        >
          {title}
        </NavLink>
      )}
      {creator.length > 0 && <h3 className="row__info-creator">{creator}</h3>}
      {artists.length > 0 && (
        <p className="info__artist">
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
              {index < artists.length - 1 && ", "}
            </React.Fragment>
          ))}
        </p>
      )}

      {description.length > 0 && (
        <p className="info__artist">
          <a href="/" className="is-description">
            {description}
          </a>
        </p>
      )}
    </div>
  );
}

export default PlaylistItemInfo;
