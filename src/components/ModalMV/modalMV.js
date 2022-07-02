import React, { useRef, useState, useEffect } from "react";
import { getApiMv } from "app/services";
import { useDispatch, useSelector } from "react-redux";
import { setMvInfo, setMvId } from "Slice/mvListSlice";
import "./modalMV.scss";
import { NavLink } from "react-router-dom";
import { setArtistAlias } from "Slice/artistPageDataSlice";
import { setHistoryPage } from "app/services";

function ModalMV() {
  const dispatch = useDispatch();
  const { videoId, videoInfo } = useSelector((state) => state.mvList);

  const modalMV = useRef();
  const video = useRef();

  useEffect(() => {
    getApiMv(videoId).then((res) => {
      dispatch(setMvInfo(res.data.data));
    });
  }, [videoId]);

  const moreMVList = useRef();

  const handleChangeMV = (encodeId) => {
    dispatch(setMvId({ videoId: encodeId, isOpenModalMv: true }));
  };

  return (
    <div className="modalMV">
      <div
        ref={modalMV}
        className="modalMV-bg"
        style={{ background: `url(${videoInfo?.thumbnailM})` }}
      >
        <div className="modalMV-bg-opacity"></div>
      </div>
      <div className="modalMV-header">
        <div className="MV-detail">
          {videoInfo?.artists && (
            <img src={videoInfo?.artists[0]?.thumbnailM} alt="" />
          )}
          <div className="MV-box-detail">
            <span className="MV-title">{videoInfo?.title}</span>
            <p className="info__author">
              {videoInfo?.artists?.map((artist, index) => (
                <React.Fragment key={index}>
                  <NavLink
                    to={"/artist/name=" + artist.alias}
                    className="is-ghost"
                    onClick={() => {
                      dispatch(setArtistAlias(artist.alias));
                      setHistoryPage({ alias: artist.alias, page: "artist" });
                    }}
                  >
                    {artist?.name}
                  </NavLink>
                  {index < videoInfo?.artists?.length - 1 && ", "}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
        <button
          className="btn-close-MV"
          onClick={() => {
            dispatch(setMvId({ isOpenModalMv: false }));
          }}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      <div className="modalMV-content">
          {videoInfo?.streaming && (
            <video
              ref={video}
              className="modalMV-video"
              controls
              autoPlay
              src={
                videoInfo?.streaming.mp4["720p"] !== undefined
                  ? videoInfo?.streaming.mp4["720p"]
                  : videoInfo?.streaming.mp4["480p"] !== undefined
                  ? videoInfo?.streaming.mp4["480p"]
                  : videoInfo?.streaming.mp4["360p"]
              }
            ></video>
          )}
        {videoInfo?.length !== 0 && (
          <div className="more-MV">
            <div className="more-MV-header">
              <span>Danh Sách Gợi Ý</span>
            </div>
            <ul className="more-MV-list">
              <li ref={moreMVList} className="more-MV-item active">
                <div className="more-MV-item-img">
                  <div
                    className="more-MV-bg"
                    style={{
                      background: `url(${videoInfo.thumbnailM}) no-repeat center center / cover`,
                    }}
                  ></div>
                  <div className="more-MV-item-hover active">
                    <span>Đang Phát</span>
                  </div>
                </div>
                <div className="more-MV-item-detail">
                  <span className="more-MV-title">{videoInfo?.title}</span>
                  <p className="info__author">
                    {videoInfo?.artists?.map((artist, index) => (
                      <React.Fragment key={index}>
                        <NavLink
                          to={"/artist/name=" + artist.alias}
                          className="is-ghost"
                          onClick={() => {
                            dispatch(setArtistAlias(artist.alias));
                            setHistoryPage({
                              alias: artist.alias,
                              page: "artist",
                            });
                          }}
                        >
                          {artist?.name}
                        </NavLink>
                        {index < videoInfo?.artists?.length - 1 && ", "}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </li>

              {videoInfo?.recommends !== undefined &&
                videoInfo?.recommends.map((item, index) => {
                  return (
                    <li key={index} className="more-MV-item">
                      <div
                        className="more-MV-item-img"
                        onClick={() => handleChangeMV(item.encodeId)}
                      >
                        {/* <img src={item.thumbnailM} alt="" /> */}
                        <div
                          className="more-MV-bg"
                          style={{
                            background: `url(${item.thumbnailM}) no-repeat center center / cover`,
                          }}
                        ></div>
                        <div className="more-MV-item-hover">
                          <img
                            src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.6.32/static/media/play.81e7696e.svg"
                            alt=""
                            style={{ width: "45px" }}
                          />
                        </div>
                      </div>
                      <div className="more-MV-item-detail">
                        <span className="more-MV-title">{item.title}</span>
                        <p className="info__author">
                          {item?.artists?.map((artist, index) => (
                            <React.Fragment key={index}>
                              <NavLink
                                to={"/artist/name=" + artist.alias}
                                className="is-ghost"
                                onClick={() => {
                                  dispatch(setArtistAlias(artist.alias));
                                  setHistoryPage({
                                    alias: artist.alias,
                                    page: "artist",
                                  });
                                }}
                              >
                                {artist?.name}
                              </NavLink>
                              {index < item?.artists?.length - 1 && ", "}
                            </React.Fragment>
                          ))}
                        </p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalMV;
