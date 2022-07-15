import React, { forwardRef, useImperativeHandle, useRef } from "react";

function EventItem({ event = {} }, ref) {
  const { subscribeText, totalFollow, followers, title, coverHM, label } =
    event;

  const itemRef = useRef();

  useImperativeHandle(ref, () => ({
    getWidth() {
      return itemRef.current?.getBoundingClientRect().width;
    },
  }));

  return (
    <div className="row__item item--event" ref={itemRef}>
      <div className="row__item-container flex--top-left">
        <div className="row__item-display br-5">
          <div
            className="row__item-img img--mv"
            style={{
              background: `url('${coverHM}') no-repeat center center / cover`,
            }}
          ></div>
          <div className="blur"></div>
          <div className="row__item-display-content">
            <div className="display__content-label">{label}</div>
            <h3 className="display__content-title">{title}</h3>
            <p className="display__content-time"></p>
          </div>
        </div>
        <div className="row__item-info media">
          <div className="media__left">
            <div className="media__info">
              <span className="info__title event--title is-active">
                Lượt chúc mừng
              </span>
              <div className="info__avatar">
                {followers?.map((follower, index) => (
                  <div key={index} className="info__avatar-item">
                    <div
                      className="info__avatar-img"
                      style={{
                        background: `url('${follower.avatar}') no-repeat center center / cover`,
                      }}
                    ></div>
                  </div>
                ))}
                <div className="info__avatar-item">
                  <p className="info__avatar-text">+{totalFollow}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="media__content">
            <button className="button button-primary event__button">
              <span>{subscribeText}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(EventItem);
