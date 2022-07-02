import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Container.scss";
import ChartPage from "./pages/ChartPage/ChartPage";
import ExplorePage from "./pages/ExplorePage/ExplorePage";
import FollowPage from "./pages/FollowPage/FollowPage";
import PersonalPage from "./pages/PersonalPage/PersonalPage";
import TabAlbum from "./pages/PersonalPage/pages/TabAlbum";
import TabArtist from "./pages/PersonalPage/pages/TabArtist";
import TabHome from "./pages/PersonalPage/pages/TabHome";
import TabMv from "./pages/PersonalPage/pages/TabMv";
import TabPlaylist from "./pages/PersonalPage/pages/TabPlaylist";
import TabSong from "./pages/PersonalPage/pages/TabSong";
import TabUpload from "./pages/PersonalPage/pages/TabUpload";
import RadioPage from "./pages/RadioPage/RadioPage";
import NewReleasePage from "./pages/NewReleasePage/NewReleasePage";
import Top100Page from "./pages/top100Page/Top100Page";
import PlaylistPage from "./pages/playlistPage/PlaylistPage";
import ArtistPage from "./pages/ArtistPage/ArtistPage";
import TabHomeArtist from "./pages/ArtistPage/tabs/tabHomeArtist";
import SearchPage from "./pages/searchPage/SearchPage";

function Container() {
  const playlistId = useSelector((state) => state.playlistCurrent.encodeId);
  const artistData = useSelector((state) => state.artistPageData);
  const listSong = useSelector((state) => state.favoriteSongs.songList);
  const albumList = useSelector((state) => state.personalAlbum.list);
  const mvList = useSelector((state) => state.personalMv.list);
  const {searchPath} = useSelector(state => state.searchKeyWord)
  
  return (
    <Routes>
      <Route path="personal/" element={<PersonalPage />}>
        <Route path="" element={<TabHome />} />
        <Route path="songs" element={<TabSong listSong={listSong} />} />
        <Route path="playlists" element={<TabPlaylist />} />
        <Route
          path="albums"
          element={<TabAlbum albumList={albumList} sectionName="Album" />}
        />
        <Route path="mvs" element={<TabMv mvList={mvList} />} />
        <Route path="artists" element={<TabArtist />} />
        <Route path="upload" element={<TabUpload />} />
      </Route>
      <Route path="/" element={<ExplorePage />} />
      <Route path="zingChart" element={<ChartPage />} />
      <Route path="radio" element={<RadioPage />} />
      <Route path="follow" element={<FollowPage />} />
      <Route path="moi-phat-hanh" element={<NewReleasePage />} />
      <Route path="hub" />
      <Route path="top100" element={<Top100Page />} />
      <Route path="the-loai-video" />
      <Route path={"playlist/id=" + playlistId} element={<PlaylistPage />} />
      <Route
        path={"/artist/name=" + artistData.alias + "/"}
        element={<ArtistPage />}
      >
        <Route path="" element={<TabHomeArtist />} />
        <Route path="feed" />
        <Route path="event" />
        {artistData.sections.map((section) => {
          return section.title === "Bài hát nổi bật" ? (
            <Route
              path="songs"
              element={<TabSong listSong={section.items} />}
            />
          ) : section.title === "Single & EP" ? (
            <Route
              path="single"
              element={
                <TabAlbum
                  albumList={section.items}
                  sectionName={section.title}
                />
              }
            />
          ) : section.title === "Album" ? (
            <Route
              path="album"
              element={<TabAlbum albumList={section.items} />}
            />
          ) : section.title === "MV" ? (
            <Route path="video" element={<TabMv mvList={section.items} />} />
          ) : null;
        })}
        <Route path="album" element={<TabAlbum sectionName="Album" />} />
        <Route path="video" element={<TabMv sectionName="Album" />} />
      </Route>
      <Route path={"/tim-kiem/tat-ca/key=" + encodeURI(searchPath)} element={<SearchPage />}/>
    </Routes>
  );
}

export default Container;
