import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { NavLink } from "react-router-dom";
import { formatAudioTime } from "utils";

function MvItem({ mv }, ref) {
  const { artists, artist, thumbnailM, title, duration } = mv;
  const itemRef = useRef();

  useImperativeHandle(ref, () => ({
    getWidth() {
      return itemRef.current?.getBoundingClientRect().width;
    },
  }));

  return (
    <div className="row__item item--mv" ref={itemRef}>
      <div className="row__item-container flex--top-left">
        <div className="row__item-display br-5">
          <div
            className="row__item-img img--mv"
            style={{
              background: `url('${thumbnailM}') no-repeat center center / cover`,
            }}
          ></div>
          <div className="row__item-actions">
            <div className="action-btn mv-btn--close">
              <i className="bi bi-x-lg btn--icon"></i>
            </div>
            <div className="btn--play-playlist">
              <div className="control-btn btn-toggle-play">
                <i className="bi bi-play-fill icon-play"></i>
              </div>
            </div>
          </div>
          <div className="overlay"></div>
          <div className="mv__time">{formatAudioTime(duration)}</div>
        </div>
        <div className="row__item-info media">
          <div className="media__left">
            <div
              className="media__thumb is-rounded mr-10"
              style={{
                background: `url('${artist?.thumbnail}') no-repeat center center / cover`,
              }}
            ></div>
            <div className="media__info">
              <span className="info__title is-active is-twoline">{title}</span>
              <p className="info__author">
                {artists?.map((item, index) => (
                  <React.Fragment key={index}>
                    <NavLink to={"/artist/name=" + artist.alias} className="is-ghost">
                      {item?.name}
                    </NavLink>
                    {index < artists?.length - 1 && ", "}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(MvItem);
