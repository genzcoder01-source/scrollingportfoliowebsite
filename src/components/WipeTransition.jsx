"use client";

import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { gsap } from "gsap";

const WipeTransition = forwardRef(function WipeTransition(props, ref) {
  const wipeRef = useRef(null);
  const pathRef = useRef(null);
  const titleRef = useRef(null);
  const numRef = useRef(null);

  useImperativeHandle(ref, () => ({
    triggerWipe: (nextProject, nextIndex, onHalfway, onComplete) => {
      const wipe = wipeRef.current;
      const path = pathRef.current;
      const title = titleRef.current;
      const num = numRef.current;
      if (!wipe || !path || !title || !num) {
        if (onHalfway) onHalfway();
        if (onComplete) onComplete();
        return;
      }

      num.textContent = `Next project · ${String(nextIndex + 1).padStart(2, "0")} / 06`;
      title.innerHTML = nextProject.title
        .split("")
        .map((char) =>
          char === " " ? " " : `<span class="c" style="display:inline-block">${char}</span>`
        )
        .join("");

      wipe.style.visibility = "visible";
      wipe.classList.add("on");

      const pathLength = path.getTotalLength ? path.getTotalLength() : 1200;
      path.style.strokeDasharray = `${pathLength}`;
      path.style.strokeDashoffset = `${pathLength}`;

      const tl = gsap.timeline({
        onComplete: () => {
          wipe.style.visibility = "hidden";
          wipe.classList.remove("on");
          if (onComplete) onComplete();
        },
      });

      // 1. Wipe In (sheet comes down)
      tl.fromTo(
        wipe,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 0.65,
          ease: "power3.inOut",
        }
      );

      // 2. Stroke Draw along curved spline
      tl.fromTo(
        path,
        { strokeDashoffset: pathLength },
        {
          strokeDashoffset: 0,
          duration: 0.9,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // 3. Title characters stagger in
      const chars = title.querySelectorAll(".c");
      if (chars.length > 0) {
        tl.fromTo(
          chars,
          { opacity: 0, y: "110%", rotate: 6 },
          {
            opacity: 1,
            y: "0%",
            rotate: 0,
            duration: 0.6,
            stagger: 0.035,
            ease: "back.out(1.4)",
          },
          "-=0.7"
        );
      }

      // Halfway callback when sheet is fully covering
      tl.add(() => {
        if (onHalfway) onHalfway();
      }, "+=0.3");

      // 4. Wipe Out (sheet leaves upward)
      tl.to(wipe, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.75,
        ease: "power3.inOut",
      });
    },
  }));

  return (
    <div id="wipe" ref={wipeRef} aria-hidden="true">
      <svg viewBox="0 0 1000 600" preserveAspectRatio="none">
        <path
          id="wpath"
          ref={pathRef}
          d="M-20 470 C 220 470 260 140 500 160 S 780 520 1020 300"
        />
      </svg>
      <div className="w-in">
        <span className="mono" id="wnum" ref={numRef}>
          Next project
        </span>
        <p className="d" id="wtitle" ref={titleRef}></p>
      </div>
    </div>
  );
});

export default WipeTransition;
