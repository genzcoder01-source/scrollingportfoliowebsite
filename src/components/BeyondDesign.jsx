"use client";

import React from "react";
import { SplitText } from "../utils/textSplitter";

export default function BeyondDesign() {
  return (
    <section
      className="st"
      data-label="Beyond design"
      data-gap="1.8"
      data-hold=".85"
      data-a="0,0.44"
      data-ma="-0.44,0.42"
    >
      <div
        className="el"
        data-p="0.03,-0.02"
        data-mp="0.04,-0.02"
        data-z="0"
        data-f="0,.3"
      >
        <div className="by-block">
          <div className="sprayer" aria-hidden="true">
            <svg
              className="spray"
              viewBox="0 0 160 300"
              preserveAspectRatio="none"
            >
              <defs>
                <filter
                  id="sprayEdge"
                  x="-30%"
                  y="-10%"
                  width="160%"
                  height="120%"
                >
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency=".9"
                    numOctaves="2"
                    seed="4"
                    result="n"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="n"
                    scale="6"
                    xChannelSelector="R"
                    yChannelSelector="G"
                    result="d"
                  />
                  <feGaussianBlur in="d" stdDeviation="1" />
                </filter>
                <radialGradient id="sprayMist">
                  <stop
                    offset="0"
                    stopColor="var(--orange)"
                    stopOpacity=".55"
                  />
                  <stop
                    offset="1"
                    stopColor="var(--orange)"
                    stopOpacity="0"
                  />
                </radialGradient>
              </defs>
              <g filter="url(#sprayEdge)">
                <path
                  className="spray-p"
                  d="M66 190C58 170 48 208 36 192S20 170 10 192-6 208-16 184"
                  fill="none"
                  stroke="var(--orange)"
                  strokeWidth="11"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g className="spray-pool" fill="var(--orange)">
                  <ellipse cx="22" cy="200" rx="14" ry="4" />
                </g>
                <path
                  className="spray-drip"
                  d="M44 199v18M30 196v30M12 200v14M-4 198v20"
                  fill="none"
                  stroke="var(--orange)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
              </g>
              <g className="spray-dots" fill="var(--orange)"></g>
              <circle
                className="spray-mist"
                cx="70"
                cy="186"
                r="26"
                fill="url(#sprayMist)"
              />
            </svg>
            <img className="spray-can" src="/img/ht-can.webp" alt="" />
          </div>

          <span className="mono">Beyond design</span>
          <p
            className="d bb by split"
            style={{ "--li": 0 }}
            aria-label="Ice hockey player"
          >
            <SplitText text="Ice hockey player" />
          </p>
          <p
            className="d bb by split"
            style={{ "--li": 1 }}
            aria-label="Field hockey player"
          >
            <SplitText text="Field hockey player" />
          </p>
          <p
            className="d bb by split"
            style={{ "--li": 2 }}
            aria-label="Abstract painter"
          >
            <SplitText text="Abstract painter" />
          </p>
          <p
            className="d bb by by-acc split"
            style={{ "--li": 3 }}
            aria-label="Wannabe futurist"
          >
            <SplitText text="Wannabe futurist" />
          </p>
        </div>
      </div>

      <div
        className="el"
        data-p="-0.31,-0.16"
        data-mp="-0.2,-0.3"
        data-z=".45"
        data-f="-.35,-.05"
        data-r="18"
      >
        <figure className="cut ih" style={{ "--rot": "-7deg" }}>
          <img
            src="/img/ht-ih.webp"
            width="571"
            height="747"
            alt="Halftone cutout of a grinning hockey player missing a front tooth"
          />
          <span className="glint" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 0c.8 6.4 3.6 9.2 12 12-8.4 2.8-11.2 5.6-12 12-.8-6.4-3.6-9.2-12-12 8.4-2.8 11.2-5.6 12-12Z" />
            </svg>
          </span>
        </figure>
      </div>
    </section>
  );
}
