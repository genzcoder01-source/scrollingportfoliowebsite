"use client";

import React from "react";
import { SplitText } from "../utils/textSplitter";

export default function Hero({ onExplore }) {
  return (
    <section
      className="st"
      id="hero"
      data-label="Home"
      data-gap="0"
      data-hold=".45"
      data-a="0.455,0.0"
      data-ma="0.46,-0.04"
    >
      <div
        className="el"
        data-p="0,-0.06"
        data-mp="0,-0.06"
        data-z="0"
        data-f="0,0.05"
      >
        <h1 className="d bb h-name intro split" aria-label="Dhruvin">
          <SplitText text="Dhruvin" />
        </h1>
      </div>

      <div
        className="el"
        data-p="-0.31,0.34"
        data-mp="-0.02,0.24"
        data-z="-.12"
        data-f="-.1,.1"
      >
        <div className="h-cap">
          <span className="mono">Web Designer & Developer · Since 2014</span>
          <p className="lede">
            Web development, web design, UI/UX design, and software development
            for modern digital products and experiences.
          </p>
        </div>
      </div>

      <div
        className="el"
        data-p="0.4,0.36"
        data-mp="0.3,0.38"
        data-z="-.2"
        data-f="0,0"
      >
        <button
          type="button"
          className="h-cue"
          data-go="about"
          aria-label="Scroll to explore"
          onClick={onExplore}
        >
          <i></i>
          <span className="mono">
            Scroll<span className="cue-x"> to explore</span>
          </span>
        </button>
      </div>
    </section>
  );
}
