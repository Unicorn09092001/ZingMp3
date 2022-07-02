import { toggleThickenHeader } from "configSlice";
import SongRanking from "features/SongRanking/SongRanking";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChartData } from "features/SongRanking/songRankingSlice";
import { getApiChartPage } from "app/services";
import "./ChartPage.scss";
import { setIsLoadingTab } from "Slice/isLoadingTabSlice";
import LoadingAnimate from "components/Container/components/LoadingAnimate/LoadingAnimate";

function ChartPage() {
  const dispatch = useDispatch();
  const containerRef = useRef();
  const isLoading = useSelector((state) => state.isLoadingTab.isLoading);

  useEffect(() => {
    dispatch(setIsLoadingTab(true));
    getApiChartPage().then((res) => {
      dispatch(getChartData(res.data.data.RTChart.items));
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
    <div className="app__container tab--charts" ref={containerRef}>
      <div className="app__container-content">
        {isLoading ? (
          <LoadingAnimate />
        ) : (
          <div className="charts__container">
            <div className="grid">
              <div className="chart__container-header mb-40">
                <h3 className="chart__header-name">#zingchart</h3>
                <div className="chart__header-btn">
                  <i className="bi bi-play-fill chart__header-icon"></i>
                </div>
              </div>
              <SongRanking />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChartPage;
