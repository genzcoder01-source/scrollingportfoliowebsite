"use client";

import React from "react";

export default function Hud({ activeNumber = "01", activeLabel = "Home" }) {
  return (
    <div id="hud" className="mono" aria-hidden="true">
      <div className="trk">
        <i></i>
      </div>
      <div id="ticks"></div>
      <i className="hd"></i>
      <div className="lb">
        <span id="hudn">{activeNumber}</span>
        <b id="hudl">{activeLabel}</b>
      </div>
    </div>
  );
}
