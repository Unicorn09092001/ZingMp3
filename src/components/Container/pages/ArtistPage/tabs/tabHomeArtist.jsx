import Album from "features/Album/Album";
import Artist from "features/Artist/Artist";
import Mv from "features/Mv/Mv";
import Playlist from "features/Playlist/Playlist";
import PlayMusic from "features/PlayMusic/PlayMusic";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function TabHomeArtist() {
  const dispatch = useDispatch();
  const artistData = useSelector((state) => state.artistPageData);

  return (
    <div className="grid container__tab tab-home">
      {artistData.sections.map((section) => {
        return section?.title === "Bài hát nổi bật" ? (
          <PlayMusic
            playMusicList={section?.items}
            sectionName={section?.title}
            navigable
            pathName="songs"
            isArtistPage
          />
        ) : section?.title === "Single & EP" ? (
          <Album
            optionalClass={"mt-50"}
            sectionName={section?.title}
            navigable
            noWrap={section?.items.length > 5 ? true : false}
            pathName="single"
            albumList={section?.items}
          />
        ) : section?.title === "Album" ? (
          <Album
            optionalClass={"mt-50"}
            sectionName={section?.title}
            navigable
            noWrap={section?.items.length > 5 ? true : false}
            pathName="album"
            albumList={section?.items}
          />
        ) : section?.title === "MV" ? (
          <Mv
            optionalClass={"mt-50"}
            noWrap={section?.items?.length > 5 ? true : false}
            sectionName={section?.title}
            navigable
            pathName="video"
            mvList={section?.items}
          />
        ) : section?.title === "Tuyển tập" ? (
          <Playlist
            optionalClass={"mt-50"}
            sectionName={section?.title}
            playlistList={section?.items}
          />
        ) : section?.title === "Xuất hiện trong" ? (
          <Playlist
            optionalClass={"mt-30"}
            sectionName={section?.title}
            playlistList={section?.items}
            noWrap={section?.items.length > 5 ? true : false}
          />
        ) : section?.title === "Bạn Có Thể Thích" ? (
          <Artist
            optionalClass={"mt-30"}
            sectionName={section?.title}
            artistList={section?.items}
            noWrap={section?.items.length > 5 ? true : false}
          />
        ) : null;
      })}
    </div>
  );
}

export default TabHomeArtist;
