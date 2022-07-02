import { toggleThickenHeader } from "configSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, NavLink } from "react-router-dom";
import { setIsLoadingTab } from "Slice/isLoadingTabSlice";
import LoadingAnimate from "components/Container/components/LoadingAnimate/LoadingAnimate";
import { getApiArtistPage } from "app/services";
import { setArtistSection, setArtistInfo } from "Slice/artistPageDataSlice";
import "./artistPage.scss";

function ArtistPage() {
  const dispatch = useDispatch();
  const containerRef = useRef();
  const isLoading = useSelector((state) => state.isLoadingTab.isLoading);
  const artistData = useSelector((state) => state.artistPageData);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(setIsLoadingTab(true));
    getApiArtistPage(artistData.alias).then((res) => {
      console.log(res.data.data);
      dispatch(setArtistSection(res.data.data.sections));
      dispatch(
        setArtistInfo({
          name: res.data.data.name,
          sortBiography: res.data.data.sortBiography,
          biography: res.data.data.biography,
          thumbnail: res.data.data.thumbnail,
          topAlbum: res.data.data.topAlbum,
          totalFollow: res.data.data.totalFollow,
        })
      );
      dispatch(setIsLoadingTab(false));
    });
  }, [artistData.alias]);

  console.log(artistData);

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
    <div className="app__container tab--personal" ref={containerRef}>
      {isLoading ? (
        <LoadingAnimate />
      ) : (
        <>
          <div className="content__artist-page">
            <div className="content__header">
              <div className="content__header-left">
                <div className="content__header-title">
                  {artistData.artistInfo.name}
                </div>
                <div className="content__header-biography">
                  {artistData.artistInfo?.sortBiography }
                  {artistData.artistInfo?.biography && (
                    <span
                      className="read-more"
                      onClick={() => setOpenModal(true)}
                    >
                     {"..."} Xem Thêm
                    </span>
                  )}
                </div>
                <div className="content__header-btns">
                  <button className="content__header-btn">
                    <i class="bi bi-play-fill"></i>
                    Phát Nhạc
                  </button>
                  <button className="content__header-btn">
                    Quan tâm
                    <i class="bi bi-dot"></i>
                    {(artistData.artistInfo?.totalFollow / 1000000).toFixed(1) >
                    1 ? (
                      <span>
                        {(artistData.artistInfo?.totalFollow / 1000000).toFixed(
                          2
                        )}
                        M
                      </span>
                    ) : (artistData.artistInfo?.totalFollow / 1000).toFixed(1) >
                      1 ? (
                      <span>
                        {(artistData.artistInfo?.totalFollow / 1000).toFixed(0)}
                        K
                      </span>
                    ) : (
                      artistData.artistInfo?.totalFollow
                    )}
                  </button>
                </div>
                <div className="top__album">
                  <div
                    className="bg-img"
                    style={{
                      background: `url('${artistData.artistInfo?.topAlbum?.thumbnail}') no-repeat center center / cover`,
                    }}
                  ></div>
                  <div className="top__album-info">
                    {artistData.artistInfo?.topAlbum && <span>Mới Nhất</span>}
                    <div className="top__album-title">
                      {artistData.artistInfo?.topAlbum?.title}
                    </div>
                    <div className="top__album-release">
                      {artistData.artistInfo?.topAlbum?.releaseDate}
                    </div>
                  </div>
                </div>
              </div>
              <div className="content__header-right">
                <img src={artistData.artistInfo.thumbnail} />
              </div>
            </div>
            <div className="content__navbar">
              <div className="content__navbar-container">
                <ul className="content__navbar-menu">
                  <li className="content__navbar-item active">
                    <NavLink to="." end>
                      Tổng quan
                    </NavLink>
                  </li>
                  <li className="content__navbar-item">
                    <NavLink to="feed">Hoạt động</NavLink>
                  </li>
                  <li className="content__navbar-item">
                    <NavLink to="event">Sự kiện</NavLink>
                  </li>
                  <li className="content__navbar-item hide-on-mobile">
                    <NavLink to="songs">Bài hát</NavLink>
                  </li>
                  <li className="content__navbar-item">
                    <NavLink to="single">Single & EP</NavLink>
                  </li>
                  <li className="content__navbar-item hide-on-mobile">
                    <NavLink to="album">Album</NavLink>
                  </li>
                  <li className="content__navbar-item hide-on-tablet-mobile">
                    <NavLink to="video">Mv</NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="content__container">
              <Outlet />
            </div>
          </div>
          {openModal ? (
            <div className="artist-modal">
              <div className="artist-modal-content">
                <div
                  className="artist-modal-btn"
                  onClick={() => setOpenModal(false)}
                >
                  <i class="bi bi-x"></i>
                </div>
                <div className="content-top">
                  <div
                    className="content-top-bg"
                    style={{
                      background: `url(${artistData.artistInfo.thumbnail}) no-repeat center center / cover`,
                    }}
                  ></div>
                  <div className="overlay"></div>
                  <div className="content">
                    <div className="content-top-img">
                      <img src={artistData.artistInfo.thumbnail} />
                    </div>
                    <h3 className="content-top-title">
                      {artistData.artistInfo.name}
                    </h3>
                  </div>
                </div>
                <div className="content-detail">
                  <div
                    className="content-text"
                    dangerouslySetInnerHTML={{
                      __html: artistData.artistInfo.biography,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}

export default ArtistPage;
