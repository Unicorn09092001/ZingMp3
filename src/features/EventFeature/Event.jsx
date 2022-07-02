import clsx from "clsx";
import ContainerHeader from "components/Container/components/ContainerHeader/ContainerHeader";
import React from "react";
import EventList from "./components/EventList/EventList";
import "./Event.scss";
import { useAutomaticSlide } from "hooks";

function Event({
  optionalClass = "",
  eventList = [],
  noWrap = false,
  sectionName = "",
  navigable = false,
}) {
  const { step, slideIndex, handleChangeIndexByClick } = useAutomaticSlide(
    eventList,
    3,
    2,
    1
  );

  return (
    <div
      className={clsx("row", "container__section", {
        [optionalClass]: optionalClass.length > 0,
      })}
    >
      <div className="col l-12 m-12 c-12 mb-16">
        <ContainerHeader
          listLength={eventList.length}
          onChangeIndex={handleChangeIndexByClick}
          slideIndex={slideIndex}
          noWrap={noWrap}
          sectionName={sectionName}
          navigable={navigable}
          step={step}
        />
      </div>
      <div className="col l-12 m-12 c-12">
        <EventList
          eventList={eventList}
          noWrap={noWrap}
          slideIndex={slideIndex}
          step={step}
        />
      </div>
    </div>
  );
}

export default Event;
