"use client";

import React, { useMemo } from "react";
import { SplitText } from "../utils/textSplitter";
import { siteData } from "../data/siteData";

export default function WhatIDo() {
  // Deterministic star generation matching reference site
  const stars = useMemo(() => {
    const list = [];
    let a = 7;
    function rand() {
      a = (a * 16807) % 2147483647;
      return a / 2147483647;
    }
    for (let i = 0; i < 34; i++) {
      const t = (rand() - 0.5) * 1.3;
      const r = (rand() - 0.5) * 1.05;
      const d = -0.3 + rand() * 1.9;
      const o = 3 + Math.round(rand() * 4);
      list.push({
        p: `${t.toFixed(3)},${r.toFixed(3)}`,
        mp: `${(t * 0.8).toFixed(3)},${r.toFixed(3)}`,
        z: d.toFixed(2),
        size: o,
      });
    }
    return list;
  }, []);

  return (
    <section
      className="st svc-st"
      id="services"
      data-dark="1"
      data-label="What I do"
      data-gap="3"
      data-hold="1.1"
      data-a="0.46,-0.21"
      data-ma="0.46,-0.25"
    >
      <div
        className="el"
        data-p="0,-0.33"
        data-mp="0,-0.37"
        data-z=".35"
        data-f="0,-.1"
      >
        <p className="d bb svc-h split" aria-label="What I do">
          <SplitText text="What I do" />
        </p>
      </div>

      {siteData.services.map((svc, i) => {
        const c = svc.coords;
        return (
          <div
            key={i}
            className="el"
            data-abs="1"
            data-p={`${c[0]},${c[1]}`}
            data-mp={`${c[3]},${c[4]}`}
            data-z={c[2]}
            data-f="0,0"
          >
            <div className="svc-star">
              <p className="d svc-nm">{svc.title}</p>
              <div className="svc-det">
                {svc.tags.map((tag, tIdx) => (
                  <span key={tIdx}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {stars.map((star, i) => (
        <div
          key={`star-${i}`}
          className="el"
          data-abs="1"
          data-p={star.p}
          data-mp={star.mp}
          data-z={star.z}
          data-f="0,0"
          aria-hidden="true"
        >
          <i
            className="star"
            style={{ width: `${star.size}px`, height: `${star.size}px` }}
          ></i>
        </div>
      ))}
    </section>
  );
}
