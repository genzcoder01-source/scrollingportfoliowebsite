"use client";

import React from "react";
import { SplitText } from "../utils/textSplitter";

export default function About() {
  return (
    <section
      className="st"
      id="about"
      data-label="About"
      data-gap="3.2"
      data-hold=".85"
      data-a="-0.06,-0.36"
      data-ma="0.38,-0.36"
    >
      <div
        className="el"
        data-p="-0.13,0.02"
        data-mp="0,-0.19"
        data-z=".35"
        data-f="-.35,.05"
        data-r="28"
      >
        <figure className="ab-fig pose" style={{ margin: 0 }}>
          <img
            src="/img/pose0.webp"
            alt="Dhruvin"
            loading="eager"
            className="on"
          />
          <img src="/img/pose1.webp" alt="Dhruvin pose 1" loading="eager" />
          <img src="/img/pose2.webp" alt="Dhruvin pose 2" loading="eager" />
          <img src="/img/pose3.webp" alt="Dhruvin pose 3" loading="eager" />
          <img src="/img/pose4.webp" alt="Dhruvin pose 4" loading="eager" />
          <img src="/img/pose5.webp" alt="Dhruvin pose 5" loading="eager" />
        </figure>
      </div>

      <div
        className="el"
        data-p="0.115,-0.06"
        data-mp="0,0.2"
        data-z="-.08"
        data-f=".3,0"
        data-r="-22"
      >
        <div className="ab-txt">
          <span className="mono">About</span>
          <p
            className="d bb ab-big split"
            aria-label="Web Designer & Software Developer"
          >
            <SplitText text="Web Designer & Software Developer" />
          </p>
          <p className="lede">
            I&apos;m Dhruvin, a senior web designer and software developer with
            over a decade of craft behind me and a workflow built for what&apos;s
            next. I care about thoughtful design, robust engineering, and expressive
            interaction. Ideas that hold up over time, type set with care, and the
            small details people feel even when they don&apos;t notice them. Web
            development, web design, UI/UX design, or software development,
            every project gets the same craft and curiosity.
          </p>
        </div>
      </div>
    </section>
  );
}
