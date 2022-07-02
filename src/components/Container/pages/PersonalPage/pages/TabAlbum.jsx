import AlbumList from "features/Album/components/AlbumList/AlbumList";
import React from "react";
import { useSelector } from "react-redux";

function TabAlbum({ albumList = [], sectionName = "" }) {
  return (
    <div className="grid container__tab tab-album">
      <div className="container__section row">
        <div className="col l-12 m-12 c-12 mb-16">
          <div className="container__header">
            <div className="container__header-title">
              <h3>{sectionName}&nbsp;</h3>
            </div>
          </div>
        </div>
        {albumList.length === 0 ? (
          <div className="col l-12 m-12 c-12">
            <div className="box--no-content">
              <div className="no-content-image--album"></div>
              <span className="no-content-text">Danh sách Album trống</span>
            </div>
          </div>
        ) : (
          <div className="col l-12 m-12 c-12">
            <AlbumList albumList={albumList} optionalClass="mb-30" />
          </div>
        )}
      </div>
    </div>
  );
}

export default TabAlbum;
