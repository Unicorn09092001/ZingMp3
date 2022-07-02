import { toggleThickenHeader } from "configSlice";
import React, { useEffect, useRef } from "react";
import LoadingAnimate from "components/Container/components/LoadingAnimate/LoadingAnimate";
import { useDispatch, useSelector } from "react-redux";
import Album from "features/Album/Album";
import Mv from "features/Mv/Mv";
import Artist from "features/Artist/Artist";
import SongList from "features/PlayMusic/components/SongList/SongList";

function SearchPage() {
  const containerRef = useRef();
  const dispatch = useDispatch();
  const isLoadingTab = useSelector((state) => state.isLoadingTab.isLoading);
  const { searchData } = useSelector((state) => state.searchKeyWord);

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
    <div className="app__container" ref={containerRef}>
      <div className="app__container-content">
        {isLoadingTab ? (
          <LoadingAnimate />
        ) : (
          <div className="charts__container">
            <div
              style={{
                fontSize: "24px",
                lineHeight: "52px",
                fontWeight: "700",
                color: "#fff",
                borderBottom: "1px solid var(--border-primary)",
                marginBottom: "30px"
              }}
            >
              Kết Quả Tìm Kiếm
            </div>
            {searchData?.songs && 
            
            <div className="grid container__tab tab-song mb-30">
              <div className="row no-gutters">
                <div className="col l-12 m-12 c-12">
                  <div className="container__header mb-10">
                    <div className="container__header-title">
                      <h3>Bài Hát&nbsp;</h3>
                    </div>
                    <h3 className="container__header-subtitle">Bài Hát</h3>
                  </div>
                </div>
                <div className=" col l-12 m-12 c-12">
                  <div className="container__playlist">
                    <SongList listSong={searchData?.songs} />
                  </div>
                </div>
              </div>
            </div>
            }
            {searchData?.playlists &&
            <Album
              optionalClass={"mt-50"}
              sectionName={"Playlist/Album"}
              noWrap={searchData?.playlists.length > 5 ? true : false}
              albumList={searchData?.playlists}
            />
            }
            {searchData?.videos && (
              <Mv
                optionalClass={"mt-50"}
                noWrap={searchData?.videos.length > 5 ? true : false}
                sectionName={"MV"}
                mvList={searchData?.videos}
              />
            )}
            {searchData?.artists &&  <Artist
              optionalClass={"mt-30"}
              sectionName={"Nghệ Sĩ/OA"}
              artistList={searchData?.artists}
              noWrap={searchData?.artists.length > 5 ? true : false}
            />}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
