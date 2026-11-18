"use client";

import React from "react";
import { SplitText } from "../utils/textSplitter";
import { siteData } from "../data/siteData";

export default function SelectedWork({ onOpenProject }) {
  return (
    <>
      {/* Work Lead Stop */}
      <section
        className="st"
        id="work"
        data-label="Work"
        data-gap="3"
        data-hold=".55"
        data-a="0.4,0.26"
        data-ma="0.4,0.3"
      >
        <div
          className="el"
          data-p="-0.12,-0.13"
          data-mp="-0.05,-0.064"
          data-z=".3"
          data-f="-.15,0"
        >
          <p className="d bb wk-h split" aria-label="Selected">
            <SplitText text="Selected" />
          </p>
        </div>

        <div
          className="el"
          data-p="0.14,0.11"
          data-mp="0.04,0.064"
          data-z="0"
          data-f=".15,0"
        >
          <p className="d bb wk-h split" aria-label="Work">
            <SplitText text="Work" />
          </p>
        </div>

        <div
          className="el"
          data-p="-0.3,0.4"
          data-mp="0,0.3"
          data-z="-.15"
          data-f="0,0"
        >
          <span className="mono">Six projects · More soon</span>
        </div>
      </section>

      {/* 6 Project Card Stops */}
      {siteData.projects.map((proj, i) => {
        const layout = proj.layout;
        const dir = layout.x < 0 ? 1 : -1;
        const sideClass = layout.x < 0 ? "l" : "r";

        return (
          <section
            key={proj.slug}
            className="st"
            data-label="Work"
            data-gap={i === 0 ? "2.2" : "1.55"}
            data-hold=".38"
            data-ease=".5"
            data-a={`${layout.ax},${layout.ay}`}
            data-ma={`${0.43 * dir},0.36`}
          >
            <div
              className="el"
              data-p={`${layout.x},${layout.y}`}
              data-mp="0,-0.02"
              data-z="0"
              data-f={`${layout.x < 0 ? -0.25 : 0.25},0`}
              data-r={layout.x < 0 ? 18 : -18}
            >
              <button
                type="button"
                className={`card ${sideClass}`}
                data-proj={i}
                style={{ width: layout.w }}
                onClick={(e) => onOpenProject(i, e.currentTarget)}
              >
                <span className="fig" style={{ "--ar": layout.ar }}>
                  <img
                    src={proj.cover}
                    alt={`${proj.title} project`}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span className="meta">
                  <span className="mono">
                    {String(i + 1).padStart(2, "0")} / 06
                  </span>
                </span>
                <span className={`d ${i % 2 ? "t2" : "b7"}`}>{proj.title}</span>
                <span className="small">{proj.category}</span>
                <span className="mono open">
                  View project<i aria-hidden="true"></i>
                </span>
              </button>
            </div>
          </section>
        );
      })}
    </>
  );
}
