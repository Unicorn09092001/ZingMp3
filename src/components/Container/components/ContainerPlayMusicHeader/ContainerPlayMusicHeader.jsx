import React from "react";
import "./ContainerPlayMusicHeader.scss";
import { NavLink } from "react-router-dom";

function ContainerPlayMusicHeader({
  sectionName = "",
  navigable = false,
  pathName = "",
  isArtistPage = false,
}) {
  return (
    <div className="container__header">
      {navigable ? (
        <>
          <NavLink to={pathName} className="container__header-title">
            <h3>{sectionName}&nbsp;</h3>
            <i className="bi bi-chevron-right container__header-icon"></i>
          </NavLink>
        </>
      ) : (
        <div className="container__header-title">
          <h3>{sectionName}&nbsp;</h3>
        </div>
      )}

      <h3 className="container__header-subtitle">{sectionName}</h3>
      {isArtistPage ? null : (
        <div className="container__header-actions">
          <div className="button is-small container__header-btn hide-on-mobile">
            <input
              type="file"
              name="upload song"
              id="home__upload-input"
              className="container__header-input"
            />
            <label htmlFor="home__upload-input">
              <i className="bi bi-upload container__header-icon"></i>
              &nbsp;Tải lên
            </label>
          </div>
          <button className="button is-small button-primary container__header-btn btn--play-all">
            <i className="bi bi-play-fill container__header-icon"></i>
            <span>Phát tất cả</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default ContainerPlayMusicHeader;
