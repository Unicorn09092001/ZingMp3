import { toggleThickenHeader } from "configSlice";
import SongRankingList from "features/SongRanking/components/SongRankingList/SongRankingList";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApiNewReleasePage } from "app/services";
import { getNewRelease } from "Slice/newReleaseSlice";
import { setIsLoadingTab } from "Slice/isLoadingTabSlice";
import LoadingAnimate from "components/Container/components/LoadingAnimate/LoadingAnimate";


function NewReleasePage() {
  const dispatch = useDispatch();
  const containerRef = useRef();


  const { listSong } = useSelector((state) => state.newRelease);
  const isLoading = useSelector((state) => state.isLoadingTab.isLoading);

  useEffect(() => {
    dispatch(setIsLoadingTab(true));
    getApiNewReleasePage().then((res) => {
      dispatch(getNewRelease(res.data.data?.song.items));
      dispatch(setIsLoadingTab(false));
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
    <div className="app__container tab--newRelease" ref={containerRef}>
      <div className="app__container-content">
        {isLoading ? (
          <LoadingAnimate />
        ) : (
          <div className="charts__container">
            <div className="grid">
              <div className="chart__container-header mb-40 mt-50">
                <h3 className="chart__header-name">Mới Phát Hành</h3>
                <div className="chart__header-btn">
                  <i className="bi bi-play-fill chart__header-icon"></i>
                </div>
              </div>
              <div className="row no-gutters chart--container mt-10 mb-20">
                <div className=" col l-12 m-12 c-12">
                  <SongRankingList listSong={listSong} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewReleasePage;
