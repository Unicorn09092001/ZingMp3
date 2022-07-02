import { toggleThickenHeader } from "configSlice";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setPathMv, setMvList } from "Slice/mvListSlice";
import { getApiMvList } from "app/services";
import MvList from "features/Mv/components/MvList/MvList";

import "./MvPage.scss";

const tabMVs = [
  {
    title: "Việt Nam",
    code: "IWZ9Z08I",
    link: "viet-nam",
  },
  {
    title: "US-UK",
    code: "IWZ9Z08O",
    link: "us-uk",
  },
  {
    title: "KPOP",
    code: "IWZ9Z08W",
    link: "kpop",
  },
  {
    title: "HÒA TẤU",
    code: "IWZ9Z086",
    link: "hoa-tau",
  },
];

function MvPage() {
  const dispatch = useDispatch();
  const containerRef = useRef();

  const mvList = useSelector((state) => state.mvList);

  useEffect(() => {
    getApiMvList(mvList.code, mvList.page, mvList.count).then((res) => {
      dispatch(setMvList([...res.data.data.items]))
    });
  }, [mvList.code]);

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
    <div className="app__container tab--mv" ref={containerRef}>
      <div className="app__container-content">
        <div className="tab__mv-header">
          <div className="tab__mv-title">MV</div>
          <div className="tab__mv-nav">
            {tabMVs.map((tabMv) => {
              return (
                <div>
                  <NavLink
                    className={"tab__mv-nav-item"}
                    to={tabMv.link + "/" + tabMv.code}
                    onClick={() => {
                      dispatch(
                        setPathMv({ link: tabMv.link, code: tabMv.code })
                      );
                    }}
                  >
                    {tabMv.title}
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
        <div className="grid container__tab tab-mv" style={{marginTop: "140px"}}>
          <div className="container__section row">
            <div className="col l-12 m-12 c-12">
              <MvList mvList={mvList.list} optionalClass="mb-30"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MvPage;
