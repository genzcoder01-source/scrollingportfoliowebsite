"use client";

import React from "react";
import { SplitText } from "../utils/textSplitter";

export default function Journey({ onThumbsUp, onThumbsDown }) {
  return (
    <>
      {/* Journey Lead Stop */}
      <section
        className="st"
        id="journey"
        data-label="Journey"
        data-gap="3"
        data-hold=".5"
        data-a="0,0.3"
        data-ma="-0.38,0.3"
      >
        <div
          className="el"
          data-p="0,-0.06"
          data-mp="0,-0.08"
          data-z="0"
          data-f="0,.1"
        >
          <p
            className="d bb jr-h split"
            style={{ position: "relative" }}
            aria-label="The journey"
          >
            <span className="runner run" aria-hidden="true">
              <svg viewBox="0 0 36 44">
                <g className="rr">
                  <path
                    className="far"
                    data-k="lb"
                    stroke="currentColor"
                    strokeWidth="4.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    className="far"
                    data-k="ab"
                    stroke="currentColor"
                    strokeWidth="4.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    data-k="tor"
                    stroke="currentColor"
                    strokeWidth="4.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <circle data-k="hd" r="4.6" fill="currentColor" />
                  <path
                    data-k="lf"
                    stroke="currentColor"
                    strokeWidth="4.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    data-k="af"
                    stroke="currentColor"
                    strokeWidth="4.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </g>
                <g className="rj">
                  <circle cx="20" cy="5.6" r="4.6" fill="currentColor" />
                  <path
                    d="M19.2 11.6 17.6 24.4M18.8 14.6l6.4-3.4 2-6.2M18.8 14.6l-6.4-3 -1.6-6.4M17.6 24.4l7 2.4 1.6 7.6M17.6 24.4l-6.6 3.8 2.2 7.2"
                    stroke="currentColor"
                    strokeWidth="4.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </g>
              </svg>
            </span>
            <SplitText text="The journey" />
          </p>
        </div>

        <div
          className="el"
          data-p="0.12,0.15"
          data-mp="0.05,0.12"
          data-z="-.15"
          data-f=".1,0"
        >
          <p className="d bb jr-sub">so far</p>
        </div>
      </section>

      {/* Milestone 2002: Start */}
      <section
        className="st ms-st"
        data-label="Journey"
        data-gap="1.35"
        data-hold=".32"
        data-ease=".55"
        data-a="0,0.3"
        data-ma="-0.38,-0.03"
      >
        <div
          className="el"
          data-p="0,0.3"
          data-mp="-0.38,-0.03"
          data-z="0"
          data-f="0,0"
        >
          <i className="node" aria-hidden="true"></i>
        </div>
        <div
          className="el"
          data-p="-0.2,-0.05"
          data-mp="0.08,-0.12"
          data-z=".25"
          data-f="-0.25,0"
        >
          <p className="d yr">2002</p>
        </div>
        <div
          className="el"
          data-p="0.2,0.04"
          data-mp="0.08,0.165"
          data-z="-.1"
          data-f="0.2,0"
        >
          <div className="ms">
            <span className="mono">Start</span>
            <div className="ms-row">
              <svg
                className="tools"
                viewBox="0 0 214 108"
                role="img"
                aria-label="Design tools from 2002: a swatch fan, a 100MB disk and a hobby knife"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <g className="sw" transform="translate(66 96)">
                  <g className="sw-c" style={{ "--a": "-72deg" }}>
                    <rect
                      x="-8"
                      y="-62"
                      width="16"
                      height="62"
                      rx="1.5"
                      fill="var(--bg)"
                    />
                    <rect
                      x="-8"
                      y="-62"
                      width="16"
                      height="22"
                      rx="1.5"
                      fill="#2234E0"
                      stroke="none"
                    />
                    <path d="M-8 -40h16M-5 -33h10M-5 -28h7" />
                  </g>
                  <g className="sw-c" style={{ "--a": "-54deg" }}>
                    <rect
                      x="-8"
                      y="-62"
                      width="16"
                      height="62"
                      rx="1.5"
                      fill="var(--bg)"
                    />
                    <rect
                      x="-8"
                      y="-62"
                      width="16"
                      height="22"
                      rx="1.5"
                      fill="#F47920"
                      stroke="none"
                    />
                    <path d="M-8 -40h16M-5 -33h10M-5 -28h7" />
                  </g>
                  <g className="sw-c" style={{ "--a": "-36deg" }}>
                    <rect
                      x="-8"
                      y="-62"
                      width="16"
                      height="62"
                      rx="1.5"
                      fill="var(--bg)"
                    />
                    <rect
                      x="-8"
                      y="-62"
                      width="16"
                      height="22"
                      rx="1.5"
                      fill="#F2C230"
                      stroke="none"
                    />
                    <path d="M-8 -40h16M-5 -33h10M-5 -28h7" />
                  </g>
                  <g className="sw-c" style={{ "--a": "-18deg" }}>
                    <rect
                      x="-8"
                      y="-62"
                      width="16"
                      height="62"
                      rx="1.5"
                      fill="var(--bg)"
                    />
                    <rect
                      x="-8"
                      y="-62"
                      width="16"
                      height="22"
                      rx="1.5"
                      fill="#121413"
                      stroke="none"
                    />
                    <path d="M-8 -40h16M-5 -33h10M-5 -28h7" />
                  </g>
                  <g className="sw-c" style={{ "--a": "0deg" }}>
                    <rect
                      x="-8"
                      y="-62"
                      width="16"
                      height="62"
                      rx="1.5"
                      fill="var(--bg)"
                    />
                    <rect
                      x="-8"
                      y="-62"
                      width="16"
                      height="22"
                      rx="1.5"
                      fill="#E5484D"
                      stroke="none"
                    />
                    <path d="M-8 -40h16M-5 -33h10M-5 -28h7" />
                  </g>
                  <circle r="3" fill="var(--bg)" />
                  <circle r=".9" fill="currentColor" />
                </g>
                <g className="zip" transform="translate(104 18)">
                  <path
                    d="M4 0h46l6 6v50a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4Z"
                    fill="var(--bg)"
                  />
                  <rect x="15" y="0" width="22" height="17" rx="1" />
                  <path d="M20 4v9" />
                  <rect x="8" y="30" width="40" height="22" rx="2" />
                  <text
                    x="28"
                    y="44"
                    fill="currentColor"
                    stroke="none"
                    fontFamily="Geist Mono, ui-monospace, monospace"
                    fontSize="7"
                    letterSpacing=".6"
                    textAnchor="middle"
                  >
                    100MB
                  </text>
                  <path d="M5 26h4M47 26h4" />
                </g>
                <g className="knife" transform="translate(120 100) rotate(-22)">
                  <rect
                    x="0"
                    y="-4.5"
                    width="62"
                    height="9"
                    rx="4.5"
                    fill="var(--bg)"
                  />
                  <path d="M10 -4.5v9M14 -4.5v9M18 -4.5v9M22 -4.5v9M26 -4.5v9" />
                  <path d="M62 -5.5h9l2 2v7l-2 2h-9Z" fill="var(--bg)" />
                  <path d="M73 -3 96 0 73 3.5Z" fill="var(--bg)" />
                </g>
              </svg>
            </div>
            <p>Started my career in design and never looked back.</p>
          </div>
        </div>
      </section>

      {/* Milestone 2003: Flash */}
      <section
        className="st ms-st"
        data-label="Journey"
        data-gap="1.35"
        data-hold=".32"
        data-ease=".55"
        data-a="0,0.3"
        data-ma="-0.38,-0.03"
      >
        <div
          className="el"
          data-p="0,0.3"
          data-mp="-0.38,-0.03"
          data-z="0"
          data-f="0,0"
        >
          <i className="node" aria-hidden="true"></i>
        </div>
        <div
          className="el"
          data-p="0.2,-0.05"
          data-mp="0.08,-0.12"
          data-z=".25"
          data-f="0.25,0"
        >
          <p className="d yr">2003</p>
        </div>
        <div
          className="el"
          data-p="-0.2,0.04"
          data-mp="0.08,0.165"
          data-z="-.1"
          data-f="-0.2,0"
        >
          <div className="ms">
            <span className="mono">Flash</span>
            <div className="ms-row">
              <svg
                className="crt"
                viewBox="0 0 96 86"
                role="img"
                aria-label="Early 90s desktop computer stuck loading at 99 percent"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="14" y="3" width="68" height="54" rx="3" />
                <rect x="21" y="9" width="54" height="40" rx="1.5" />
                <rect x="24.5" y="12.5" width="47" height="33" rx="4" />
                <circle cx="19.5" cy="53" r=".9" fill="currentColor" />
                <path d="M26 57v3.5h44V57" />
                <rect x="5" y="60.5" width="86" height="17" rx="2.5" />
                <path d="M5.5 65h85" />
                <path d="M60 71.5h23" />
                <circle cx="13" cy="71.5" r="1.4" />
                <path d="M5 72.5c-3 .5-4 3-3.5 6.5" />
                <text
                  x="48"
                  y="27"
                  fill="currentColor"
                  stroke="none"
                  fontFamily="Geist Mono, ui-monospace, monospace"
                  fontSize="5.6"
                  letterSpacing=".7"
                  textAnchor="middle"
                >
                  LOADING<tspan className="crt-dots">...</tspan>
                </text>
                <rect x="30" y="31.5" width="36" height="6" rx="3" />
                <rect
                  className="crt-fill"
                  x="32"
                  y="33.25"
                  width="32"
                  height="2.5"
                  rx="1.25"
                  fill="var(--line)"
                  stroke="none"
                />
              </svg>
              <p>Got hooked on the web, one Flash intro at a time.</p>
            </div>
            <div className="thumbs">
              <button
                type="button"
                className="tb"
                id="thumbs"
                aria-label="Thumbs up, I remember Flash"
                onClick={onThumbsUp}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 10v12" />
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                </svg>
              </button>
              <button
                type="button"
                className="tb"
                id="thumbsdn"
                aria-label="Thumbs down"
                onClick={onThumbsDown}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ transform: "scaleY(-1)" }}
                >
                  <path d="M7 10v12" />
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                </svg>
              </button>
              <span className="tt" id="thumbtt">
                Click thumbs up if you remember Flash
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Milestone 2019: Art */}
      <section
        className="st ms-st"
        data-label="Journey"
        data-gap="1.35"
        data-hold=".32"
        data-ease=".55"
        data-a="0,0.3"
        data-ma="-0.38,-0.03"
      >
        <div
          className="el"
          data-p="0,0.3"
          data-mp="-0.38,-0.03"
          data-z="0"
          data-f="0,0"
        >
          <i className="node" aria-hidden="true"></i>
        </div>
        <div
          className="el"
          data-p="-0.2,-0.05"
          data-mp="0.08,-0.12"
          data-z=".25"
          data-f="-0.25,0"
        >
          <p className="d yr">2019</p>
        </div>
        <div
          className="el"
          data-p="0.2,0.04"
          data-mp="0.08,0.165"
          data-z="-.1"
          data-f="0.2,0"
        >
          <div className="ms">
            <span className="mono">Art</span>
            <p>
              Founded Dhruvin Art,
              <br />
              my creative visual practice.
            </p>
            <figure className="art">
              <img
                src="/img/art-print.png"
                width="1960"
                height="1956"
                alt="Framed abstract print by Dhruvin"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* Milestone 2026: Product */}
      <section
        className="st ms-st"
        data-label="Journey"
        data-gap="1.35"
        data-hold=".32"
        data-ease=".55"
        data-a="0,0.3"
        data-ma="-0.38,-0.03"
      >
        <div
          className="el"
          data-p="0,0.3"
          data-mp="-0.38,-0.03"
          data-z="0"
          data-f="0,0"
        >
          <i className="node" aria-hidden="true"></i>
        </div>
        <div
          className="el"
          data-p="0.2,-0.05"
          data-mp="0.08,-0.12"
          data-z=".25"
          data-f="0.25,0"
        >
          <p className="d yr">2026</p>
        </div>
        <div
          className="el"
          data-p="-0.2,0.04"
          data-mp="0.08,0.165"
          data-z="-.1"
          data-f="-0.2,0"
        >
          <div className="ms">
            <span className="mono">Product</span>
            <div className="ms-row ms-stack">
              <svg
                className="think rocket"
                viewBox="0 0 96 84"
                role="img"
                aria-label="Rocket launching"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <g transform="rotate(42 48 44)">
                  <g className="flame">
                    <path
                      d="M41.5 54.5C42 64 45 75 48 84c3-9 6-20 6.5-29.5Z"
                      fill="#E4321B"
                      fillOpacity=".5"
                      stroke="none"
                    />
                    <path
                      d="M44 54.5c.4 6.5 2 13.5 4 20 2-6.5 3.6-13.5 4-20Z"
                      fill="#F47920"
                      fillOpacity=".75"
                      stroke="none"
                    />
                  </g>
                  <path d="M48 6c9.5 9 12.5 22 11 41.5H37C35.5 28 38.5 15 48 6Z" />
                  <circle cx="48" cy="25" r="5" />
                  <path d="M37.6 37 29 50.5l8.3-3M58.4 37 67 50.5l-8.3-3" />
                  <path d="M41 47.5h14l-1.8 6.5h-10.4Z" />
                  <path d="M48 39v8.5" />
                </g>
              </svg>
              <p>Launched Distinkt AI, a brand strategy tool for designers.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
