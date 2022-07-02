import MvList from "features/Mv/components/MvList/MvList";
import React from "react";

function TabMv({ mvList = [] }) {

  return (
    <>
      <div className="grid container__tab tab-mv">
        <div className="container__section row">
          <div className="col l-12 m-12 c-12 mb-16">
            <div className="container__header">
              <div className="container__header-title">
                <h3>MV&nbsp;</h3>
              </div>
              <h3 className="container__header-subtitle">MV</h3>
            </div>
          </div>
          {mvList.length === 0 ? (
            <div className="col l-12 m-12 c-12">
              <div className="box--no-content">
                <div className="no-content-image--mv"></div>
                <span className="no-content-text">Danh sách video trống</span>
              </div>
            </div>
          ) : (
            <div className="col l-12 m-12 c-12">
              <MvList mvList={mvList} optionalClass="mb-30" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TabMv;
