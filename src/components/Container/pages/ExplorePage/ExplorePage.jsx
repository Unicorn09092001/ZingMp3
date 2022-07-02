import { toggleThickenHeader } from "configSlice";
import Brand from "features/Brand/Brand";
import Event from "features/EventFeature/Event";
import ExploreSlide from "features/ExploreSlide/ExploreSlide";
import FavoriteArtist from "features/FavoriteArtist/FavoriteArtist";
import Label from "features/Label/Label";
import NewReleasePlaylist from "features/NewReleasePlaylist/NewReleasePlaylist";
import NormalPlaylist from "features/NormalPlaylist/NormalPlaylist";
import Radio from "features/Radio/Radio";
import SingerSlide from "features/SingerSlide/SingerSlide";
import SpecialPlaylist from "features/SpecialPlaylist/SpecialPlaylist";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ExplorePage.scss";

import { getApiExplorePage } from "app/services";
import {
  setNormalPlaylist,
  setExplorePlaylist,
  setLabelList,
  setTop100,
  setEventList,
  setNewReleaseList,
  setFavoriteArtistList,
  setExploreAlbum,
} from "components/Container/containerDataSlice";
import { setListSlide } from "features/ExploreSlide/exploreSlideSlice";
import { setListRadio } from "features/Radio/RadioSlice";
import { setIsLoadingTab } from "Slice/isLoadingTabSlice";
import LoadingAnimate from "components/Container/components/LoadingAnimate/LoadingAnimate";

function ExplorePage() {
  const {
    normalPlaylist,
    specialPlaylist,
    labelList,
    singerSlideList,
    eventList,
    newReleaseList,
    favoriteArtistList,
    brandList,
    explorePlaylist,
    top100,
    exploreAlbum,
  } = useSelector((state) => state.containerData);

  const dispatch = useDispatch();
  const containerRef = useRef();
  const isLoading = useSelector((state) => state.isLoadingTab.isLoading);

  useEffect(() => {
    dispatch(setIsLoadingTab(true));
    getApiExplorePage("1").then((res) => {
      dispatch(setListSlide(res.data.data.items[0].items));
      dispatch(setNormalPlaylist(res.data.data.items));
      dispatch(setIsLoadingTab(false));
    });
    getApiExplorePage("2").then((res) => {
      dispatch(setListRadio(res.data.data.items[0].items));
      dispatch(setExplorePlaylist(res.data.data.items[1]));
    });
    getApiExplorePage("3").then((res) => {
      dispatch(setLabelList(res.data.data.items[1].items));
      dispatch(setTop100(res.data.data.items[3]));
      dispatch(setEventList(res.data.data.items[4].items));
    });
    getApiExplorePage("4").then((res) => {
      dispatch(setNewReleaseList(res.data.data.items[0].items));
    });

    getApiExplorePage("5").then((res) => {
      dispatch(setExploreAlbum(res.data.data.items[0].items));
      dispatch(setFavoriteArtistList(res.data.data.items[1].items));
    });
  }, []);

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
    <div className="app__container tab--explore" ref={containerRef}>
      <div className="app__container-content">
        {isLoading ? (
          <LoadingAnimate />
        ) : (
          <div className="explore__container">
            <div className="grid">
              {/* <!-- Slide --> */}
              <div className="row container__section">
                <div className="col l-12 m-12 c-12">
                  <ExploreSlide />
                </div>
              </div>
              {/* <!-- Playlists --> */}
              {normalPlaylist
                .filter((item, index) => index > 2)
                .map((playlist, indexPlaylist) => (
                  <NormalPlaylist
                    key={indexPlaylist}
                    sectionName={playlist.title}
                    playlistList={playlist.items}
                    optionalClass="mt-30"
                    noWrap
                  />
                ))}
              <SpecialPlaylist
                playlistList={specialPlaylist[0]}
                optionalClass="mt-30"
              />
              {/* <!-- Radio --> */}
              <Radio
                sectionName="Radio nổi bật"
                navigable
                optionalClass="mt-30"
                noWrap
              />

              {/* <!-- Nhạc mới mỗi ngày --> */}
              <NormalPlaylist
                sectionName={explorePlaylist.title}
                playlistList={explorePlaylist.items}
                optionalClass="mt-30"
                noWrap
              />

              {/* <!-- Label --> */}
              <Label labelList={labelList} optionalClass="mt-30" noWrap />
              {/* <!-- Singer slide --> */}
              <SingerSlide singerSlideList={singerSlideList} noWrap />
              {/* <!-- Playlist --> */}

              <NormalPlaylist
                sectionName={top100.title}
                playlistList={top100.items}
                optionalClass="mt-30"
                noWrap
                navigable
                pathName={"top100"}
              />
              {/* <!-- Event --> */}
              <Event
                eventList={eventList}
                sectionName="Sự kiện"
                optionalClass="mt-30"
                noWrap
              />
              {/* <!-- Playlist --> */}
              <SpecialPlaylist
                playlistList={specialPlaylist[1]}
                optionalClass="mt-30"
              />
              {/* <!-- New Playlist --> */}
              <NewReleasePlaylist
                optionalClass="mt-30"
                newReleaseList={newReleaseList}
                noWrap
                navigable
                pathName={"moi-phat-hanh"}
                sectionName="Mới phát hành"
              />

              <NormalPlaylist
                key={exploreAlbum.sectionId}
                sectionName={""}
                playlistList={exploreAlbum}
                optionalClass="mt-30"
                noWrap
              />

              <FavoriteArtist
                optionalClass="mt-30"
                artistList={favoriteArtistList}
                noWrap
                sectionName="Nghệ Sĩ Yêu Thích"
              />
              {/* <!-- Brand --> */}
              <footer className="container__footer row mt-40">
                <div className="col l-12 m-12 c-12 container__footer-header">
                  <span>Đối Tác Âm Nhạc</span>
                </div>
                <div className="col l-12 m-12 c-12 container__footer-brand">
                  <Brand brandList={brandList} />
                </div>
              </footer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExplorePage;
