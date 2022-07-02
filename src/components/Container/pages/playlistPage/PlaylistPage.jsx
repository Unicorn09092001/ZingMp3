import { toggleThickenHeader } from "configSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SongList from "features/PlayMusic/components/SongList/SongList";
import { getPlaylistById } from "app/services";
import { setPlaylistData } from "Slice/playlistCurrentSlice";
import "./playlistPage.scss";
import moment from "moment";
import { NavLink } from "react-router-dom";
import HeartButton from "components/IconButton/HeartButton/HeartButton";
import Artist from "features/Artist/Artist";
import { setIsLoadingTab } from "Slice/isLoadingTabSlice";
import LoadingAnimate from "components/Container/components/LoadingAnimate/LoadingAnimate";
import { setArtistAlias } from "Slice/artistPageDataSlice";
import { setHistoryPage } from "app/services";

function PlaylistPage() {
  const dispatch = useDispatch();
  const containerRef = useRef();
  const [resMsg, setResMsg] = useState("");

  const playlistData = useSelector(
    (state) => state.playlistCurrent.playlistData
  );

  const playlistId = useSelector((state) => state.playlistCurrent.encodeId);
  const isLoading = useSelector((state) => state.isLoadingTab.isLoading);
  const {isPlaying} = useSelector((state) => state.songCurrentData)

  useEffect(() => {
    getPlaylistById(playlistId).then((res) => {
      setResMsg(res.data.msg);
      dispatch(setPlaylistData(res.data.data));
      dispatch(setIsLoadingTab(false));
    });
  }, [playlistId]);


  useEffect(() => {
    const containerElement = containerRef.current;
    const handleScrollContainer = (e) => {
      const scrollTop = e.target.scrollTop;

      dispatch(toggleThickenHeader(scrollTop > 10));
    };

    containerElement.addEventListener("scroll", handleScrollContainer);

    return () =>
      containerElement.removeEventListener("scroll", handleScrollContainer);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="app__container tab--playlist" ref={containerRef}>
      <div className="app__container-content">
        {isLoading ? (
          <LoadingAnimate />
        ) : (
          <>
            {resMsg === "Success" && (
              <div className="Playlists__container ">
                <div className="grid">
                  <div className="row no-gutters chart--container mt-10 mb-20">
                    <div className=" col l-3 m-12 c-12">
                      <div className="header__playlist">
                        <div
                          className="row__item-display playlist__img"
                         // className={isPlaying ? "row__item-display playlist__img rotate-Thumb" : "row__item-display playlist__img"}
                          style={isPlaying ? { borderRadius: "50%" } : { borderRadius: "10px" }}
                        >
                          <div
                            //className="row__item-img img--square "
                            className={isPlaying ? "row__item-img img--square rotate-Thumb" : "row__item-img img--square"}
                            style={{
                              background: `url('${playlistData?.thumbnailM}') no-repeat center center / contain`,
                            }}
                          ></div>
                          <div className="row__item-actions">
                            {isPlaying ? (
                              <div
                                className="thumb--animate"
                                style={{ visibility: "initial" }}
                              >
                                <div
                                  className="thumb--animate-img"
                                  style={{
                                    background: `url('/assets/img/SongActiveAnimation/icon-playing.gif') no-repeat 50% / contain`,
                                  }}
                                ></div>
                              </div>
                            ) : (
                              <div className="btn--play-new-playlist">
                                <div className="control-btn btn-toggle-play">
                                  <i className="bi bi-play-fill"></i>
                                </div>
                              </div>
                            )}
                          </div>
                          {/* <div className="row__item-actions">
                            <div className="btn--play-playlist">
                              <div className="control-btn btn-toggle-play">
                                <i className="bi bi-play-fill icon-play"></i>
                              </div>
                            </div>
                          </div> */}
                          <div className="overlay"></div>
                        </div>
                        <div className="playlist-infor">
                          <div>
                            <div className="playlist-title">
                              {playlistData?.title}
                            </div>
                            <div>
                              Cập nhật:{" "}
                              {moment(playlistData?.timestamp).format(
                                "DD/MM/YYYY"
                              )}
                            </div>
                            <div>
                              {playlistData?.artists &&
                                playlistData?.artists.map((artist, index) => (
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
                                    {index < playlistData.artists.length - 1 &&
                                      ", "}
                                  </React.Fragment>
                                ))}
                            </div>
                            <div>
                              {(playlistData?.like / 1000000).toFixed(1) > 1 ? (
                                <span>
                                  {(playlistData?.like / 1000000).toFixed(2)}M
                                </span>
                              ) : (playlistData?.like / 1000).toFixed(1) > 1 ? (
                                <span>
                                  {(playlistData?.like / 1000).toFixed(0)}K
                                </span>
                              ) : (
                                playlistData?.like
                              )}{" "}
                              người yêu thích
                            </div>
                          </div>
                          <div className="playlist-infor-btn">
                            <button className="button is-small button-primary btn--play-all">
                              <i className="bi bi-play-fill container__header-icon"></i>
                              <span>Phát tất cả</span>
                            </button>
                            <div className="playlist-btn">
                              <HeartButton
                                primary
                                hideOnMobile
                                optionalClass="option-btn"
                              />
                              <div className="action-btn">
                                <i className="btn--icon bi bi-three-dots"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" col l-9 m-12 c-12">
                      <div className="container__playlistPage">
                        {playlistData?.description && (
                          <div className="container__playlist-discription">
                            <span>Lời tựa </span>
                            {playlistData.description}
                          </div>
                        )}
                        <div className="playlist__header mt-5">
                          <span className="playlist__header-title">
                            Bài hát
                          </span>
                          <span className="playlist__header-time">
                            Thời gian
                          </span>
                        </div>
                        <SongList
                          listSong={playlistData?.song.items}
                          isSongTab
                        />
                        {playlistData?.sections && (
                          <>
                            <div
                              className="playlist-title"
                              style={{ padding: "25px 0 " }}
                            >
                              Có Thể Bạn Quan Tâm
                            </div>
                            <SongList
                              listSong={playlistData?.sections[0].items}
                              isSongTab
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {playlistData?.artists && (
                  <Artist
                    optionalClass={"mt-30"}
                    noWrap
                    sectionName="Artist"
                    navigable
                    artistList={playlistData.artists}
                  />
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PlaylistPage;
