import clsx from "clsx";
import ContainerHeader from "components/Container/components/ContainerHeader/ContainerHeader";
import PlaylistList from "features/Playlist/components/PlaylistList/PlaylistList";
import React from "react";
import { useAutomaticSlide } from "hooks";

function NormalPlaylist({
  optionalClass = "",
  playlistList = [],
  sectionName = "",
  noWrap = false,
  navigable = false,
  pathName = "",
}) {
  const { step, slideIndex, handleChangeIndexByClick } = useAutomaticSlide(
    playlistList,
    2,
    2,
    1
  );
  return (
    <div
      className={clsx("container__section", "row", {
        [optionalClass]: !!optionalClass,
      })}
    >
      {sectionName.length > 0 && (
        <div className="col l-12 m-12 c-12 mb-16">
          <ContainerHeader
            pathName={pathName}
            sectionName={sectionName}
            onChangeIndex={handleChangeIndexByClick}
            listLength={playlistList.length}
            slideIndex={slideIndex}
            //noWrap={noWrap}
            step={step}
            navigable={navigable}
          />
        </div>
      )}
      <div className="col l-12 m-12 c-12">
        <PlaylistList
          playlistList={playlistList}
          slideIndex={slideIndex}
          step={step}
          noWrap={noWrap}
        />
      </div>
    </div>
  );
}

export default NormalPlaylist;
