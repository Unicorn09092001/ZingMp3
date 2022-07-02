import React from "react";
import "./LoadingAnimate.scss";

function LoadingAnimate() {
  return (
    <div className="loading--animate">
      <div
        className="loading--animate-img"
        style={{
          background: `url('/assets/img/loadingBackground.webp') no-repeat 50% / contain`,
        }}
      ></div>
    </div>
  );
}

export default LoadingAnimate;
