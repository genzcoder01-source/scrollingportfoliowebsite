"use client";

import React from "react";

export default function Numbers() {
  return (
    <section
      className="st"
      id="numbers"
      data-dark="1"
      data-label="By the numbers"
      data-gap="3"
      data-hold=".7"
      data-a="0,0.36"
      data-ma="-0.4,0.42"
    >
      <div
        className="el"
        data-p="-0.3,-0.04"
        data-mp="-0.12,-0.27"
        data-z=".55"
        data-f="-.2,-.1"
      >
        <div className="num">
          <span className="mono">Designing since</span>
          <p className="d t1">2002</p>
        </div>
      </div>

      <div
        className="el"
        data-p="0.04,0.12"
        data-mp="0.08,0.0"
        data-z="0"
        data-f="0,.15"
      >
        <div className="num">
          <span className="mono">Projects</span>
          <p className="d b7" aria-label="250+ projects">
            <span id="count">0</span>+
          </p>
        </div>
      </div>

      <div
        className="el"
        data-p="0.33,-0.14"
        data-mp="-0.12,0.27"
        data-z="-.22"
        data-f=".25,-.1"
      >
        <div className="num">
          <span className="mono">Awards</span>
          <p className="d t1">23</p>
        </div>
      </div>
    </section>
  );
}
