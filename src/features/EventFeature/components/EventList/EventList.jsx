import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import { showSlide } from "utils";
import EventItem from "../EventItem/EventItem";

function EventList({
  eventList = [],
  noWrap = false,
  slideIndex = 0,
  step = 0,
}) {
  const itemRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    const itemContentWidth = itemRef.current?.getWidth();
    const totalWidth = containerRef.current.offsetWidth;

    const paddingWidth = Math.round(
      (totalWidth - itemContentWidth * step) / step / 2
    );

    const totalItemWidth = itemContentWidth + paddingWidth * 2;

    showSlide(slideIndex, containerRef.current, totalItemWidth);
  }, [slideIndex, step]);
  return (
    <div
      className={clsx("row", "event--container", {
        "no-wrap": noWrap,
      })}
      ref={containerRef}
    >
      {eventList.map((event, index) => (
        <div key={index} className="col l-4 m-6 c-12">
          <EventItem event={event} ref={itemRef} />
        </div>
      ))}
    </div>
  );
}

export default EventList;
